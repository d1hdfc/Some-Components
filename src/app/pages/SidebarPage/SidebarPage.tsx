import { useEffect, useRef, useState } from 'react';
import { componentDocumentation } from '../ComponentPage/componentRegistry';
import './SidebarPage.scss';

const CATEGORIES: Record<string, string[]> = {
  'Form Controls': [
    'button',
    'final-input-area-component',
    'input-area',
    'input-field',
    'text-field',
    'text-area',
    'textarea',
    'textfield',
    'checkbox',
    'radio',
    'switch',
    'mpin-input',
    'search-bar'
  ],
  'Indicators': ['badge', 'chips', 'progress-bar', 'rating', 'status-bar', 'tag', 'toast', 'snackbar', 'tooltip'],
  'Navigation': ['tabs', 'pagination', 'carousel'],
  'Overlays': ['bottom-sheet', 'popover'],
  'Display': ['avatar', 'card', 'separator', 'focus-ring']
};

function toPascalPageName(slug: string): string {
  const pascal = slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
  return `${pascal || 'Component'}Page`;
}

function renderCategoryIcon(cat: string) {
  switch (cat) {
    case 'Form Controls':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <line x1="7" y1="12" x2="17" y2="12" />
        </svg>
      );
    case 'Indicators':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15 15" />
        </svg>
      );
    case 'Navigation':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
      );
    case 'Overlays':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      );
    default:
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
      );
  }
}

function categorize(links: Array<{ slug: string; name: string; pageTag: string }>) {
  const used = new Set<string>();
  const grouped: Record<string, Array<{ slug: string; name: string; pageTag: string }>> = {};

  for (const [cat, slugs] of Object.entries(CATEGORIES)) {
    const items = links.filter((l) => slugs.includes(l.slug));
    if (items.length > 0) {
      grouped[cat] = items;
      items.forEach((i) => used.add(i.slug));
    }
  }

  const rest = links.filter((l) => !used.has(l.slug));
  if (rest.length > 0) {
    grouped['Components'] = rest;
  }

  return grouped;
}

interface SidebarPageProps {
  currentPage: string;
  syncStatus: 'connecting' | 'connected' | 'disconnected';
  updatesCount?: number;
}

export function SidebarPage({ currentPage, syncStatus, updatesCount = 0 }: SidebarPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const searchRef = useRef<HTMLInputElement>(null);

  const allLinks = componentDocumentation.map(({ routeSlug, title }) => ({
    slug: routeSlug,
    name: title,
    pageTag: toPascalPageName(routeSlug)
  }));

  const query = searchQuery.trim().toLowerCase();
  const isSearching = query.length > 0;
  const visibleFlat = isSearching
    ? allLinks.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.slug.toLowerCase().includes(query) ||
          c.pageTag.toLowerCase().includes(query)
      )
    : [];

  const grouped = categorize(allLinks);

  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', focusSearch);
    return () => window.removeEventListener('keydown', focusSearch);
  }, []);

  const toggleCategory = (cat: string) => {
    setCollapsed((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <aside className="docs-sidebar" aria-label="Documentation navigation">
      {/* Quick Search / Filter */}
      <div className="docs-sidebar-top">
        <label className="docs-search">
          <svg
            className="docs-search-icon"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={searchRef}
            type="search"
            placeholder="Search components..."
            aria-label="Search documentation"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <kbd>Ctrl K</kbd>
        </label>
      </div>

      <nav className="docs-sidebar-nav">
        <p className="docs-nav-heading">OVERVIEW &amp; SYNC</p>

        <a
          href="#button"
          className={`docs-nav-overview-item${currentPage === 'button' ? ' docs-nav-active' : ''}`}
        >
          <span className="docs-nav-link-inner">
            <span className="docs-nav-icon-box docs-nav-icon-box--indigo">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </span>
            <span>Dashboard &amp; Overview</span>
          </span>
        </a>

        <a
          href="#updated-code"
          className={`docs-nav-overview-item${currentPage === 'updated-code' ? ' docs-nav-active' : ''}`}
        >
          <span className="docs-nav-link-inner">
            <span className="docs-nav-icon-box docs-nav-icon-box--blue">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </span>
            <span>Updated Code &amp; Diffs</span>
          </span>
          {updatesCount > 0 && (
            <span className="docs-nav-count docs-nav-count--accent">{updatesCount}</span>
          )}
        </a>

        <a
          href="#installation"
          className={`docs-nav-overview-item${currentPage === 'installation' ? ' docs-nav-active' : ''}`}
        >
          <span className="docs-nav-link-inner">
            <span className="docs-nav-icon-box docs-nav-icon-box--emerald">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </span>
            <span>Installation &amp; Tokens</span>
          </span>
        </a>

        <div className="docs-nav-divider" />

        {isSearching ? (
          <>
            <p className="docs-nav-heading">SEARCH RESULTS ({visibleFlat.length})</p>
            {visibleFlat.length === 0 ? (
              <p className="docs-search-empty">No matching components</p>
            ) : (
              visibleFlat.map((c) => (
                <a
                  key={c.slug}
                  href={`#${c.slug}`}
                  className={`docs-nav-comp-item${currentPage === c.slug ? ' docs-nav-active' : ''}`}
                  aria-current={currentPage === c.slug ? 'page' : undefined}
                >
                  <span className="docs-nav-link-inner">
                    <span className="docs-nav-comp-dot" />
                    <span className="docs-nav-comp-name">{c.name}</span>
                  </span>
                  <code className="docs-nav-page-tag">{c.pageTag}</code>
                </a>
              ))
            )}
          </>
        ) : (
          Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="docs-nav-group">
              <button
                type="button"
                className="docs-nav-category"
                onClick={() => toggleCategory(cat)}
                aria-expanded={!collapsed[cat]}
              >
                <span className="docs-nav-category-label">
                  <span className="docs-nav-category-icon">{renderCategoryIcon(cat)}</span>
                  <span>{cat}</span>
                </span>
                <span className="docs-nav-category-meta">
                  <span className="docs-nav-count">{items.length}</span>
                  <span className="docs-nav-chevron">{collapsed[cat] ? '›' : '⌄'}</span>
                </span>
              </button>
              {!collapsed[cat] && (
                <div className="docs-nav-group-items">
                  {items.map((c) => (
                    <a
                      key={c.slug}
                      href={`#${c.slug}`}
                      className={`docs-nav-comp-item${currentPage === c.slug ? ' docs-nav-active' : ''}`}
                      aria-current={currentPage === c.slug ? 'page' : undefined}
                    >
                      <span className="docs-nav-link-inner">
                        <span className="docs-nav-comp-dot" />
                        <span className="docs-nav-comp-name">{c.name}</span>
                      </span>
                      <code className="docs-nav-page-tag">{c.pageTag}</code>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </nav>

      {/* Bottom Workspace Card */}
      <div className="docs-sidebar-footer">
        <span className="docs-sidebar-footer-mark">H</span>
        <div className="docs-sidebar-footer-info">
          <strong>Some Components</strong>
          <small>
            {allLinks.length} component{allLinks.length === 1 ? '' : 's'} · {allLinks.length + 2} pages
          </small>
        </div>
        <span
          className={`docs-sidebar-sync-dot docs-sidebar-sync-dot--${syncStatus}`}
          title={`WebSocket Bridge: ${syncStatus}`}
        />
      </div>
    </aside>
  );
}
