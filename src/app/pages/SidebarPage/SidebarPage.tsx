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

function categorize(links: Array<{ slug: string; name: string }>) {
  const used = new Set<string>();
  const grouped: Record<string, Array<{ slug: string; name: string }>> = {};

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
    name: title
  }));

  const query = searchQuery.trim().toLowerCase();
  const isSearching = query.length > 0;
  const visibleFlat = isSearching
    ? allLinks.filter((c) => c.name.toLowerCase().includes(query) || c.slug.toLowerCase().includes(query))
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
      <label className="docs-search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
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

      <nav>
        <p className="docs-nav-heading">OVERVIEW &amp; SYNC</p>
        <a
          href="#button"
          className={currentPage === 'button' ? 'docs-nav-active' : ''}
        >
          <span className="docs-nav-link-inner">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
            <span>Dashboard &amp; Overview</span>
          </span>
        </a>
        <a
          href="#updated-code"
          className={currentPage === 'updated-code' ? 'docs-nav-active' : ''}
        >
          <span className="docs-nav-link-inner">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span>Updated Code &amp; Diffs</span>
          </span>
          {updatesCount > 0 && <span className="docs-nav-count docs-nav-count--accent">{updatesCount}</span>}
        </a>
        <a
          href="#installation"
          className={currentPage === 'installation' ? 'docs-nav-active' : ''}
        >
          <span className="docs-nav-link-inner">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Installation &amp; Tokens</span>
          </span>
        </a>

        <div className="docs-nav-divider" />

        {isSearching ? (
          <>
            <p className="docs-nav-heading">SEARCH RESULTS</p>
            {visibleFlat.length === 0 ? (
              <p className="docs-search-empty">No matching components</p>
            ) : (
              visibleFlat.map((c) => (
                <a
                  key={c.slug}
                  href={`#${c.slug}`}
                  className={currentPage === c.slug ? 'docs-nav-active' : ''}
                  aria-current={currentPage === c.slug ? 'page' : undefined}
                >
                  <span className="docs-nav-link-inner">
                    <span className="docs-nav-comp-dot" />
                    <span>{c.name}</span>
                  </span>
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
                  {renderCategoryIcon(cat)}
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
                      className={currentPage === c.slug ? 'docs-nav-active' : ''}
                      aria-current={currentPage === c.slug ? 'page' : undefined}
                    >
                      <span className="docs-nav-link-inner">
                        <span className="docs-nav-comp-dot" />
                        <span>{c.name}</span>
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </nav>

      <div className="docs-sidebar-footer">
        <span className="docs-sidebar-footer-mark">H</span>
        <span>
          <strong>Some Components</strong>
          <small>
            Design system · {allLinks.length} component{allLinks.length === 1 ? '' : 's'}
          </small>
        </span>
        <span
          className={`docs-sidebar-sync-dot docs-sidebar-sync-dot--${syncStatus}`}
          title={`Sync: ${syncStatus}`}
        />
      </div>
    </aside>
  );
}
