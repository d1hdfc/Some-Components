import { useState } from 'react';
import { componentDocumentation } from '../../shared/componentRegistry';
import type { SyncHistoryEntry, SyncStatus } from '../../hooks/useSyncWebSocket';
import './DashboardPage.scss';

interface DashboardPageProps {
  syncStatus: SyncStatus;
  historyEntries: SyncHistoryEntry[];
  onRequestPreSync?: (direction: 'figma-to-code' | 'code-to-figma' | 'figma-to-github') => void;
}

type ActionFilter = 'all' | 'added' | 'updated' | 'deleted';

function toPascalPageName(slug: string, fallback?: string): string {
  if (fallback && fallback.endsWith('Page')) return fallback;
  const pascal = String(slug || '')
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
  return `${pascal || 'Component'}Page`;
}

function getShortFileName(filePath: string): string {
  const parts = String(filePath || '').replace(/\\/g, '/').split('/');
  return parts[parts.length - 1] || filePath;
}

function getDefaultBundleFiles(slug: string, action: string): string[] {
  const s = slug || 'component';
  if (action.startsWith('upd')) {
    return [`${s}.scss`, `${s}.tsx`, `${s}.md`];
  }
  return [`${s}.tsx`, `${s}.types.ts`, `${s}.scss`, `${s}.dart`, `${s}.md`];
}

function formatRelativeAgo(iso: string, index: number): string {
  try {
    const diffMs = Date.now() - new Date(iso).getTime();
    if (!Number.isNaN(diffMs) && diffMs >= 0) {
      const mins = Math.max(1, Math.floor(diffMs / 60000));
      if (mins < 60) return `${mins} mins ago`;
      const hrs = Math.floor(mins / 60);
      if (hrs < 24) return `${hrs} hrs ago`;
      const days = Math.floor(hrs / 24);
      return `${days}d ago`;
    }
  } catch {
    // ignore
  }
  const presets = ['2 mins ago', '18 mins ago', '3 hrs ago', '5 hrs ago'];
  return presets[index % presets.length];
}

