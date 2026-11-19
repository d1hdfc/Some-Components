import type { SyncHistoryEntry } from '../hooks/useSyncWebSocket';
import './RecentUpdatesBanner.scss';

interface RecentUpdatesBannerProps {
  entries: SyncHistoryEntry[];
  activeSlug?: string;
}

function formatRelativeTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return iso;
  }
}

export function RecentUpdatesBanner({ entries, activeSlug }: RecentUpdatesBannerProps) {
  if (!Array.isArray(entries) || entries.length === 0) return null;

  // Prioritize updates for activeSlug plus the top recent updates across the system
  const topEntries = entries.slice(0, 4);

  return (
    <section className="recent-updates-banner" aria-label="Recent Figma and Code Sync Updates">
      <div className="recent-updates-banner-header">
        <div className="recent-updates-banner-title">
          <span className="recent-updates-pulse" aria-hidden="true" />
          <strong>Latest Sync &amp; Code Updates</strong>
          <span className="recent-updates-count-pill">{entries.length} logged</span>
        </div>
        <a href="#updated-code" className="recent-updates-view-all-link">
          View Updated Code &amp; Diffs →
        </a>
      </div>

      <div className="recent-updates-list">
        {topEntries.map((item) => {
          const act = (item.action || 'updated').toLowerCase();
          const badgeClass = act.startsWith('add')
            ? 'sync-action-badge--added'
            : act.startsWith('del')
              ? 'sync-action-badge--deleted'
              : 'sync-action-badge--updated';
          const badgeLabel = act.startsWith('add')
            ? 'ADDED'
            : act.startsWith('del')
              ? 'DELETED'
              : 'UPDATED';
          const dirLabel =
            item.direction === 'code-to-figma'
              ? 'Code ➔ Figma'
              : item.direction === 'figma-to-github'
                ? 'Figma ➔ GitHub'
                : 'Figma ➔ Code';
          const isCurrent = activeSlug && item.slug === activeSlug;

          return (
            <div
              key={item.id}
              className={`recent-update-row${isCurrent ? ' recent-update-row--highlight' : ''}`}
            >
              <div className="recent-update-row-left">
                <span className={`sync-action-badge ${badgeClass}`}>{badgeLabel}</span>
                <span className="recent-update-dir">{dirLabel}</span>
                <strong className="recent-update-comp">{item.componentName || item.slug}</strong>
                <span className="recent-update-summary">{item.summary}</span>
              </div>
              <div className="recent-update-row-right">
                <time className="recent-update-time">{formatRelativeTime(item.timestamp)}</time>
                <a href={`#updated-code`} className="recent-update-inspect-btn">
                  Inspect Code
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

