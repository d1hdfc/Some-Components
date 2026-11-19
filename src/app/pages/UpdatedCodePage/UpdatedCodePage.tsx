import { useState } from 'react';
import type { SyncHistoryEntry } from '../../hooks/useSyncWebSocket';
import { componentDocumentation } from '../ComponentPage/componentRegistry';
import { ComponentSourceInspector } from '../../components/MarkdownView';
import './UpdatedCodePage.scss';

interface UpdatedCodePageProps {
  entries: SyncHistoryEntry[];
  onRequestPreSync?: (direction: 'figma-to-code' | 'code-to-figma' | 'figma-to-github') => void;
}

type ActionFilter = 'all' | 'added' | 'updated' | 'deleted';

function formatTimestamp(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  } catch {
    return iso;
  }
}

function renderDiffLines(diffText: string) {
  const lines = String(diffText || '').split('\n');
  return lines.map((line, i) => {
    const trimmed = line.trim();
    const isAdd = trimmed.startsWith('+');
    const isDel = trimmed.startsWith('-');
    const isHeader = trimmed.startsWith('@@');
    const cls = isAdd
      ? 'code-diff-line code-diff-line--add'
      : isDel
        ? 'code-diff-line code-diff-line--del'
        : isHeader
          ? 'code-diff-line code-diff-line--hunk'
          : 'code-diff-line';
    return (
      <div key={i} className={cls}>
        {line}
      </div>
    );
  });
}

