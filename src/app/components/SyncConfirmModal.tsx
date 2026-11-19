import { useEffect, useState } from 'react';
import type { PendingSyncItem } from '../hooks/useSyncWebSocket';
import './RecentUpdatesBanner.scss';

interface SyncConfirmModalProps {
  open: boolean;
  direction: string;
  items: PendingSyncItem[];
  onConfirm: (confirmedSlugs: string[]) => void;
  onCancel: () => void;
}

export function SyncConfirmModal({
  open,
  direction,
  items,
  onConfirm,
  onCancel
}: SyncConfirmModalProps) {
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (open) {
      setSelectedSlugs(new Set(items.map((i) => i.slug)));
    }
  }, [open, items]);

  if (!open || items.length === 0) return null;

  const toggleSlug = (slug: string) => {
    setSelectedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const dirTitle =
    direction === 'code-to-figma'
      ? 'Confirm Code ➔ Figma Sync'
      : direction === 'figma-to-github'
        ? 'Confirm Figma ➔ GitHub Sync'
        : 'Confirm Figma ➔ Code Sync';

  return (
    <div className="portal-sync-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="portalSyncModalTitle">
      <div className="portal-sync-modal-card">
        <div className="portal-sync-modal-header">
          <div>
            <h3 id="portalSyncModalTitle">
              {dirTitle} ({items.length} pending change{items.length === 1 ? '' : 's'})
            </h3>
            <p>
              Review the detected changes below. Only selected items will be synced when you click{' '}
              <strong>Yes, Sync Now</strong>.
            </p>
          </div>
          <button type="button" className="portal-sync-modal-close" onClick={onCancel} aria-label="Close">
            ×
          </button>
        </div>

        <div className="portal-sync-modal-body">
          {items.map((item) => {
            const action = item.action.toLowerCase();
            const pillClass =
              action === 'add'
                ? 'sync-action-badge--added'
                : action === 'delete'
                  ? 'sync-action-badge--deleted'
                  : 'sync-action-badge--updated';
            const pillText = action === 'add' ? '+ ADD' : action === 'delete' ? '- DELETE' : '~ UPDATE';

            return (
              <label key={item.id || item.slug} className="portal-sync-diff-row">
                <input
                  type="checkbox"
                  checked={selectedSlugs.has(item.slug)}
                  onChange={() => toggleSlug(item.slug)}
                />
                <div className="portal-sync-diff-main">
                  <div className="portal-sync-diff-top">
                    <span className={`sync-action-badge ${pillClass}`}>{pillText}</span>
                    <strong>{item.title || item.componentName}</strong>
                    {item.pageName && <code className="portal-sync-page-tag">{item.pageName}</code>}
                  </div>
                  <p className="portal-sync-diff-summary">{item.summary}</p>
                  {Array.isArray(item.files) && item.files.length > 0 && (
                    <div className="portal-sync-diff-files">
                      {item.files.map((f) => (
                        <code key={f} className="portal-sync-file-pill">
                          {f}
                        </code>
                      ))}
                    </div>
                  )}
                </div>
              </label>
            );
          })}
        </div>

        <div className="portal-sync-modal-footer">
          <button type="button" className="portal-sync-btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="portal-sync-btn-yes"
            disabled={selectedSlugs.size === 0}
            onClick={() => onConfirm(Array.from(selectedSlugs))}
          >
            Yes, Sync Now ({selectedSlugs.size})
          </button>
        </div>
      </div>
    </div>
  );
}

