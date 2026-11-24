import { componentDocumentation } from '../pages/ComponentPage/componentRegistry';
import type { SyncHistoryEntry, SyncStatus } from '../hooks/useSyncWebSocket';
import './ProjectOverviewDashboard.scss';

interface ProjectOverviewDashboardProps {
  syncStatus: SyncStatus;
  historyEntries: SyncHistoryEntry[];
  onRequestPreSync?: (direction: 'figma-to-code' | 'code-to-figma' | 'figma-to-github') => void;
}

export function ProjectOverviewDashboard({
  syncStatus,
  historyEntries,
  onRequestPreSync
}: ProjectOverviewDashboardProps) {
  const totalComponents = componentDocumentation.length;
  const totalPages = totalComponents + 2;
  const isOnline = syncStatus === 'connected';

  return (
    <section className="exec-dashboard" aria-label="Design System Project Overview">
      <div className="exec-dashboard-top">
        <div className="exec-dashboard-intro">
          <div className="exec-dashboard-badges">
            <span className="exec-pill exec-pill--brand">HDFC Design System Portal</span>
            <span className={`exec-pill ${isOnline ? 'exec-pill--online' : 'exec-pill--offline'}`}>
              <span className="exec-pill-dot" />
              {isOnline ? 'Bridge Active · ws://localhost:3055' : 'Bridge Offline · ws://localhost:3055'}
            </span>
          </div>
          <h2 className="exec-dashboard-title">
            Bi-Directional Figma ↔ Code Design System &amp; Multi-Platform Component Hub
          </h2>
          <p className="exec-dashboard-desc">
            A real-time, confirmation-gated design system pipeline connecting Figma component libraries
            directly to production React (<code>.tsx</code>, <code>.types.ts</code>), semantic token
            stylesheets (<code>.scss</code>), Flutter widgets (<code>.dart</code>), and live markdown
            specifications (<code>.md</code>).
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
            <a href="#updated-code" className="exec-sync-btn exec-sync-btn--diff">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span>Updated Code &amp; Diffs</span>
            </a>
          </div>
        )}
      </div>

      {/* 4-Column KPI Grid with Top Accent Borders */}
      <div className="exec-metrics-grid">
        <div className="exec-metric-card exec-metric-card--indigo">
          <div className="exec-metric-icon exec-metric-icon--indigo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </div>
          <div className="exec-metric-body">
            <span className="exec-metric-label">Component Bundles</span>
            <strong className="exec-metric-value">{totalComponents}</strong>
            <small className="exec-metric-sub">5-file bundle (.tsx, .types.ts, .scss, .dart, .md)</small>
          </div>
        </div>

        <div className="exec-metric-card exec-metric-card--violet">
          <div className="exec-metric-icon exec-metric-icon--violet">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <div className="exec-metric-body">
            <span className="exec-metric-label">Generated Pages</span>
            <strong className="exec-metric-value">{totalPages}</strong>
            <small className="exec-metric-sub">Mapped to src/app/pages/&lt;Name&gt;Page/</small>
          </div>
        </div>

        <div className="exec-metric-card exec-metric-card--emerald">
          <div className="exec-metric-icon exec-metric-icon--emerald">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div className="exec-metric-body">
            <span className="exec-metric-label">Token Architecture</span>
            <strong className="exec-metric-value">100% Semantic</strong>
            <small className="exec-metric-sub">Bound to src/tokens/variables/ tokens</small>
          </div>
        </div>

        <div className="exec-metric-card exec-metric-card--amber">
          <div className="exec-metric-icon exec-metric-icon--amber">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div className="exec-metric-body">
            <span className="exec-metric-label">Recent Updates</span>
            <strong className="exec-metric-value">{historyEntries.length}</strong>
            <small className="exec-metric-sub">Confirmation-gated (&ldquo;Allow&rdquo;) diffs</small>
          </div>
        </div>
      </div>

      {/* 3-Step Workflow Cards with Generous 20px Padding & Numbered Tinted Badges */}
      <div className="exec-pillars-grid">
        <div className="exec-pillar">
          <div className="exec-pillar-header">
            <span className="exec-pillar-num exec-pillar-num--indigo">01</span>
            <span className="exec-pillar-icon exec-pillar-icon--indigo">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <line x1="9" y1="14" x2="15" y2="14" />
              </svg>
            </span>
            <strong>Auto Folder → Page Scaffolding</strong>
          </div>
          <p className="exec-pillar-text">
            Adding any component folder inside <code>src/components/&lt;name&gt;/</code> automatically
            scaffolds its 5-file bundle, creates <code>&lt;Name&gt;Page</code>, and registers its route
            live in the sidebar.
          </p>
        </div>

        <div className="exec-pillar">
          <div className="exec-pillar-header">
            <span className="exec-pillar-num exec-pillar-num--blue">02</span>
            <span className="exec-pillar-icon exec-pillar-icon--blue">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </span>
            <strong>Pre-Sync Diff + &ldquo;Allow&rdquo; Gate</strong>
          </div>
          <p className="exec-pillar-text">
            Both <code>Figma → Code</code> and <code>Code → Figma</code> scan additions, edits, and
            deletions first—opening a confirmation modal that waits for explicit <strong>Allow</strong>{' '}
            approval.
          </p>
        </div>

        <div className="exec-pillar">
          <div className="exec-pillar-header">
            <span className="exec-pillar-num exec-pillar-num--emerald">03</span>
            <span className="exec-pillar-icon exec-pillar-icon--emerald">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </span>
            <strong>Targeted Single-Component Sync</strong>
          </div>
          <p className="exec-pillar-text">
            Granular SHA-1 &amp; AST property diffing updates only the modified component and its bound
            tokens in <code>src/tokens/variables/</code> without touching unchanged components.
          </p>
        </div>
      </div>
    </section>
  );
}
