import { defineConfig, Plugin } from 'vite';
import { glob } from 'glob';
import path from 'path';

interface MultiPageOptions {
  renderTitle?: (templateName: string) => string;
}

function multiPagePlugin(options: MultiPageOptions = {}): Plugin {
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
        const pageName = dir === '.' ? 'index' : path.basename(dir);
        const pageTitle = renderTitle(pageName);
        const mainPath = path.join(dir, 'main.ts');
        
        const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${pageTitle}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/${mainPath}"></script>
  </body>
</html>`;

        htmlCache.set(id, html);
        return html;
      }
    },

    config: async () => {
      const entries = await glob('**/main.ts', {
        ignore: ['node_modules/**']
      });

      const input = {};
      entries.forEach(file => {
        const dir = path.dirname(file);
        // Use directory name as the HTML file name, but place all files in root
        const pageName = dir === '.' ? 'index' : path.basename(dir);
        // Set the output path to be in the root directory
        input[pageName] = path.resolve(pageName + '.html');
      });

      return {
        build: {
          rollupOptions: {
            input,
            output: {
              // Ensure all assets are in the root directory
              dir: 'dist',
              // Prevent creating subdirectories
              preserveModules: false
            }
          }
        }
      };
    }
  };
}

export default defineConfig({
  plugins: [
    multiPagePlugin({
      renderTitle: (templateName) => `${templateName.charAt(0).toUpperCase() + templateName.slice(1)} Page`
    })
  ]
});