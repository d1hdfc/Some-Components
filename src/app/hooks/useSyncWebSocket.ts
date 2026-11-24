import { useCallback, useEffect, useRef, useState } from 'react';
import initialSyncHistory from '../../figma/syncHistory.json';

export type PendingSyncItem = {
  id: string;
  slug: string;
  componentName: string;
  pageName?: string;
  nodeId?: string | null;
  figmaPageName?: string | null;
  action: 'add' | 'update' | 'delete';
  direction: 'figma-to-code' | 'code-to-figma' | 'figma-to-github';
  title: string;
  summary: string;
  details?: string[];
  files?: string[];
};

export type SyncUpdateSummaryItem = {
  slug: string;
  componentName: string;
  pageName?: string;
  action: 'added' | 'updated' | 'deleted' | string;
  direction: 'figma-to-code' | 'code-to-figma' | 'figma-to-github' | string;
  summary: string;
  timestamp: string;
};

export type SyncFileDiff = {
  path: string;
  ext: string;
  action: 'added' | 'updated' | 'deleted' | string;
  diff: string;
};

export type SyncHistoryEntry = {
  id: string;
  timestamp: string;
  direction: string;
  action: 'added' | 'updated' | 'deleted' | string;
  slug: string;
  componentName: string;
  pageName?: string;
  summary: string;
  details?: string[];
  files?: SyncFileDiff[];
};

export type SyncEvent = {
  event: string;
  direction?: string;
  pendingChanges?: PendingSyncItem[];
  updatesList?: SyncUpdateSummaryItem[];
  historyEntries?: SyncHistoryEntry[];
  result?: {
    createdCount: number;
    updatedCount: number;
    deletedCount: number;
    tokensUpdated?: number;
    updatesList?: SyncUpdateSummaryItem[];
    historyEntries?: SyncHistoryEntry[];
  };
  git?: {
    success?: boolean;
    pushed?: boolean;
    branch?: string;
    repoUrl?: string;
    message?: string;
    error?: string;
  };
  repoName?: string;
  componentName?: string;
  folder?: string;
  summary?: string;
  error?: string;
};

export type SyncStatus = 'connecting' | 'connected' | 'disconnected';

