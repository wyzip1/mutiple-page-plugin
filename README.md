# vite-plugin-multipage

A Vite plugin for building multi-page applications with configurable page titles.

## Installation

```bash
npm install vite-plugin-multipage
```

## Usage

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { multiPagePlugin } from 'vite-plugin-multipage';

export default defineConfig({
  plugins: [
    multiPagePlugin({
      renderTitle: (templateName) => `${templateName} - My Site`
    })
  ]
});
```

## Options

### renderTitle

Type: `(templateName: string) => string`
Default: `(templateName) => templateName`

A function to customize the title of each page based on the template name.

## License

MIT