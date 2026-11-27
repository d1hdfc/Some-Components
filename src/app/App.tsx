import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { ButtonPage } from './pages/ButtonPage/ButtonPage';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import { HeaderPage } from './pages/HeaderPage/HeaderPage';
import { InstallationAndTokenPage } from './pages/InstallationAndTokenPage/InstallationAndTokenPage';
import { LatestUpdatedCodePage } from './pages/LatestUpdatedCodePage/LatestUpdatedCodePage';
import { SidebarPage } from './pages/SidebarPage/SidebarPage';
import { ComponentDocTemplate } from './shared/ComponentDocTemplate';
import { componentDocumentation } from './shared/componentRegistry';
import { SyncConfirmModal } from './shared/SyncConfirmModal';
import { SyncToast } from './shared/SyncToast';
import { useSyncWebSocket } from './hooks/useSyncWebSocket';

const componentPageModules = import.meta.glob<{
  componentSlug?: string;
  default?: ComponentType;
}>('./pages/*Page/*Page.tsx', { eager: true });

const componentPages = new Map(
  Object.values(componentPageModules)
    .filter((mod): mod is { componentSlug: string; default: ComponentType } =>
      Boolean(mod.componentSlug && mod.default)
    )
    .map(({ componentSlug, default: Page }) => [componentSlug, Page])
);

export default function App() {
  const {
    status: syncStatus,
    lastEvent,
    historyEntries,
    pendingModalState,
    requestPreSyncFromPortal,
    confirmSyncFromPortal,
    cancelSyncFromPortal
  } = useSyncWebSocket();

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = window.localStorage.getItem('hdfc-portal-theme');

      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem('hdfc-portal-theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const resolveRouteFromHash = (): string => {
    const rawHash = window.location.hash.slice(1).trim().toLowerCase();
    if (!rawHash || rawHash === 'dashboard' || rawHash === 'overview' || rawHash === 'top') {
      return 'dashboard';
    }
    if (
      rawHash === 'latest-updated-code' ||
      rawHash === 'updated-code' ||
      rawHash === 'diffs'
    ) {
      return 'latest-updated-code';
    }
    if (
      rawHash === 'installation-and-token' ||
      rawHash === 'installation' ||
      rawHash === 'tokens' ||
      rawHash === 'tokens-inspector'
    ) {
      return 'installation-and-token';
    }

    const matchedComponent = componentDocumentation.find(
      (component) =>
        rawHash === component.slug.toLowerCase() || rawHash === component.routeSlug.toLowerCase()
    );
    if (matchedComponent) {
      return matchedComponent.routeSlug;
    }

    return 'dashboard';
  };

  const [currentPage, setCurrentPage] = useState<string>(resolveRouteFromHash);

  useEffect(() => {
    const updatePage = () => {
      const rawHash = window.location.hash.slice(1).trim().toLowerCase();
      const isKnownRouteHash =
        !rawHash ||
        rawHash === 'dashboard' ||
        rawHash === 'overview' ||
        rawHash === 'latest-updated-code' ||
        rawHash === 'updated-code' ||
        rawHash === 'diffs' ||
        rawHash === 'installation-and-token' ||
        rawHash === 'installation' ||
        rawHash === 'tokens' ||
        componentDocumentation.some(
          (component) =>
            rawHash === component.slug.toLowerCase() ||
            rawHash === component.routeSlug.toLowerCase()
        );

      // Allow in-page section anchor links (e.g. #playground, #figma-matrix, #api) to scroll within the active page
      if (!isKnownRouteHash && document.getElementById(rawHash)) {
        return;
      }

      setCurrentPage(resolveRouteFromHash());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };

    window.addEventListener('hashchange', updatePage);
    return () => window.removeEventListener('hashchange', updatePage);
  }, []);

  const isDashboardPage = currentPage === 'dashboard';
  const isLatestUpdatedCodePage = currentPage === 'latest-updated-code';
  const isInstallationAndTokenPage = currentPage === 'installation-and-token';
  const isButtonPage = currentPage === 'button';

  const genericComponent =
    !isDashboardPage &&
      !isLatestUpdatedCodePage &&
      !isInstallationAndTokenPage &&
      !isButtonPage
      ? componentDocumentation.find((component) => component.routeSlug === currentPage)
      : undefined;

  const DedicatedComponentPage = genericComponent
    ? componentPages.get(genericComponent.slug)
    : undefined;

  return (
    <div className="docs-shell" data-theme={theme}>
      <HeaderPage
        syncStatus={syncStatus}
        currentPage={currentPage}
        onNav={(page: string) => setCurrentPage(page)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onRequestPreSync={requestPreSyncFromPortal}
      />
      <div className="docs-layout" id="top">
        <SidebarPage
          currentPage={currentPage}
          syncStatus={syncStatus}
          updatesCount={historyEntries.length}
        />

        {isDashboardPage ? (
          <DashboardPage
            syncStatus={syncStatus}
            historyEntries={historyEntries}
            onRequestPreSync={requestPreSyncFromPortal}
          />
        ) : isLatestUpdatedCodePage ? (
          <LatestUpdatedCodePage
            entries={historyEntries}
            syncStatus={syncStatus}
            onRequestPreSync={requestPreSyncFromPortal}
          />
        ) : isInstallationAndTokenPage ? (
          <InstallationAndTokenPage />
        ) : isButtonPage ? (
          <ButtonPage />
        ) : genericComponent ? (
          DedicatedComponentPage ? (
            <DedicatedComponentPage />
          ) : (
            <ComponentDocTemplate component={genericComponent} />
          )
        ) : (
          <DashboardPage
            syncStatus={syncStatus}
            historyEntries={historyEntries}
            onRequestPreSync={requestPreSyncFromPortal}
          />
        )}
      </div>

      <SyncConfirmModal
        open={pendingModalState.open}
        scanning={pendingModalState.scanning}
        direction={pendingModalState.direction}
        items={pendingModalState.items}
        onConfirm={confirmSyncFromPortal}
        onCancel={cancelSyncFromPortal}
      />

      <SyncToast event={lastEvent} />
    </div>
  );
}
