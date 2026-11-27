import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { ButtonPage } from './pages/ButtonPage/ButtonPage';
import { HeaderPage } from './pages/HeaderPage/HeaderPage';
import { SidebarPage } from './pages/SidebarPage/SidebarPage';
import { ComponentPage } from './pages/ComponentPage/ComponentPage';
import { UpdatedCodePage } from './pages/UpdatedCodePage/UpdatedCodePage';
import { componentDocumentation } from './pages/ComponentPage/componentRegistry';
import { ProjectOverviewDashboard } from './components/ProjectOverviewDashboard';
import { RecentUpdatesBanner } from './components/RecentUpdatesBanner';
import { SyncToast } from './components/SyncToast';
import { SyncConfirmModal } from './components/SyncConfirmModal';
import { useSyncWebSocket } from './hooks/useSyncWebSocket';

const tokenModules = import.meta.glob<string>('../tokens/variables/*.scss', {
  eager: true,
  query: '?raw',
  import: 'default'
});

const tokenFilesList = Object.entries(tokenModules)
  .map(([filePath, content]) => {
    const fileName = filePath.split('/').pop() || filePath;
    return {
      fileName,
      relPath: `src/tokens/variables/${fileName}`,
      content,
      lines: content.split('\n').length
    };
  })
  .sort((a, b) => a.fileName.localeCompare(b.fileName));

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

