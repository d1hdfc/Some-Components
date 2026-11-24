import { useState } from 'react';
import type { SyncHistoryEntry } from '../hooks/useSyncWebSocket';
import './RecentUpdatesBanner.scss';

interface RecentUpdatesBannerProps {
  entries: SyncHistoryEntry[];
  activeSlug?: string;
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

export function RecentUpdatesBanner({ entries }: RecentUpdatesBannerProps) {
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
      {/* Card Header */}
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

      {/* 5-Column Sync Feed Table */}
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

                // Deduplicate short file names while keeping order
                const fileChips = Array.from(new Set(rawFiles)).slice(0, 6);
                const hasDiff = Array.isArray(item.files) && item.files.some((f) => Boolean(f.diff));
                const isExpanded = expandedDiffId === item.id;

                return (
                  <tr key={item.id || idx} className="sync-feed-row">
                    {/* Col 1: COMPONENT & PAGE */}
                    <td className="sync-feed-cell-comp">
                      <strong className="sync-feed-slug">{item.slug || item.componentName}</strong>
                      <span className="sync-feed-page-meta">
                        {pageName} · {dirText}
                      </span>
                    </td>

                    {/* Col 2: ACTION */}
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

                    {/* Col 3: FILES CHANGED */}
                    <td className="sync-feed-cell-files">
                      <div className="sync-file-chips">
                        {fileChips.map((chip) => (
                          <code key={chip} className="sync-file-chip">
                            {chip}
                          </code>
                        ))}
                      </div>
                    </td>

                    {/* Col 4: DESIGNER & DEVELOPER SUMMARY */}
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

                    {/* Col 5: SYNCED */}
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
