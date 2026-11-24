import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

function hdfcComponentAutoScaffolder() {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let isRunning = false;

  const runScaffold = () => {
    if (isRunning) return;
    isRunning = true;
    try {
      const codeGen = require('./scripts/code-generator.cjs');
      const pageGen = require('./scripts/app-page-generator.cjs');
      codeGen.generateForExistingComponents();
      pageGen.syncAppComponentPages();
    } catch {
      // Ignore transient file lock errors while user is renaming a folder
    } finally {
      setTimeout(() => {
        isRunning = false;
      }, 400);
    }
  };

  return {
    name: 'hdfc-component-auto-scaffolder',
    buildStart() {
      runScaffold();
    },
    configureServer(server: { watcher: { on: (event: string, cb: (filePath: string) => void) => void } }) {
      const componentsDir = path.resolve(process.cwd(), 'src', 'components');
      const schedule = (targetPath: string) => {
        if (!targetPath) return;
        const normalized = targetPath.replace(/\\/g, '/');
        if (!normalized.includes('/src/components/')) return;
        if (timer) clearTimeout(timer);
        timer = setTimeout(runScaffold, 350);
      };

      server.watcher.on('addDir', schedule);
      server.watcher.on('unlinkDir', schedule);
      server.watcher.on('add', schedule);
      server.watcher.on('unlink', schedule);

      // Periodic lightweight directory check for Windows Explorer copy/paste of folders
      const interval = setInterval(() => {
        if (!fs.existsSync(componentsDir)) return;
        try {
          const entries = fs.readdirSync(componentsDir, { withFileTypes: true });
          for (const entry of entries) {
            if (!entry.isDirectory() || entry.name === 'assets') continue;
            const kebab = entry.name
              .replace(/^[@_]+/, '')
              .replace(/^\d+[\.\s_-]+/, '')
              .replace(/([a-z\d])([A-Z])/g, '$1-$2')
              .replace(/[^a-zA-Z0-9]+/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-+|-+$/g, '')
              .toLowerCase();
            const compDir = path.join(componentsDir, entry.name);
            const hasTsx = fs.existsSync(path.join(compDir, `${kebab}.tsx`));
            const hasMd = fs.existsSync(path.join(compDir, `${kebab}.md`));
            if (entry.name !== kebab || !hasTsx || !hasMd) {
              runScaffold();
              break;
            }
          }
        } catch {
          // ignore
        }
      }, 1500);

      process.on('exit', () => clearInterval(interval));
    }
  };
}

export default defineConfig({
  plugins: [react(), hdfcComponentAutoScaffolder()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 2500
  },
  server: {
    port: 5173
  }
});
