export interface MultiPageOptions {
  /**
   * Function to customize the title of each page
   * @param templateName - The name of the template (derived from directory name)
   * @returns The rendered page title
   */
  renderTitle?: (templateName: string) => string;
}