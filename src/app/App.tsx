import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import { ButtonPage } from './pages/ButtonPage/ButtonPage';
import { HeaderPage } from './pages/HeaderPage/HeaderPage';
import { SidebarPage } from './pages/SidebarPage/SidebarPage';
import { ComponentPage } from './pages/ComponentPage/ComponentPage';
import { componentDocumentation } from './pages/ComponentPage/componentRegistry';
import { SyncToast } from './components/SyncToast';
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
  const { status: syncStatus, lastEvent } = useSyncWebSocket();

  const getCurrentPage = (): string => {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('installation')) return 'installation';
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
        componentDocumentation.some(
          (component) => hash === component.slug || hash === component.routeSlug
        );
      if (!isRouteHash && document.getElementById(hash)) return;
      setCurrentPage(getCurrentPage());
    };
    window.addEventListener('hashchange', updatePage);
    return () => window.removeEventListener('hashchange', updatePage);
  }, []);

  const genericComponent = componentDocumentation.find(
    (component) => component.routeSlug === currentPage && component.routeSlug !== 'button'
  );
  const DedicatedComponentPage = genericComponent
    ? componentPages.get(genericComponent.slug)
    : undefined;

  const markdownTocLinks: Array<{ href: string; label: string; nested?: boolean }> = [
    { href: '#component-docs', label: 'Documentation', nested: false },
    { href: '#md-figma-changelog-diff-status', label: 'Figma changelog', nested: true }
  ];

  const tocLinks: Array<{ href: string; label: string; nested?: boolean }> = genericComponent
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
    <div className="docs-shell">
      <HeaderPage
        syncStatus={syncStatus}
        currentPage={currentPage}
        onNav={(page: string) => setCurrentPage(page)}
      />
      <div className="docs-layout" id="top">
        <SidebarPage currentPage={currentPage} syncStatus={syncStatus} />

        {genericComponent ? (
          DedicatedComponentPage ? (
            <DedicatedComponentPage />
          ) : (
            <ComponentPage component={genericComponent} />
          )
        ) : (
          <ButtonPage />
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

      <SyncToast event={lastEvent} />
    </div>
  );
}
