/**
 * Replaces all occurrences of the old internal domain with the production domain
 * in any HTML string. This handles links stored in the database that reference
 * aa.nextleveldigitally.com and converts them to custompackboxes.com.
 * 
 * Handles all variations:
 * - https://aa.nextleveldigitally.com/...
 * - http://aa.nextleveldigitally.com/...
 * - //aa.nextleveldigitally.com/...
 * - aa.nextleveldigitally.com/... (without protocol)
 * 
 * @param {string} html - The HTML string to process
 * @returns {string} - The processed HTML string with replaced domains
 */
export function replaceInternalLinks(html) {
  if (!html || typeof html !== 'string') return html;

  // Replace all variations of the old domain with the production domain
  // Using a single regex that handles all protocol variations
  return html.replace(
    /https?:\/\/aa\.nextleveldigitally\.com/gi,
    'https://custompackboxes.com'
  );
}
