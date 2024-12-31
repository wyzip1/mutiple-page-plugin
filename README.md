# vite-plugin-multipage-auto

A Vite plugin for building multi-page applications with configurable page titles.

## Installation

```bash
npm install vite-plugin-multipage-auto
```

## Usage

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import MultiPageAutoPlugin from 'vite-plugin-multipage-auto';

export default defineConfig({
  plugins: [
    multiPagePlugin({
      // Custom ignore patterns
      ignore: ['custom-ignore/**'],
      // Custom entry file configuration
      entry: {
        // Custom entry file patterns
        patterns: ['app.ts', 'index.ts'],
        // Transform entry paths
        transform: (path) => path.replace('src/', '')
      },
      
      // HTML template customization
      // Custom HTML template
      template: ({ title, scriptPath, head, body }) => `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title}</title>
            ${head?.join('\n') || ''}
          </head>
          <body>
            <div id="app"></div>
            ${body?.join('\n') || ''}
            <script type="module" src="/${scriptPath}"></script>
          </body>
        </html>
      `,
      // Additional head tags
      head: [
        '<link rel="icon" href="/favicon.ico" />',
        '<meta name="description" content="My site" />'
      ],
      // Additional body tags
      body: [
        '<div id="loading">Loading...</div>'
      ]
      pageConfig: {
        index: {
          title: 'AAA'
          template: ({ title, scriptPath, head, body }) => `
            <!DOCTYPE html>
            <html>
              <head>
                <title>${title}</title>
                ${head?.join('\n') || ''}
              </head>
              <body>
                <div id="app"></div>
                ${body?.join('\n') || ''}
                <script type="module" src="/${scriptPath}"></script>
              </body>
            </html>
          `,
          // Additional head tags
          head: [
            '<meta name="description" content="index page" />'
          ],
          // Additional body tags
          body: [
            '<div id="loading">Loading...</div>'
          ]
        }
      }
    })
  ]
});
```

## Options

### renderTitle

Type: `(templateName: string) => string`  
Default: `(templateName) => templateName`

A function to customize the title of each page based on the template name.

### ignore

Type: `string[]`  
Default: `[]`

Additional glob patterns to ignore when searching for entry files.

### entry

Type: `EntryConfig`

Configuration for entry files:

- `patterns`: Custom entry file patterns (default: `['main.ts', 'main.tsx']`)
- `transform`: Function to transform entry paths before use

### html

Type: `HtmlConfig`

HTML template configuration:

- `template`: Custom template function for complete HTML control
- `head`: Additional HTML tags to inject in `<head>`
- `body`: Additional HTML tags to inject in `<body>`

## License

MIT