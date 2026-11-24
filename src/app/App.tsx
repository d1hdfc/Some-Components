import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { ButtonPage } from './pages/ButtonPage/ButtonPage';
import { HeaderPage } from './pages/HeaderPage/HeaderPage';
import { SidebarPage } from './pages/SidebarPage/SidebarPage';
import { ComponentPage } from './pages/ComponentPage/ComponentPage';
import { UpdatedCodePage } from './pages/UpdatedCodePage/UpdatedCodePage';
import { componentDocumentation } from './pages/ComponentPage/componentRegistry';
import { SyncToast } from './components/SyncToast';
import { SyncConfirmModal } from './components/SyncConfirmModal';
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

  const getCurrentPage = (): string => {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('installation')) return 'installation';
    if (hash.startsWith('updated-code')) return 'updated-code';
    return (
      componentDocumentation.find(
        (component) => hash === component.slug || hash === component.routeSlug
      )?.routeSlug ?? 'button'
    );
  };

  const [currentPage, setCurrentPage] = useState(getCurrentPage);

  useEffect(() => {
    const updatePage = () => {
      const hash = window.location.hash.slice(1);
      const isRouteHash =
        !hash ||
        hash.startsWith('installation') ||
        hash.startsWith('updated-code') ||
        componentDocumentation.some(
          (component) => hash === component.slug || hash === component.routeSlug
        );
      if (!isRouteHash && document.getElementById(hash)) return;
      setCurrentPage(getCurrentPage());
    };
    window.addEventListener('hashchange', updatePage);
    return () => window.removeEventListener('hashchange', updatePage);
  }, []);

  useEffect(() => {
    if (!lastEvent) return;
    if (
      lastEvent.event === 'FIGMA_TO_CODE_COMPLETE' ||
      lastEvent.event === 'FIGMA_TO_GITHUB_COMPLETE' ||
      lastEvent.event === 'CODE_TO_FIGMA_COMPLETE' ||
      lastEvent.event === 'LOCAL_COMPONENT_SCAFFOLDED'
    ) {
      const created = lastEvent.result?.createdCount ?? 0;
      const deleted = lastEvent.result?.deletedCount ?? 0;
      if (created > 0 || deleted > 0 || lastEvent.event === 'LOCAL_COMPONENT_SCAFFOLDED') {
        const timer = window.setTimeout(() => {
          window.location.reload();
        }, 650);
        return () => window.clearTimeout(timer);
      }
    }
  }, [lastEvent]);

  const isUpdatedCodePage = currentPage === 'updated-code';
  const genericComponent = !isUpdatedCodePage
    ? componentDocumentation.find(
        (component) => component.routeSlug === currentPage && component.routeSlug !== 'button'
      )
    : undefined;
  const DedicatedComponentPage = genericComponent
    ? componentPages.get(genericComponent.slug)
    : undefined;

  const markdownTocLinks: Array<{ href: string; label: string; nested?: boolean }> = [
    { href: '#component-docs', label: 'Documentation', nested: false },
    { href: '#md-figma-changelog-diff-status', label: 'Figma changelog', nested: true }
  ];

  const tocLinks: Array<{ href: string; label: string; nested?: boolean }> = isUpdatedCodePage
    ? [
        { href: '#recent-updates', label: 'What Updated (Sync Feed)' },
        { href: '#active-code-bundles', label: 'Active Component Bundles' }
      ]
    : genericComponent
      ? [
          ...markdownTocLinks,
          { href: '#component-examples', label: 'Preview & playground' },
          { href: '#component-installation', label: 'Installation' },
          { href: '#component-guidelines', label: 'Usage guidelines' },
          { href: '#component-api', label: 'API reference' }
        ]
      : [
          ...markdownTocLinks,
          { href: '#playground', label: 'Try it out' },
          { href: '#figma-matrix', label: 'Figma variant matrix' },
          { href: '#examples', label: 'Examples' },
          { href: '#variant-examples', label: 'Variants', nested: true },
          { href: '#size-examples', label: 'Sizes', nested: true },
          { href: '#icon-examples', label: 'Icons', nested: true },
          { href: '#state-examples', label: 'States', nested: true },
          { href: '#installation', label: 'Installation' },
          { href: '#guidelines', label: 'Usage guidelines' },
          { href: '#api', label: 'API reference' }
        ];

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

        {isUpdatedCodePage ? (
          <UpdatedCodePage
            entries={historyEntries}
            syncStatus={syncStatus}
            onRequestPreSync={requestPreSyncFromPortal}
          />
        ) : genericComponent ? (
          DedicatedComponentPage ? (
            <DedicatedComponentPage />
          ) : (
            <ComponentPage component={genericComponent} historyEntries={historyEntries} />
          )
        ) : (
          <ButtonPage
            historyEntries={historyEntries}
            syncStatus={syncStatus}
            onRequestPreSync={requestPreSyncFromPortal}
          />
        )}

        <aside className="docs-toc" aria-label="On this page">
          <h2>On this page</h2>
          <nav>
            {tocLinks.map(({ href, label, nested }) => (
              <a
                key={href}
                href={href}
                className={nested ? 'docs-toc-nested' : ''}
              >
                {label}
              </a>
            ))}
          </nav>
        </aside>
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
