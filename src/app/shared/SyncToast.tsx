import { useEffect, useState } from 'react';
import type { SyncEvent } from '../hooks/useSyncWebSocket';

interface SyncToastProps {
  event: SyncEvent | null;
}

export function SyncToast({ event }: SyncToastProps) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'warning' | 'error'>('success');

  useEffect(() => {
    if (!event) return;

    const firstSummary =
      event.updatesList?.[0]?.summary ||
      event.result?.updatesList?.[0]?.summary ||
      event.summary;

    if (event.event === 'FIGMA_TO_GITHUB_COMPLETE') {
      const { createdCount = 0, updatedCount = 0, deletedCount = 0 } = event.result ?? {};
      const repo = event.repoName || 'GitHub';
      setMessage(
        firstSummary
          ? `🚀 Pushed to ${repo}: ${firstSummary}`
          : `🚀 Pushed to ${repo}: +${createdCount} added, ~${updatedCount} updated, -${deletedCount} deleted`
      );
      setType('success');
    } else if (event.event === 'FIGMA_TO_CODE_COMPLETE') {
      const { createdCount = 0, updatedCount = 0, deletedCount = 0 } = event.result ?? {};
      setMessage(
        firstSummary
          ? `✅ Figma ➔ Code: ${firstSummary}`
          : `✅ Figma sync: +${createdCount} added, ~${updatedCount} updated, -${deletedCount} deleted`
      );
      setType('success');
    } else if (event.event === 'CODE_TO_FIGMA_COMPLETE') {
      const { createdCount = 0, updatedCount = 0, deletedCount = 0 } = event.result ?? {};
      setMessage(
        firstSummary
          ? `✅ Code ➔ Figma: ${firstSummary}`
          : `✅ Code ➔ Figma: +${createdCount} created, ~${updatedCount} updated, -${deletedCount} deleted`
      );
      setType('success');
    } else if (event.event === 'FIGMA_TO_CODE_ERROR' || event.event === 'FIGMA_TO_GITHUB_ERROR') {
      setMessage(`❌ Sync error: ${event.error}`);
      setType('error');
    } else if (event.event === 'CODE_TO_FIGMA_DELETE' || event.event === 'CODE_COMPONENT_DELETED') {
      setMessage(
        event.summary || `🗑️ "${event.componentName || event.folder}" removed from Figma`
      );
      setType('warning');
    } else {
      return;
    }

    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 5500);
    return () => clearTimeout(timer);
  }, [event]);

  if (!visible) return null;

  return (
    <div className={`sync-toast sync-toast--${type}`} role="status" aria-live="polite">
      <span>{message}</span>
      <button type="button" onClick={() => setVisible(false)} aria-label="Dismiss">×</button>
    </div>
  );
}

