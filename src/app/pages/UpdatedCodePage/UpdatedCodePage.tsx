import { useState } from 'react';
import type { SyncHistoryEntry, SyncStatus } from '../../hooks/useSyncWebSocket';
import { componentDocumentation } from '../ComponentPage/componentRegistry';
import { ComponentSourceInspector } from '../../components/MarkdownView';
import { ProjectOverviewDashboard } from '../../components/ProjectOverviewDashboard';
import { RecentUpdatesBanner } from '../../components/RecentUpdatesBanner';
import './UpdatedCodePage.scss';

interface UpdatedCodePageProps {
  entries: SyncHistoryEntry[];
  syncStatus?: SyncStatus;
  onRequestPreSync?: (direction: 'figma-to-code' | 'code-to-figma' | 'figma-to-github') => void;
}

export function UpdatedCodePage({
  entries,
  syncStatus = 'connected',
  onRequestPreSync
}: UpdatedCodePageProps) {
  const [selectedLiveSlug, setSelectedLiveSlug] = useState<string>(
    componentDocumentation[0]?.slug ?? 'button'
  );

  return (
    <main className="docs-content updated-code-page" id="updated-code">
      <ProjectOverviewDashboard
        syncStatus={syncStatus}
        historyEntries={entries}
        onRequestPreSync={onRequestPreSync}
      />

      {/* Exact 5-Column "What Updated (Recent Sync Feed)" Table Card */}
      <RecentUpdatesBanner entries={entries} />

      {/* SECTION 2: ALL ACTIVE COMPONENT CODE BUNDLES */}
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
