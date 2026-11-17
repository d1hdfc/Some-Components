'use strict';

const fs = require('node:fs');
const path = require('node:path');

const getComponentsDir = () => path.join(process.cwd(), 'src', 'components');
const getIndexFile = () => path.join(getComponentsDir(), 'index.ts');
const getPagesDir = () => path.join(process.cwd(), 'src', 'app', 'pages');

function toPageName(slug) {
  const parts = String(slug || '')
    .replace(/^\d+[-_\s]+/, '')
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`);
  if (parts.length > 0 && /^\d/.test(parts[0])) {
    parts[0] = `Comp${parts[0]}`;
  }
  return parts.join('');
}

function writeFileIfChanged(filePath, content) {
  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, 'utf8');
    if (existing === content) return false;
  }
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

function cleanInvalidDigitPrefixedComponents() {
  const componentsDir = getComponentsDir();
  const indexFile = getIndexFile();
  if (!fs.existsSync(componentsDir)) return;

  for (const entry of fs.readdirSync(componentsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      if (entry.name !== 'index.ts' && entry.name !== 'library.scss') {
        fs.rmSync(path.join(componentsDir, entry.name), { force: true });
      }
      continue;
    }
    if (entry.name === 'assets') {
      fs.rmSync(path.join(componentsDir, entry.name), { recursive: true, force: true });
      continue;
    }
    if (/^\d+-/.test(entry.name)) {
      const stripped = entry.name.replace(/^\d+-/, '');
      if (fs.existsSync(path.join(componentsDir, stripped))) {
        fs.rmSync(path.join(componentsDir, entry.name), { recursive: true, force: true });
      }
    }
  }

  if (fs.existsSync(indexFile)) {
    const content = fs.readFileSync(indexFile, 'utf8');
    const cleanedLines = content.split('\n').filter((line) => {
      return !/export\s+(?:type\s+)?\{\s*\d/.test(line);
    });
    if (cleanedLines.length !== content.split('\n').length) {
      fs.writeFileSync(indexFile, cleanedLines.join('\n'), 'utf8');
    }
  }
}

function touchHmrEntryPoints() {
  const now = new Date();
  const pagesDir = getPagesDir();
  const registryPath = path.join(pagesDir, 'ComponentPage', 'componentRegistry.tsx');
  const mdRegistryPath = path.join(pagesDir, 'ComponentPage', 'componentMarkdown.ts');
  const appPath = path.join(process.cwd(), 'src', 'app', 'App.tsx');
  const mainScss = path.join(process.cwd(), 'src', 'app', 'main.scss');
  try { if (fs.existsSync(registryPath)) fs.utimesSync(registryPath, now, now); } catch {}
  try { if (fs.existsSync(mdRegistryPath)) fs.utimesSync(mdRegistryPath, now, now); } catch {}
  try { if (fs.existsSync(appPath)) fs.utimesSync(appPath, now, now); } catch {}
  try { if (fs.existsSync(mainScss)) fs.utimesSync(mainScss, now, now); } catch {}
}

function syncAppComponentPages() {
  const componentsDir = getComponentsDir();
  const pagesDir = getPagesDir();
  if (!fs.existsSync(componentsDir)) return;

  cleanInvalidDigitPrefixedComponents();

  try {
    require('./code-generator.cjs').sanitizeComponentIndex();
  } catch {}
  require('./docs-generator.cjs').ensureLocalDocsForAll();

  if (!fs.existsSync(pagesDir)) return;

  const buttonPageDir = path.join(pagesDir, 'ButtonPage');
  if (fs.existsSync(buttonPageDir)) {
    const tsBarrelPath = path.join(buttonPageDir, 'ButtonPage.ts');
    writeFileIfChanged(tsBarrelPath, `export { ButtonPage } from './ButtonPage.tsx';\n`);
  }

  // If ComponentPage exists (e.g. in full multi-page portal projects), generate pages for new components
  const hasGenericComponentPage = fs.existsSync(path.join(pagesDir, 'ComponentPage', 'ComponentPage.tsx'));
  const customSlugs = new Set(['button', 'text-area', 'text-field', 'header']);
  const validPageDirs = new Set([
    'ButtonPage',
    'TextAreaPage',
    'TextFieldPage',
    'HeaderPage',
    'SidebarPage',
    'FigmaComponentsPage',
    'ComponentPage'
  ]);
  const seenLowerPageDirs = new Set(Array.from(validPageDirs).map((d) => d.toLowerCase()));
  let pagesChanged = 0;

  if (hasGenericComponentPage) {
    const entries = fs.readdirSync(componentsDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory() || entry.name === 'assets' || customSlugs.has(entry.name)) continue;
      const componentDir = path.join(componentsDir, entry.name);
      const hasReactComponent = fs.readdirSync(componentDir)
        .some((file) => file.endsWith('.tsx') && !file.endsWith('.test.tsx'));
      if (!hasReactComponent) continue;

      let pageName = toPageName(entry.name);
      if (!pageName) continue;
      let fullPageName = `${pageName}Page`;
      if (seenLowerPageDirs.has(fullPageName.toLowerCase())) {
        pageName = `${pageName}Base`;
        fullPageName = `${pageName}Page`;
      }
      seenLowerPageDirs.add(fullPageName.toLowerCase());
      validPageDirs.add(fullPageName);
      const pageDir = path.join(pagesDir, fullPageName);
      const isNewPage = !fs.existsSync(pageDir);
      fs.mkdirSync(pageDir, { recursive: true });

      const tsxPath = path.join(pageDir, `${fullPageName}.tsx`);
      const tsPath = path.join(pageDir, `${fullPageName}.ts`);
      const scssPath = path.join(pageDir, `${fullPageName}.scss`);

      const c1 = writeFileIfChanged(
        tsxPath,
        `// Generated by scripts/app-page-generator.cjs.\nimport { componentDocumentation } from '../ComponentPage/componentRegistry';\nimport { ComponentPage } from '../ComponentPage/ComponentPage';\nimport './${fullPageName}.scss';\n\nexport const componentSlug = ${JSON.stringify(entry.name)};\n\nexport function ${fullPageName}() {\n  const component = componentDocumentation.find((entry) => entry.slug === componentSlug);\n  return component ? <ComponentPage component={component} /> : null;\n}\n\nexport default ${fullPageName};\n`
      );
      const c2 = writeFileIfChanged(
        tsPath,
        `// Generated by scripts/app-page-generator.cjs.\nexport { ${fullPageName}, default, componentSlug } from './${fullPageName}.tsx';\n`
      );
      const c3 = writeFileIfChanged(
        scssPath,
        `// Generated by scripts/app-page-generator.cjs.\n.docs-page-${entry.name} {\n  display: block;\n  color: var(--text-strong);\n  font-family: var(--font-family-inter);\n}\n`
      );
      if (isNewPage || c1 || c2 || c3) {
        pagesChanged++;
      }
    }
  }

  for (const entry of fs.readdirSync(pagesDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const keepDir = hasGenericComponentPage ? validPageDirs.has(entry.name) : entry.name === 'ButtonPage';
    if (!keepDir) {
      fs.rmSync(path.join(pagesDir, entry.name), { recursive: true, force: true });
      pagesChanged++;
      console.log(`[PageGenerator] DELETED: Removed page src/app/pages/${entry.name}`);
    }
  }

  if (pagesChanged > 0) {
    touchHmrEntryPoints();
  }
}

if (require.main === module) {
  syncAppComponentPages();
}

module.exports = { syncAppComponentPages, toPageName, touchHmrEntryPoints };