function InstallationTokensView() {
  const [selectedTokenFile, setSelectedTokenFile] = useState<string>(
    tokenFilesList.find((t) => t.fileName === 'semantics.scss')?.fileName ??
      tokenFilesList[0]?.fileName ??
      'semantics.scss'
  );
  const [copyStatus, setCopyStatus] = useState('Copy');

  const activeToken =
    tokenFilesList.find((t) => t.fileName === selectedTokenFile) ?? tokenFilesList[0];

  const installCmd = `npm install @d1hdfc/Some-Components@main`;
  const usageSnippet = `import { Button } from '@d1hdfc/Some-Components';
import '@d1hdfc/Some-Components/style.css';

export function App() {
  return (
    <Button variant="primary" size="large" leftIcon rightIcon>
      Continue
    </Button>
  );
}`;

  const copyTokenContent = async () => {
    if (!activeToken) return;
    try {
      await navigator.clipboard.writeText(activeToken.content);
      setCopyStatus('Copied!');
      window.setTimeout(() => setCopyStatus('Copy'), 1800);
    } catch {
      setCopyStatus('Failed');
    }
  };

  return (
    <main className="docs-content" id="installation">
      <div className="docs-breadcrumbs">
        <a href="#dashboard">Dashboard</a>
        <span>/</span>
        <strong>Installation &amp; Tokens</strong>
      </div>

      <header className="docs-heading">
        <div>
          <p className="docs-eyebrow">OVERVIEW &amp; SYNC · PACKAGE &amp; DESIGN TOKENS</p>
          <div className="docs-title-row">
            <h1>Installation &amp; Semantic Design Tokens</h1>
            <span className="docs-status">
              <i /> 100% Token-Bound SCSS
            </span>
          </div>
          <p className="docs-intro">
            Install the shared <code>@d1hdfc/Some-Components</code> package and inspect the live
            Figma-synced design token variables in <code>src/tokens/variables/</code>. Every
            component stylesheet references semantic token variables rather than hardcoded pixels or
            hex values.
          </p>
        </div>
      </header>

      <section className="docs-section">
        <div className="docs-section-heading">
          <div>
            <h2>1. Package Installation &amp; Quick Start</h2>
            <p>
              Install the library and import the compiled token stylesheet once at your root entry
              point.
            </p>
          </div>
        </div>

        <div className="install-steps">
          <article className="example-card">
            <div className="example-card-heading" style={{ minHeight: 0 }}>
              <div>
                <h3>Install from GitHub Packages / npm</h3>
                <p>Run in your project root directory.</p>
              </div>
            </div>
            <div className="example-code">
              <pre>
                <code>{installCmd}</code>
              </pre>
            </div>
          </article>

          <article className="example-card">
            <div className="example-card-heading" style={{ minHeight: 0 }}>
              <div>
                <h3>Import Components &amp; Token Styles</h3>
                <p>All components automatically consume CSS custom properties from the token layer.</p>
              </div>
            </div>
            <div className="example-code">
              <pre>
                <code>{usageSnippet}</code>
              </pre>
            </div>
          </article>
        </div>
      </section>

      <section className="docs-section" id="tokens-inspector">
        <div className="docs-section-heading">
          <div>
            <h2>2. Live Design Token Variables (src/tokens/variables/)</h2>
            <p>
              Select any token collection file below to inspect the live SCSS maps and CSS custom
              properties synced with Figma Variables.
            </p>
          </div>
        </div>

        <div className="updated-code-bundle-selector">
          {tokenFilesList.map((tf) => (
            <button
              key={tf.fileName}
              type="button"
              className={`updated-code-bundle-pill${
                selectedTokenFile === tf.fileName ? ' updated-code-bundle-pill--active' : ''
              }`}
              onClick={() => setSelectedTokenFile(tf.fileName)}
            >
              <span>{tf.fileName}</span>
              <code>
                {tf.relPath} ({tf.lines} lines)
              </code>
            </button>
          ))}
        </div>

        {activeToken && (
          <div className="updated-code-active-inspector-card">
            <div className="updated-code-active-inspector-header">
              <div>
                <h3>
                  <code>{activeToken.relPath}</code>
                </h3>
                <p>Synced live with Figma Variable Collections via ws://localhost:3055</p>
              </div>
              <button
                type="button"
                className="updated-code-link-btn"
                onClick={copyTokenContent}
              >
                {copyStatus}
              </button>
            </div>
            <pre
              style={{
                margin: 0,
                padding: '16px 18px',
                borderRadius: 10,
                background: '#0F172A',
                color: '#E2E8F0',
                fontFamily: 'var(--portal-font-mono)',
                fontSize: 12,
                lineHeight: 1.55,
                maxHeight: 520,
                overflow: 'auto'
              }}
            >
              <code>{activeToken.content}</code>
            </pre>
          </div>
        )}
      </section>
    </main>
  );
}

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
    if (rawHash === 'updated-code' || rawHash === 'diffs') {
      return 'updated-code';
    }
    if (rawHash === 'installation' || rawHash === 'tokens' || rawHash === 'tokens-inspector') {
      return 'installation';
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
        rawHash === 'updated-code' ||
        rawHash === 'diffs' ||
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
  const isUpdatedCodePage = currentPage === 'updated-code';
  const isInstallationPage = currentPage === 'installation';
  const isButtonPage = currentPage === 'button';

  const genericComponent =
    !isDashboardPage && !isUpdatedCodePage && !isInstallationPage && !isButtonPage
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
          <main className="docs-content" id="dashboard">
            <ProjectOverviewDashboard
              syncStatus={syncStatus}
              historyEntries={historyEntries}
              onRequestPreSync={requestPreSyncFromPortal}
            />
            <RecentUpdatesBanner entries={historyEntries} />
          </main>
        ) : isUpdatedCodePage ? (
          <UpdatedCodePage
            entries={historyEntries}
            syncStatus={syncStatus}
            onRequestPreSync={requestPreSyncFromPortal}
          />
        ) : isInstallationPage ? (
          <InstallationTokensView />
        ) : isButtonPage ? (
          <ButtonPage />
        ) : genericComponent ? (
          DedicatedComponentPage ? (
            <DedicatedComponentPage />
          ) : (
            <ComponentPage component={genericComponent} historyEntries={historyEntries} />
          )
        ) : (
          <main className="docs-content" id="dashboard">
            <ProjectOverviewDashboard
              syncStatus={syncStatus}
              historyEntries={historyEntries}
              onRequestPreSync={requestPreSyncFromPortal}
            />
            <RecentUpdatesBanner entries={historyEntries} />
          </main>
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
