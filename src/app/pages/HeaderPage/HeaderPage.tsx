import { useEffect, useState } from 'react';
import './HeaderPage.scss';

interface HeaderPageProps {
  syncStatus: 'connecting' | 'connected' | 'disconnected';
  currentPage: string;
  onNav: (page: string) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onRequestPreSync?: (direction: 'figma-to-code' | 'code-to-figma' | 'figma-to-github') => void;
}

export function HeaderPage({
  syncStatus,
  currentPage,
  onNav,
  theme = 'light',
  onToggleTheme,
  onRequestPreSync
}: HeaderPageProps) {
  const [browserOnline, setBrowserOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setBrowserOnline(true);
    const handleOffline = () => setBrowserOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const isLive = browserOnline && syncStatus === 'connected';
  const isConnecting = browserOnline && syncStatus === 'connecting';

  const syncLabel = isLive
    ? 'Sync Online'
    : isConnecting
      ? 'Connecting…'
      : 'Sync Offline';

  const syncClass = isLive
    ? 'docs-sync-badge--live'
    : isConnecting
      ? 'docs-sync-badge--connecting'
      : 'docs-sync-badge--offline';

  return (
    <header className="docs-topbar">
      <a
        className="docs-brand"
        href="#button"
        aria-label="HDFC design system home"
        onClick={() => onNav('button')}
      >
        <span className="docs-brand-mark">H</span>
        <span className="docs-brand-text">
          HDFC <strong>Some Components</strong>
        </span>
        <span className="docs-version-badge">v0.1.0 · Enterprise Portal</span>
      </a>

      <nav className="docs-topbar-nav" aria-label="Main navigation">
        <a
          href="#button"
          className={
            currentPage !== 'installation' && currentPage !== 'updated-code'
              ? 'docs-topbar-nav-active'
              : ''
          }
          onClick={() => onNav('button')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
          <span>Components</span>
        </a>
        <a
          href="#updated-code"
          className={currentPage === 'updated-code' ? 'docs-topbar-nav-active' : ''}
          onClick={() => onNav('updated-code')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>Updated Code</span>
        </a>
        <a
          href="https://www.figma.com/design/NhsXzdYzA1O9TPQlRL3wC4/Some-Components?node-id=2617-4609"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          <span>Figma File</span>
        </a>
        <a
          href="https://github.com/d1hdfc/Some-Components"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
          <span>GitHub</span>
        </a>
      </nav>

      <div className="docs-topbar-actions">
        {onRequestPreSync && (
          <div className="docs-topbar-sync-triggers">
            <button
              type="button"
              className="docs-topbar-sync-btn"
              onClick={() => onRequestPreSync('figma-to-code')}
              title="Scan Figma changes & confirm with Allow"
            >
              Figma ➔ Code
            </button>
            <button
              type="button"
              className="docs-topbar-sync-btn docs-topbar-sync-btn--primary"
              onClick={() => onRequestPreSync('code-to-figma')}
              title="Scan Code changes & confirm with Allow"
            >
              Code ➔ Figma
            </button>
          </div>
        )}

        <div
          className={`docs-sync-badge ${syncClass}`}
          title={`Figma On-Demand Sync WebSocket (ws://localhost:3055) — ${syncLabel}`}
          role="status"
          aria-live="polite"
        >
          <span className="docs-sync-dot" aria-hidden="true" />
          <span className="docs-sync-status-text">{syncLabel}</span>
          <code className="docs-sync-endpoint">ws://localhost:3055</code>
        </div>

        {onToggleTheme && (
          <button
            type="button"
            className="docs-theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                <span>Light</span>
              </>
            ) : (
              <>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <span>Dark</span>
              </>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
