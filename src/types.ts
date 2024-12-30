export interface MultiPageAutoOptions {
  /**
   * Function to customize the title of each page
   * @param templateName - The name of the template (derived from directory name)
   * @returns The rendered page title
   */
  renderTitle?: (templateName: string) => string;

  /**
   * Custom ignore patterns for file globbing
   * Will be merged with default ignore patterns
   */
  ignore?: string[];
}
