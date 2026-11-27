import { useEffect, useState } from 'react';
import type { PendingSyncItem } from '../hooks/useSyncWebSocket';

interface SyncConfirmModalProps {
  open: boolean;
  direction: string;
  items: PendingSyncItem[];
  scanning?: boolean;
  onConfirm: (confirmedSlugs: string[]) => void;
  onCancel: () => void;
}

export function SyncConfirmModal({
  open,
  direction,
  items,
  scanning = false,
  onConfirm,
  onCancel
}: SyncConfirmModalProps) {
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (open) {
      setSelectedSlugs(new Set(items.map((i) => i.slug)));
    }
  }, [open, items]);

  if (!open) return null;

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
      ? 'Code ➔ Figma Sync Confirmation'
      : direction === 'figma-to-github'
        ? 'Figma ➔ GitHub Sync Confirmation'
        : 'Figma ➔ Code Sync Confirmation';

  const dirBadge =
    direction === 'code-to-figma'
      ? 'Code ➔ FIGMA CANVAS'
      : direction === 'figma-to-github'
        ? 'FIGMA ➔ CODE & GITHUB'
        : 'FIGMA CANVAS ➔ Code';

  return (
    <div
      className="portal-sync-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="portalSyncModalTitle"
    >
      <div className="portal-sync-modal-card">
        <div className="portal-sync-modal-header">
          <div>
            <span className="portal-sync-dir-eyebrow">{dirBadge}</span>
            <h3 id="portalSyncModalTitle">
              {scanning
                ? 'Scanning Changes...'
                : `${dirTitle} (${items.length} change${items.length === 1 ? '' : 's'} detected)`}
            </h3>
            <p>
              {scanning
                ? 'Comparing local src/components/, src/tokens/variables/, and Figma canvas state...'
                : items.length > 0
                  ? 'Review the detected changes below. Changes will only be applied after you click Allow.'
                  : 'All components, pages, and token variables are currently in sync.'}
            </p>
          </div>
          <button
            type="button"
            className="portal-sync-modal-close"
            onClick={onCancel}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="portal-sync-modal-body">
          {scanning ? (
            <div className="portal-sync-empty-state">
              Scanning component bundles, pages, and design tokens...
            </div>
          ) : items.length === 0 ? (
            <div className="portal-sync-empty-state">
              <strong>✓ Everything is in sync</strong>
              <p>
                No pending additions, edits, or deletions were detected between{' '}
                <code>src/components/</code> and the Figma canvas.
              </p>
            </div>
          ) : (
            items.map((item) => {
              const action = item.action.toLowerCase();
              const pillClass =
                action === 'add'
                  ? 'sync-action-badge--added'
                  : action === 'delete'
                    ? 'sync-action-badge--deleted'
                    : 'sync-action-badge--updated';
              const pillText =
                action === 'add' ? '+ ADD' : action === 'delete' ? '- DELETE' : '~ EDIT';

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
                      {item.pageName && (
                        <code className="portal-sync-page-tag">{item.pageName}</code>
                      )}
                    </div>
                    <p className="portal-sync-diff-summary">{item.summary}</p>
                    {Array.isArray(item.details) && item.details.length > 0 && (
                      <ul className="portal-sync-diff-details">
                        {item.details.slice(0, 4).map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                      </ul>
                    )}
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
            })
          )}
        </div>

        <div className="portal-sync-modal-footer">
          <button type="button" className="portal-sync-btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          {items.length > 0 && (
            <button
              type="button"
              className="portal-sync-btn-yes"
              disabled={scanning || selectedSlugs.size === 0}
              onClick={() => onConfirm(Array.from(selectedSlugs))}
            >
              ✓ Allow ({selectedSlugs.size})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