export function useSyncWebSocket(url = 'ws://localhost:3055') {
  const [status, setStatus] = useState<SyncStatus>('connecting');
  const [lastEvent, setLastEvent] = useState<SyncEvent | null>(null);
  const [historyEntries, setHistoryEntries] = useState<SyncHistoryEntry[]>(
    () => ((initialSyncHistory as { entries?: SyncHistoryEntry[] }).entries ?? [])
  );
  const [pendingModalState, setPendingModalState] = useState<{
    open: boolean;
    scanning: boolean;
    direction: string;
    items: PendingSyncItem[];
  }>({ open: false, scanning: false, direction: 'figma-to-code', items: [] });

  const wsRef = useRef<WebSocket | null>(null);
  const portalRequestedPreSyncRef = useRef(false);

  const fetchLatestHistory = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3055/api/sync/history');
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.entries)) {
        setHistoryEntries(data.entries);
      }
    } catch {
      // Fallback to bundled syncHistory.json when server is offline
    }
  }, []);

  useEffect(() => {
    fetchLatestHistory();
  }, [fetchLatestHistory]);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout>;
    let alive = true;

    function connect() {
      if (!alive) return;
      try {
        ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => {
          setStatus('connected');
          ws?.send(JSON.stringify({ type: 'join', channel: 'figma-sync' }));
          fetchLatestHistory();
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'broadcast' && data.message) {
              const msg = data.message as SyncEvent;
              setLastEvent(msg);

              if (msg.event === 'PRE_SYNC_DIFF_RESULT' && portalRequestedPreSyncRef.current) {
                portalRequestedPreSyncRef.current = false;
                const items = Array.isArray(msg.pendingChanges) ? msg.pendingChanges : [];
                setPendingModalState({
                  open: true,
                  scanning: false,
                  direction: msg.direction || 'code-to-figma',
                  items
                });
              }

              const incomingHistory = msg.historyEntries || msg.result?.historyEntries;
              if (Array.isArray(incomingHistory) && incomingHistory.length > 0) {
                setHistoryEntries((prev) => {
                  const existingIds = new Set(prev.map((e) => e.id));
                  const fresh = incomingHistory.filter((e) => !existingIds.has(e.id));
                  return [...fresh, ...prev].slice(0, 40);
                });
              } else if (
                msg.event === 'FIGMA_TO_CODE_COMPLETE' ||
                msg.event === 'FIGMA_TO_GITHUB_COMPLETE' ||
                msg.event === 'CODE_TO_FIGMA_COMPLETE'
              ) {
                fetchLatestHistory();
              }
            }
          } catch {
            /* ignore */
          }
        };

        ws.onclose = () => {
          setStatus('disconnected');
          if (alive) reconnectTimer = setTimeout(connect, 5000);
        };

        ws.onerror = () => {
          setStatus('disconnected');
        };
      } catch {
        setStatus('disconnected');
        if (alive) reconnectTimer = setTimeout(connect, 5000);
      }
    }

    connect();

    return () => {
      alive = false;
      clearTimeout(reconnectTimer);
      ws?.close();
    };
  }, [url, fetchLatestHistory]);

  const requestPreSyncFromPortal = useCallback(
    async (direction: 'figma-to-code' | 'code-to-figma' | 'figma-to-github') => {
      // Open modal immediately in scanning state so user gets instant visual feedback
      setPendingModalState({
        open: true,
        scanning: true,
        direction,
        items: []
      });

      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        portalRequestedPreSyncRef.current = true;
        wsRef.current.send(
          JSON.stringify({
            type: 'message',
            channel: 'figma-sync',
            message: {
              event: 'PORTAL_REQUEST_PRE_SYNC',
              direction
            }
          })
        );
      }

      // Also call HTTP fallback endpoint so the modal resolves even if WebSocket or plugin takes > 1s
      try {
        const res = await fetch('http://localhost:3055/api/sync/pre-check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ direction })
        });
        if (res.ok) {
          const data = await res.json();
          setPendingModalState((prev) => {
            if (!prev.open) return prev;
            return {
              open: true,
              scanning: false,
              direction: data.direction || direction,
              items: Array.isArray(data.pendingChanges) ? data.pendingChanges : prev.items
            };
          });
          return;
        }
      } catch {
        // Ignore HTTP error if WS handles it
      }

      setTimeout(() => {
        setPendingModalState((prev) => (prev.scanning ? { ...prev, scanning: false } : prev));
      }, 1500);
    },
    []
  );

  const confirmSyncFromPortal = useCallback(
    async (confirmedSlugs: string[]) => {
      const { direction, items } = pendingModalState;
      setPendingModalState((prev) => ({ ...prev, open: false, scanning: false }));

      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: 'message',
            channel: 'figma-sync',
            message: {
              event: 'CONFIRM_SYNC_EXECUTION',
              direction,
              pushToGithub: direction === 'figma-to-github',
              confirmedSlugs,
              pendingChanges: items
            }
          })
        );
        return;
      }

      try {
        await fetch('http://localhost:3055/api/sync/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            direction,
            confirmedSlugs,
            pendingChanges: items
          })
        });
        fetchLatestHistory();
      } catch {
        // ignore
      }
    },
    [pendingModalState, fetchLatestHistory]
  );

  const cancelSyncFromPortal = useCallback(() => {
    portalRequestedPreSyncRef.current = false;
    setPendingModalState((prev) => ({ ...prev, open: false, scanning: false }));
  }, []);

  return {
    status,
    lastEvent,
    historyEntries,
    pendingModalState,
    requestPreSyncFromPortal,
    confirmSyncFromPortal,
    cancelSyncFromPortal
  };
}
