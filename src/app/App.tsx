import { ButtonPage } from './pages/ButtonPage/ButtonPage';

const tocLinks: Array<{ href: string; label: string; nested?: boolean }> = [
  { href: '#component-docs', label: 'Documentation', nested: false },
  { href: '#md-figma-changelog-diff-status', label: 'Figma changelog', nested: true },
  { href: '#playground', label: 'Try it out' },
  { href: '#figma-matrix', label: 'Figma variant matrix' },
  { href: '#examples', label: 'Examples' },
  { href: '#variant-examples', label: 'Variants', nested: true },
  { href: '#size-examples', label: 'Sizes', nested: true },
  { href: '#icon-examples', label: 'Icons', nested: true },
  { href: '#state-examples', label: 'States', nested: true },
  { href: '#installation', label: 'Installation' },
  { href: '#guidelines', label: 'Usage guidelines' },
  { href: '#api', label: 'API reference' },
];

export default function App() {
  return (
    <div className="docs-shell">
      <div className="docs-layout" id="top">
        <ButtonPage />

        <aside className="docs-toc" aria-label="On this page">
          <h2>On this page</h2>
          <nav>
            {tocLinks.map(({ href, label, nested }) => (
              <a
                key={href}
                href={href}
                className={nested ? 'docs-toc-nested' : ''}
              >
                {label}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  );
}
