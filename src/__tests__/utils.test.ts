import { describe, it, expect } from 'vitest';
import { formatPageName, generateHtml } from '../utils';

describe('formatPageName', () => {
  it('returns "index" for root directory', () => {
    expect(formatPageName('.')).toBe('index');
  });

  it('returns basename for nested directories', () => {
    expect(formatPageName('src/pages/about')).toBe('about');
  });
});

describe('generateHtml', () => {
  it('generates correct HTML structure', () => {
    const html = generateHtml('Test Page', 'src/main.ts');
    expect(html).toContain('<title>Test Page</title>');
    expect(html).toContain('src/main.ts');
    expect(html).toContain('<div id="app"></div>');
  });
});