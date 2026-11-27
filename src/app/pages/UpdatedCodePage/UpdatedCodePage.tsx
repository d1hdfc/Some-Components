import { useState } from 'react';
import type { SyncHistoryEntry, SyncStatus } from '../../hooks/useSyncWebSocket';
import { componentDocumentation } from '../ComponentPage/componentRegistry';
import { ComponentSourceInspector } from '../../components/MarkdownView';
import { RecentUpdatesBanner } from '../../components/RecentUpdatesBanner';
import './UpdatedCodePage.scss';

interface UpdatedCodePageProps {
  entries: SyncHistoryEntry[];
  syncStatus?: SyncStatus;
  onRequestPreSync?: (direction: 'figma-to-code' | 'code-to-figma' | 'figma-to-github') => void;
}

export function UpdatedCodePage({
  entries,
  onRequestPreSync
}: UpdatedCodePageProps) {
  const [selectedLiveSlug, setSelectedLiveSlug] = useState<string>(
    componentDocumentation[0]?.slug ?? 'button'
  );

  return (
    <main className="docs-content updated-code-page" id="updated-code">
      <div className="docs-breadcrumbs">
        <a href="#dashboard">Dashboard</a>
        <span>/</span>
        <strong>Updated Code &amp; Diffs</strong>
      </div>

      <header className="docs-heading" style={{ marginBottom: 24 }}>
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
                Scan Figma → Code Changes
              </button>
              <button
                type="button"
                className="updated-code-action-btn updated-code-action-btn--c2f"
                onClick={() => onRequestPreSync('code-to-figma')}
              >
                Scan Code → Figma Changes
              </button>
            </div>
          )}
        </div>
      </header>

      {/* SECTION 1: 5-Column "What Updated (Recent Sync Feed)" Table Card with Expandable File Diffs */}
      <RecentUpdatesBanner entries={entries} />

      {/* SECTION 2: ALL ACTIVE COMPONENT CODE BUNDLES (.tsx, .scss, .types.ts, .dart, .md) */}
      <section className="docs-section" id="active-code-bundles">
        <div className="docs-section-heading">
          <div>
            <h2>Browse Active Component Code Bundles (.tsx · .scss · .types.ts · .dart · .md)</h2>
            <p>
              Select any synced component below to inspect its complete 5-file source bundle in{' '}
              <code>src/components/</code>.
            </p>
          </div>
        </div>

        <div className="updated-code-bundle-selector">
          {componentDocumentation.map((comp) => (
            <button
              key={comp.slug}
              type="button"
              className={`updated-code-bundle-pill${
                selectedLiveSlug === comp.slug ? ' updated-code-bundle-pill--active' : ''
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
