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
      renderTitle: (templateName) => `${templateName} - My Site`,
      ignore: ['custom-ignore/**'] // Optional: Add custom ignore patterns
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

Additional glob patterns to ignore when searching for entry files. These patterns will be merged with the default ignore patterns:
- node_modules/**
- dist/**
- build/**
- coverage/**
- .git/**
- **/*.test.*
- **/*.spec.*
- **/__tests__/**

## License

MIT