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
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
      );
    default:
      return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
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

export function SidebarPage({ currentPage, updatesCount = 0 }: SidebarPageProps) {
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
            strokeWidth="2"
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
            <svg className="docs-nav-inline-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <span>Dashboard Overview</span>
          </span>
        </a>

        <a
          href="#updated-code"
          className={`docs-nav-overview-item${currentPage === 'updated-code' ? ' docs-nav-active' : ''}`}
        >
          <span className="docs-nav-link-inner">
            <svg className="docs-nav-inline-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
              <line x1="14" y1="4" x2="10" y2="20" />
            </svg>
            <span>Updated Code &amp; Diffs</span>
          </span>
          {updatesCount > 0 && (
            <span className="docs-nav-count docs-nav-count--blue">{updatesCount}</span>
          )}
        </a>

        <a
          href="#installation"
          className={`docs-nav-overview-item${currentPage === 'installation' ? ' docs-nav-active' : ''}`}
        >
          <span className="docs-nav-link-inner">
            <svg className="docs-nav-inline-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
              <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
              <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
              <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
            </svg>
            <span>Installation &amp; Tokens</span>
          </span>
        </a>

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
                  className={`docs-nav-comp-item${currentPage === c.slug ? ' docs-nav-comp-active' : ''}`}
                  aria-current={currentPage === c.slug ? 'page' : undefined}
                >
                  <span className="docs-nav-link-inner">
                    <span className="docs-nav-comp-dot" />
                    <span className="docs-nav-comp-name">{c.name}</span>
                  </span>
                  <span className="docs-nav-page-tag">{c.pageTag}</span>
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
                  <svg
                    className={`docs-nav-chevron${collapsed[cat] ? ' docs-nav-chevron--collapsed' : ''}`}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>
              {!collapsed[cat] && (
                <div className="docs-nav-group-items">
                  {items.map((c) => (
                    <a
                      key={c.slug}
                      href={`#${c.slug}`}
                      className={`docs-nav-comp-item${currentPage === c.slug ? ' docs-nav-comp-active' : ''}`}
                      aria-current={currentPage === c.slug ? 'page' : undefined}
                    >
                      <span className="docs-nav-link-inner">
                        <span className="docs-nav-comp-dot" />
                        <span className="docs-nav-comp-name">{c.name}</span>
                      </span>
                      <span className="docs-nav-page-tag">{c.pageTag}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </nav>
    </aside>
  );
}
