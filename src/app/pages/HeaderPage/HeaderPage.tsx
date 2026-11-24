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
      {/* Left: Brand Identity + Version Pill + External Icon Links */}
      <div className="docs-topbar-left">
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
        </a>

        <span className="docs-version-badge">v0.1.0</span>

        <div className="docs-topbar-divider" aria-hidden="true" />

        <div className="docs-topbar-ext-links" aria-label="External resources">
          <a
            href="https://www.figma.com/design/NhsXzdYzA1O9TPQlRL3wC4/Some-Components?node-id=2617-4609"
            target="_blank"
            rel="noopener noreferrer"
            className="docs-ext-icon-link"
            title="Open Figma Design File"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
              <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
              <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
              <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
              <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
            </svg>
            <span>Figma</span>
            <svg className="docs-ext-arrow" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>

          <a
            href="https://github.com/d1hdfc/Some-Components"
            target="_blank"
            rel="noopener noreferrer"
            className="docs-ext-icon-link"
            title="Open GitHub Repository"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            <span>GitHub</span>
            <svg className="docs-ext-arrow" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </div>

      {/* Right: Live Bridge Status Pill, Sync Action Buttons, Dark/Light Theme Toggle */}
      <div className="docs-topbar-actions">
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

        {onRequestPreSync && (
          <div className="docs-topbar-sync-triggers">
            <button
              type="button"
              className="docs-topbar-sync-btn"
              onClick={() => onRequestPreSync('figma-to-code')}
              title="Scan Figma changes & confirm with Allow"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Figma → Code</span>
            </button>
            <button
              type="button"
              className="docs-topbar-sync-btn docs-topbar-sync-btn--primary"
              onClick={() => onRequestPreSync('code-to-figma')}
              title="Scan Code changes & confirm with Allow"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span>Code → Figma</span>
            </button>
          </div>
        )}

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
