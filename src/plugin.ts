import { Plugin } from 'vite';
import { glob } from 'glob';
import path from 'path';
import { MultiPageOptions } from './types';
import { formatPageName, generateHtml } from './utils';

export function multiPagePlugin(options: MultiPageOptions = {}): Plugin {
  const { renderTitle = (templateName) => templateName } = options;
  const htmlCache = new Map<string, string>();

  return {
    name: 'vite-plugin-multi-page',
    
    resolveId(id) {
      if (id.endsWith('.html')) {
        return id;
      }
    },

    async load(id) {
      if (id.endsWith('.html')) {
        const cached = htmlCache.get(id);
        if (cached) return cached;

        const dir = path.dirname(id);
        const pageName = formatPageName(dir);
        const pageTitle = renderTitle(pageName);
        const mainPath = path.join(dir, 'main.ts');
        
        const html = generateHtml(pageTitle, mainPath);
        htmlCache.set(id, html);
        return html;
      }
    },

    config: async () => {
      const entries = await glob('**/main.ts', {
        ignore: ['node_modules/**']
      });

      const input: Record<string, string> = {};
      entries.forEach(file => {
        const dir = path.dirname(file);
        const pageName = formatPageName(dir);
        input[pageName] = path.resolve(pageName + '.html');
      });

      return {
        build: {
          rollupOptions: {
            input,
            output: {
              dir: 'dist',
              preserveModules: false
            }
          }
        }
      };
    }
  };
}