export function SyncFeedTableCard({ entries }: { entries: SyncHistoryEntry[] }) {
  const [filter, setFilter] = useState<ActionFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedDiffId, setExpandedDiffId] = useState<string | null>(null);

  const safeEntries = Array.isArray(entries) ? entries : [];

  const addedCount = safeEntries.filter((e) => (e.action || '').toLowerCase().startsWith('add')).length;
  const updatedCount = safeEntries.filter((e) => (e.action || '').toLowerCase().startsWith('upd')).length;
  const deletedCount = safeEntries.filter((e) => (e.action || '').toLowerCase().startsWith('del')).length;

  const filteredEntries = safeEntries.filter((entry) => {
    const act = (entry.action || '').toLowerCase();
    if (filter === 'added' && !act.startsWith('add')) return false;
    if (filter === 'updated' && !act.startsWith('upd')) return false;
    if (filter === 'deleted' && !act.startsWith('del')) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const matchName = (entry.componentName || '').toLowerCase().includes(q);
      const matchSlug = (entry.slug || '').toLowerCase().includes(q);
      const matchSummary = (entry.summary || '').toLowerCase().includes(q);
      const matchFile = (entry.files || []).some((f) => f.path.toLowerCase().includes(q));
      return matchName || matchSlug || matchSummary || matchFile;
    }
    return true;
  });

  return (
    <section className="sync-feed-card" aria-label="What Updated (Recent Sync Feed)">
      <div className="sync-feed-header">
        <div className="sync-feed-header-left">
          <h2 className="sync-feed-title">What Updated (Recent Sync Feed)</h2>
          <p className="sync-feed-subtitle">
            Plain-English summaries and file diffs for every confirmed Figma ↔ Code update.
          </p>
        </div>

        <div className="sync-feed-controls">
          <div className="sync-feed-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'all'}
              className={`sync-feed-tab${filter === 'all' ? ' sync-feed-tab--active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({safeEntries.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'added'}
              className={`sync-feed-tab${filter === 'added' ? ' sync-feed-tab--active' : ''}`}
              onClick={() => setFilter('added')}
            >
              Added ({addedCount})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'updated'}
              className={`sync-feed-tab${filter === 'updated' ? ' sync-feed-tab--active' : ''}`}
              onClick={() => setFilter('updated')}
            >
              Updated ({updatedCount})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'deleted'}
              className={`sync-feed-tab${filter === 'deleted' ? ' sync-feed-tab--active' : ''}`}
              onClick={() => setFilter('deleted')}
            >
              Deleted ({deletedCount})
            </button>
          </div>

          <label className="sync-feed-search">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              placeholder="Filter by component or file..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="sync-feed-table-wrap">
        <table className="sync-feed-table">
          <thead>
            <tr>
              <th>COMPONENT &amp; PAGE</th>
              <th>ACTION</th>
              <th>FILES CHANGED</th>
              <th>DESIGNER &amp; DEVELOPER SUMMARY</th>
              <th className="sync-feed-th-right">SYNCED</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.length === 0 ? (
              <tr>
                <td colSpan={5} className="sync-feed-empty-cell">
                  No matching sync updates found for the selected filter.
                </td>
              </tr>
            ) : (
              filteredEntries.map((item, idx) => {
                const act = (item.action || 'updated').toLowerCase();
                const isAdded = act.startsWith('add');
                const isDeleted = act.startsWith('del');
                const pageName = toPascalPageName(item.slug, item.pageName);
                const dirText =
                  item.direction === 'code-to-figma'
                    ? 'Code → Figma'
                    : item.direction === 'figma-to-github'
                      ? 'Figma → GitHub'
                      : 'Figma → Code';

                const rawFiles =
                  Array.isArray(item.files) && item.files.length > 0
                    ? item.files.map((f) => getShortFileName(f.path))
                    : getDefaultBundleFiles(item.slug, act);

                const fileChips = Array.from(new Set(rawFiles)).slice(0, 6);
                const hasDiff = Array.isArray(item.files) && item.files.some((f) => Boolean(f.diff));
                const isExpanded = expandedDiffId === item.id;

                return (
                  <tr key={item.id || idx} className="sync-feed-row">
                    <td className="sync-feed-cell-comp">
                      <strong className="sync-feed-slug">{item.slug || item.componentName}</strong>
                      <span className="sync-feed-page-meta">
                        {pageName} · {dirText}
                      </span>
                    </td>

                    <td className="sync-feed-cell-action">
                      {isAdded ? (
                        <span className="sync-pill sync-pill--added">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="16" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                          </svg>
                          <span>Added</span>
                        </span>
                      ) : isDeleted ? (
                        <span className="sync-pill sync-pill--deleted">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                          </svg>
                          <span>Deleted</span>
                        </span>
                      ) : (
                        <span className="sync-pill sync-pill--updated">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                          </svg>
                          <span>Updated</span>
                        </span>
                      )}
                    </td>

                    <td className="sync-feed-cell-files">
                      <div className="sync-file-chips">
                        {fileChips.map((chip) => (
                          <code key={chip} className="sync-file-chip">
                            {chip}
                          </code>
                        ))}
                      </div>
                    </td>

                    <td className="sync-feed-cell-summary">
                      <p className="sync-feed-summary-text">{item.summary}</p>
                      {hasDiff && (
                        <button
                          type="button"
                          className="sync-feed-diff-toggle"
                          onClick={() => setExpandedDiffId(isExpanded ? null : item.id)}
                        >
                          {isExpanded ? 'Hide file diff' : 'Inspect file diff'}
                        </button>
                      )}
                      {isExpanded && Array.isArray(item.files) && (
                        <div className="sync-feed-inline-diffs">
                          {item.files
                            .filter((f) => Boolean(f.diff))
                            .map((f, fIdx) => (
                              <div key={fIdx} className="sync-feed-diff-box">
                                <div className="sync-feed-diff-box-head">
                                  <code>{f.path}</code>
                                  <span>{f.action}</span>
                                </div>
                                <pre>
                                  <code>{f.diff}</code>
                                </pre>
                              </div>
                            ))}
                        </div>
                      )}
                    </td>

                    <td className="sync-feed-cell-time">
                      <span className="sync-feed-time">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{formatRelativeAgo(item.timestamp, idx)}</span>
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function DashboardPage({
  syncStatus,
  historyEntries,
  onRequestPreSync
}: DashboardPageProps) {
  const totalComponents = componentDocumentation.length;
  const totalPages = totalComponents + 3;
  const isOnline = syncStatus === 'connected';

  return (
    <main className="docs-content" id="dashboard">
      <section className="exec-dashboard-section" aria-label="Design System Project Overview">
        {/* 1. Standalone White Hero Card */}
        <div className="exec-hero-card">
          <div className="exec-hero-left">
            <div className="exec-dashboard-badges">
              <span className="exec-pill exec-pill--brand">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>HDFC Design System Portal</span>
              </span>
              <span className={`exec-pill ${isOnline ? 'exec-pill--online' : 'exec-pill--offline'}`}>
                <span className="exec-pill-dot" />
                <span>
                  {isOnline ? 'Bridge Active · ws://localhost:3055' : 'Bridge Offline · ws://localhost:3055'}
                </span>
              </span>
            </div>

            <h2 className="exec-dashboard-title">
              Bi-Directional Figma ↔ Code Design System &amp; Multi-Platform Hub
            </h2>

            <p className="exec-dashboard-desc">
              Confirmation-gated sync pipeline connecting Figma libraries directly to React (
              <code>.tsx</code>, <code>.types.ts</code>), semantic token stylesheets (
              <code>.scss</code>), Flutter widgets (<code>.dart</code>), and live <code>.md</code>{' '}
              specs.
            </p>
          </div>

          {onRequestPreSync && (
            <div className="exec-dashboard-actions">
              <button
                type="button"
                className="exec-sync-btn exec-sync-btn--f2c"
                onClick={() => onRequestPreSync('figma-to-code')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Figma → Code</span>
              </button>
              <button
                type="button"
                className="exec-sync-btn exec-sync-btn--c2f"
                onClick={() => onRequestPreSync('code-to-figma')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span>Code → Figma</span>
              </button>
              <a href="#latest-updated-code" className="exec-sync-btn exec-sync-btn--diff">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                  <line x1="14" y1="4" x2="10" y2="20" />
                </svg>
                <span>Latest Updated Code</span>
              </a>
            </div>
          )}
        </div>

        {/* 2. Standalone 4-Column KPI Grid */}
        <div className="exec-metrics-grid">
          <div className="exec-metric-card exec-metric-card--indigo">
            <div className="exec-metric-top">
              <span className="exec-metric-label">Component Bundles</span>
              <div className="exec-metric-icon exec-metric-icon--indigo">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                </svg>
              </div>
            </div>
            <strong className="exec-metric-value">{totalComponents}</strong>
            <small className="exec-metric-sub">
              Strict 5-file architecture (.tsx, .types.ts, .scss, .dart, .md)
            </small>
          </div>

          <div className="exec-metric-card exec-metric-card--violet">
            <div className="exec-metric-top">
              <span className="exec-metric-label">Generated Pages</span>
              <div className="exec-metric-icon exec-metric-icon--violet">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <polyline points="10 13 8 15 10 17" />
                  <polyline points="14 13 16 15 14 17" />
                </svg>
              </div>
            </div>
            <strong className="exec-metric-value">{totalPages}</strong>
            <small className="exec-metric-sub">Auto-mapped to &lt;ComponentName&gt;Page</small>
          </div>

          <div className="exec-metric-card exec-metric-card--emerald">
            <div className="exec-metric-top">
              <span className="exec-metric-label">Token Architecture</span>
              <div className="exec-metric-icon exec-metric-icon--emerald">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
            </div>
            <strong className="exec-metric-value exec-metric-value--text">100% Semantic</strong>
            <small className="exec-metric-sub">Bound to src/tokens/variables/</small>
          </div>

          <div className="exec-metric-card exec-metric-card--amber">
            <div className="exec-metric-top">
              <span className="exec-metric-label">Recent Updates</span>
              <div className="exec-metric-icon exec-metric-icon--amber">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="17 1 21 5 17 9" />
                  <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                  <polyline points="7 23 3 19 7 15" />
                  <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>
              </div>
            </div>
            <strong className="exec-metric-value">{historyEntries.length}</strong>
            <small className="exec-metric-sub">Confirmation-gated surgical diffs</small>
          </div>
        </div>

        {/* 3. Standalone 3-Column Workflow Cards */}
        <div className="exec-pillars-grid">
          <div className="exec-pillar">
            <span className="exec-pillar-num exec-pillar-num--indigo">01</span>
            <div className="exec-pillar-body">
              <div className="exec-pillar-header">
                <span className="exec-pillar-icon exec-pillar-icon--indigo">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    <line x1="12" y1="11" x2="12" y2="17" />
                    <line x1="9" y1="14" x2="15" y2="14" />
                  </svg>
                </span>
                <strong>Auto Folder → Page Scaffolding</strong>
              </div>
              <p className="exec-pillar-text">
                Creating a component folder in src/components/ auto-builds its 5-file bundle and
                &lt;ComponentName&gt;Page route.
              </p>
            </div>
          </div>

          <div className="exec-pillar">
            <span className="exec-pillar-num exec-pillar-num--emerald">02</span>
            <div className="exec-pillar-body">
              <div className="exec-pillar-header">
                <span className="exec-pillar-icon exec-pillar-icon--emerald">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </span>
                <strong>Pre-Sync Diff + &ldquo;Allow&rdquo; Gate</strong>
              </div>
              <p className="exec-pillar-text">
                Both Figma → Code and Code → Figma preview exact diffs in a confirmation modal before
                writing any changes.
              </p>
            </div>
          </div>

          <div className="exec-pillar">
            <span className="exec-pillar-num exec-pillar-num--violet">03</span>
            <div className="exec-pillar-body">
              <div className="exec-pillar-header">
                <span className="exec-pillar-icon exec-pillar-icon--violet">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <line x1="9" y1="1" x2="9" y2="4" />
                    <line x1="15" y1="1" x2="15" y2="4" />
                    <line x1="9" y1="20" x2="9" y2="23" />
                    <line x1="15" y1="20" x2="15" y2="23" />
                    <line x1="20" y1="9" x2="23" y2="9" />
                    <line x1="20" y1="14" x2="23" y2="14" />
                    <line x1="1" y1="9" x2="4" y2="9" />
                    <line x1="1" y1="14" x2="4" y2="14" />
                  </svg>
                </span>
                <strong>Targeted Single-Component Sync</strong>
              </div>
              <p className="exec-pillar-text">
                Granular diff detection ensures editing one component syncs only that component—never
                the entire library.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SyncFeedTableCard entries={historyEntries} />
    </main>
  );
}

export default DashboardPage;

