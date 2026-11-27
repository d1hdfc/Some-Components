import { useState } from 'react';
import './InstallationAndTokenPage.scss';

const tokenModules = import.meta.glob<string>('../../../tokens/variables/*.scss', {
  eager: true,
  query: '?raw',
  import: 'default'
});

const tokenFilesList = Object.entries(tokenModules)
  .map(([filePath, content]) => {
    const fileName = filePath.split('/').pop() || filePath;
    return {
      fileName,
      relPath: `src/tokens/variables/${fileName}`,
      content,
      lines: content.split('\n').length
    };
  })
  .sort((a, b) => a.fileName.localeCompare(b.fileName));

export function InstallationAndTokenPage() {
  const [selectedTokenFile, setSelectedTokenFile] = useState<string>(
    tokenFilesList.find((t) => t.fileName === 'semantics.scss')?.fileName ??
      tokenFilesList[0]?.fileName ??
      'semantics.scss'
  );
  const [copyStatus, setCopyStatus] = useState('Copy');

  const activeToken =
    tokenFilesList.find((t) => t.fileName === selectedTokenFile) ?? tokenFilesList[0];

  const installCmd = `npm install @d1hdfc/Some-Components@main`;
  const usageSnippet = `import { Button } from '@d1hdfc/Some-Components';
import '@d1hdfc/Some-Components/style.css';

export function App() {
  return (
    <Button variant="primary" size="large" leftIcon rightIcon>
      Continue
    </Button>
  );
}`;

  const copyTokenContent = async () => {
    if (!activeToken) return;
    try {
      await navigator.clipboard.writeText(activeToken.content);
      setCopyStatus('Copied!');
      window.setTimeout(() => setCopyStatus('Copy'), 1800);
    } catch {
      setCopyStatus('Failed');
    }
  };

  return (
    <main className="docs-content installation-and-token-page" id="installation-and-token">
      <div className="docs-breadcrumbs">
        <a href="#dashboard">Dashboard</a>
        <span>/</span>
        <strong>Installation and Token</strong>
      </div>

      <header className="docs-heading">
        <div>
          <p className="docs-eyebrow">OVERVIEW &amp; SYNC · PACKAGE &amp; DESIGN TOKENS</p>
          <div className="docs-title-row">
            <h1>Installation and Token</h1>
            <span className="docs-status">
              <i /> 100% Token-Bound SCSS
            </span>
          </div>
          <p className="docs-intro">
            Install the shared <code>@d1hdfc/Some-Components</code> package and inspect the live
            Figma-synced design token variables in <code>src/tokens/variables/</code>. Every
            component stylesheet references semantic token variables rather than hardcoded pixels or
            hex values.
          </p>
        </div>
      </header>

      <section className="docs-section">
        <div className="docs-section-heading">
          <div>
            <h2>1. Package Installation &amp; Quick Start</h2>
            <p>
              Install the library and import the compiled token stylesheet once at your root entry
              point.
            </p>
          </div>
        </div>

        <div className="install-steps">
          <article className="example-card">
            <div className="example-card-heading" style={{ minHeight: 0 }}>
              <div>
                <h3>Install from GitHub Packages / npm</h3>
                <p>Run in your project root directory.</p>
              </div>
            </div>
            <div className="example-code">
              <pre>
                <code>{installCmd}</code>
              </pre>
            </div>
          </article>

          <article className="example-card">
            <div className="example-card-heading" style={{ minHeight: 0 }}>
              <div>
                <h3>Import Components &amp; Token Styles</h3>
                <p>All components automatically consume CSS custom properties from the token layer.</p>
              </div>
            </div>
            <div className="example-code">
              <pre>
                <code>{usageSnippet}</code>
              </pre>
            </div>
          </article>
        </div>
      </section>

      <section className="docs-section" id="tokens-inspector">
        <div className="docs-section-heading">
          <div>
            <h2>2. Live Design Token Variables (src/tokens/variables/)</h2>
            <p>
              Select any token collection file below to inspect the live SCSS maps and CSS custom
              properties synced with Figma Variables.
            </p>
          </div>
        </div>

        <div className="updated-code-bundle-selector">
          {tokenFilesList.map((tf) => (
            <button
              key={tf.fileName}
              type="button"
              className={`updated-code-bundle-pill${
                selectedTokenFile === tf.fileName ? ' updated-code-bundle-pill--active' : ''
              }`}
              onClick={() => setSelectedTokenFile(tf.fileName)}
            >
              <span>{tf.fileName}</span>
              <code>
                {tf.relPath} ({tf.lines} lines)
              </code>
            </button>
          ))}
        </div>

        {activeToken && (
          <div className="updated-code-active-inspector-card">
            <div className="updated-code-active-inspector-header">
              <div>
                <h3>
                  <code>{activeToken.relPath}</code>
                </h3>
                <p>Synced live with Figma Variable Collections via ws://localhost:3055</p>
              </div>
              <button
                type="button"
                className="updated-code-link-btn"
                onClick={copyTokenContent}
              >
                {copyStatus}
              </button>
            </div>
            <pre className="installation-token-code-pre">
              <code>{activeToken.content}</code>
            </pre>
          </div>
        )}
      </section>
    </main>
  );
}

export default InstallationAndTokenPage;