export function UpdatedCodePage({ entries, onRequestPreSync }: UpdatedCodePageProps) {
  const [filter, setFilter] = useState<ActionFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedInspectorId, setExpandedInspectorId] = useState<string | null>(null);
  const [selectedLiveSlug, setSelectedLiveSlug] = useState<string>(
    componentDocumentation[0]?.slug ?? 'button'
  );

  const activeSlugsSet = new Set(componentDocumentation.map((c) => c.slug));

  const addedCount = entries.filter((e) => e.action.toLowerCase().startsWith('add')).length;
  const updatedCount = entries.filter((e) => e.action.toLowerCase().startsWith('upd')).length;
  const deletedCount = entries.filter((e) => e.action.toLowerCase().startsWith('del')).length;

  const filteredEntries = entries.filter((entry) => {
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
    <main className="docs-content updated-code-page" id="updated-code">
      <div className="docs-breadcrumbs">
        <a href="#button">Dashboard</a>
        <span>/</span>
        <strong>Updated Code &amp; Sync History</strong>
      </div>

      <header className="docs-heading">
        <div className="updated-code-hero">
          <div>
            <p className="docs-eyebrow">SURGICAL BI-DIRECTIONAL SYNC · CODE &amp; DIFF INSPECTOR</p>
            <div className="docs-title-row">
              <h1>Updated Code &amp; Sync Activity</h1>
              <span className="docs-status">
                <i /> Targeted Single-Component Sync
              </span>
            </div>
            <p className="docs-intro">
              View every component, token, and page updated between Figma and local VS Code. Written
              in clear, plain language for both <strong>designers</strong> and{' '}
              <strong>developers</strong>, alongside exact file diffs (<code>.tsx</code>,{' '}
              <code>.scss</code>, <code>.types.ts</code>, <code>.dart</code>, <code>.md</code>).
            </p>
          </div>

          {onRequestPreSync && (
            <div className="updated-code-sync-actions">
              <button
                type="button"
                className="updated-code-action-btn updated-code-action-btn--f2c"
                onClick={() => onRequestPreSync('figma-to-code')}
              >
                Scan Figma ➔ Code Changes
              </button>
              <button
                type="button"
                className="updated-code-action-btn updated-code-action-btn--c2f"
                onClick={() => onRequestPreSync('code-to-figma')}
              >
                Scan Code ➔ Figma Changes
              </button>
            </div>
          )}
        </div>

        {/* KPI Summary Cards */}
        <div className="updated-code-kpi-grid">
          <div className="updated-code-kpi-card">
            <span>Active Components in Code</span>
            <strong>{componentDocumentation.length}</strong>
            <small>5-file bundle + Portal Page</small>
          </div>
          <div className="updated-code-kpi-card updated-code-kpi-card--added">
            <span>Added Components</span>
            <strong>+{addedCount}</strong>
            <small>Scaffolded in src/components/</small>
          </div>
          <div className="updated-code-kpi-card updated-code-kpi-card--updated">
            <span>Updated Components &amp; Tokens</span>
            <strong>~{updatedCount}</strong>
            <small>Surgical property &amp; style edits</small>
          </div>
          <div className="updated-code-kpi-card updated-code-kpi-card--deleted">
            <span>Deleted Components</span>
            <strong>-{deletedCount}</strong>
            <small>Surgically cleaned from Figma/Code</small>
          </div>
        </div>
      </header>

      {/* SECTION 1: RECENT SYNC UPDATES & CODE DIFFS */}
      <section className="docs-section" id="recent-updates">
        <div className="docs-section-heading updated-code-filter-bar">
          <div>
            <h2>What Updated (Recent Sync &amp; Code Changes)</h2>
            <p>
              Plain-English summaries and exact code diffs for every confirmed Figma ↔ Code update.
            </p>
          </div>

          <div className="updated-code-controls">
            <div className="updated-code-filter-tabs" role="tablist">
              {(['all', 'added', 'updated', 'deleted'] as ActionFilter[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`updated-code-filter-tab${filter === tab ? ' updated-code-filter-tab--active' : ''
                    }`}
                  onClick={() => setFilter(tab)}
                >
                  {tab === 'all'
                    ? `All (${entries.length})`
                    : tab === 'added'
                      ? `Added (${addedCount})`
                      : tab === 'updated'
                        ? `Updated (${updatedCount})`
                        : `Deleted (${deletedCount})`}
                </button>
              ))}
            </div>

            <input
              type="search"
              className="updated-code-search"
              placeholder="Filter by component or file..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredEntries.length === 0 ? (
          <div className="updated-code-empty">
            No matching sync updates found for the selected filter.
          </div>
        ) : (
          <div className="updated-code-feed">
            {filteredEntries.map((entry) => {
              const act = (entry.action || 'updated').toLowerCase();
              const isAdded = act.startsWith('add');
              const isDeleted = act.startsWith('del');
              const badgeClass = isAdded
                ? 'sync-action-badge--added'
                : isDeleted
                  ? 'sync-action-badge--deleted'
                  : 'sync-action-badge--updated';
              const badgeText = isAdded ? '+ ADDED' : isDeleted ? '- DELETED' : '~ UPDATED';
              const dirLabel =
                entry.direction === 'code-to-figma'
                  ? 'Code ➔ Figma Canvas'
                  : entry.direction === 'figma-to-github'
                    ? '🚀 Figma ➔ GitHub'
                    : 'Figma ➔ VS Code';
              const canInspectLive = activeSlugsSet.has(entry.slug);
              const isInspectorOpen = expandedInspectorId === entry.id;

              return (
                <article key={entry.id} className="updated-code-card">
                  <div className="updated-code-card-header">
                    <div className="updated-code-card-meta">
                      <span className={`sync-action-badge ${badgeClass}`}>{badgeText}</span>
                      <span className="updated-code-direction-pill">{dirLabel}</span>
                      <h3 className="updated-code-comp-title">
                        {entry.componentName || entry.slug}
                      </h3>
                      {entry.pageName && (
                        <code className="updated-code-page-chip">{entry.pageName}</code>
                      )}
                    </div>

                    <div className="updated-code-card-actions">
                      <time className="updated-code-timestamp">
                        {formatTimestamp(entry.timestamp)}
                      </time>
                      {canInspectLive && (
                        <>
                          <a href={`#${entry.slug}`} className="updated-code-link-btn">
                            Open Component Page ↗
                          </a>
                          <button
                            type="button"
                            className="updated-code-link-btn updated-code-link-btn--primary"
                            onClick={() =>
                              setExpandedInspectorId(isInspectorOpen ? null : entry.id)
                            }
                          >
                            {isInspectorOpen ? 'Hide Full 5-File Code' : 'View Full 5-File Code'}
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Plain-English Summary */}
                  <p className="updated-code-plain-summary">{entry.summary}</p>

                  {/* Detailed Bullet Breakdown */}
                  {Array.isArray(entry.details) && entry.details.length > 0 && (
                    <ul className="updated-code-details-list">
                      {entry.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  )}

                  {/* Updated Files & Line Diffs */}
                  {Array.isArray(entry.files) && entry.files.length > 0 && (
                    <div className="updated-code-files-grid">
                      {entry.files.map((file, idx) => (
                        <div key={`${file.path}-${idx}`} className="updated-code-file-box">
                          <div className="updated-code-file-box-header">
                            <code>{file.path}</code>
                            <span className={`updated-code-file-tag updated-code-file-tag--${file.action}`}>
                              {file.action}
                            </span>
                          </div>
                          {file.diff && (
                            <pre className="updated-code-diff-pre">
                              <code>{renderDiffLines(file.diff)}</code>
                            </pre>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Full 5-File Source Inspector Drawer */}
                  {canInspectLive && isInspectorOpen && (
                    <div className="updated-code-full-inspector">
                      <h4>
                        Full Live Component Bundle (<code>src/components/{entry.slug}/</code>)
                      </h4>
                      <ComponentSourceInspector slug={entry.slug} />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* SECTION 2: ALL ACTIVE COMPONENT CODE BUNDLES */}
      <section className="docs-section" id="active-code-bundles">
        <div className="docs-section-heading">
          <h2>Browse Active Component Code Bundles (.tsx · .scss · .types.ts · .dart · .md)</h2>
          <p>
            Select any synced component below to inspect its complete 5-file source bundle in{' '}
            <code>src/components/</code>.
          </p>
        </div>

        <div className="updated-code-bundle-selector">
          {componentDocumentation.map((comp) => (
            <button
              key={comp.slug}
              type="button"
              className={`updated-code-bundle-pill${selectedLiveSlug === comp.slug ? ' updated-code-bundle-pill--active' : ''
                }`}
              onClick={() => setSelectedLiveSlug(comp.slug)}
            >
              <span>{comp.title}</span>
              <code>src/components/{comp.slug}/</code>
            </button>
          ))}
        </div>

        {selectedLiveSlug && (
          <div className="updated-code-active-inspector-card">
            <div className="updated-code-active-inspector-header">
              <div>
                <h3>
                  <code>src/components/{selectedLiveSlug}/</code>
                </h3>
                <p>
                  Mapped to portal page{' '}
                  <code>
                    src/app/pages/
                    {selectedLiveSlug
                      .split('-')
                      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
                      .join('')}
                    Page/
                  </code>
                </p>
              </div>
              <a href={`#${selectedLiveSlug}`} className="updated-code-link-btn">
                Open Live Interactive Preview →
              </a>
            </div>
            <ComponentSourceInspector slug={selectedLiveSlug} />
          </div>
        )}
      </section>
    </main>
  );
}

export default UpdatedCodePage;

