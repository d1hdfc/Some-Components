import type { ComponentType, ReactNode } from 'react';
import catalogSource from '../../figma/components.json';

type PreviewComponent = ComponentType<Record<string, unknown>>;

export type ComponentDocumentation = {
  component: PreviewComponent;
  figmaUrl?: string;
  name: string;
  previewChildren?: ReactNode;
  previewProps: Record<string, unknown>;
  routeSlug: string;
  slug: string;
  title: string;
};

type PreviewExample = {
  children?: ReactNode;
  props?: Record<string, unknown>;
};

const previewExamples: Record<string, PreviewExample> = {
  button: { children: 'Button', props: { size: 'medium', variant: 'primary' } },
  'final-input-area-component': { children: 'Input Area', props: { size: 'medium', variant: 'primary' } },
  'input-area': { children: 'Input Area', props: { size: 'medium', variant: 'primary' } },
  'text-area': { props: { label: 'Message', placeholder: 'Write a message' } },
  'text-field': { props: { label: 'Full name', placeholder: 'Enter your name' } }
};

const componentModules = import.meta.glob<Record<string, unknown>>(
  '../../components/*/*.tsx',
  { eager: true }
);

function resolveComponentExport(mod: Record<string, unknown> | undefined): PreviewComponent | null {
  if (!mod || typeof mod !== 'object') return null;
  if (typeof mod.default === 'function') return mod.default as PreviewComponent;
  for (const val of Object.values(mod)) {
    if (typeof val === 'function') return val as PreviewComponent;
  }
  return null;
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function getFigmaUrl(slug: string): string | undefined {
  const fileKey = (catalogSource as { fileKey?: string }).fileKey || 'NhsXzdYzA1O9TPQlRL3wC4';
  const list = (catalogSource as { components?: Array<{ name: string; pageName: string; nodeId: string }> }).components || [];
  const found = list.find(
    (entry) => normalize(entry.name) === normalize(slug) || normalize(entry.pageName) === normalize(slug)
  );
  if (found?.nodeId) {
    return `https://www.figma.com/design/${fileKey}/Some-Components?node-id=${encodeURIComponent(found.nodeId.replace(':', '-'))}`;
  }
  return `https://www.figma.com/design/${fileKey}/Some-Components`;
}

function getTitle(slug: string): string {
  return slug
    .split('-')
    .map((part) => {
      if (part.toLowerCase() === 'mpin') return 'MPin';
      return `${part.charAt(0).toUpperCase()}${part.slice(1)}`;
    })
    .join(' ');
}

export const componentDocumentation: ComponentDocumentation[] = Object.entries(componentModules)
  .flatMap(([modulePath, mod]) => {
    const match = modulePath.match(/\/components\/([^/]+)\/([^/]+)\.tsx$/);
    if (!match || match[1] === 'assets') return [];
    const component = resolveComponentExport(mod);
    if (!component) return [];

    const [, slug, filename] = match;
    const example = previewExamples[slug] ?? { children: getTitle(slug), props: { size: 'medium', variant: 'primary' } };
    const pascalSlug = slug.split('-').map((p) => `${p.charAt(0).toUpperCase()}${p.slice(1)}`).join('');
    const compName = (component as { name?: string }).name || (/^[A-Z]/.test(filename) ? filename : pascalSlug);

    return [{
      component,
      figmaUrl: getFigmaUrl(slug),
      name: compName,
      previewChildren: example.children,
      previewProps: example.props ?? {},
      routeSlug: slug,
      slug,
      title: getTitle(slug)
    }];
  })
  .sort((left, right) => left.title.localeCompare(right.title));

