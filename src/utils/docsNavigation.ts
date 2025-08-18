/**
 * Utility functions for documentation navigation
 */

export interface DocItem {
  title: string;
  url: string;
  order: number;
}

export interface DocSection {
  name: string;
  items: DocItem[];
}

// Define the section order
export const SECTION_ORDER = [
  "Getting Started",
  "Guide",
  "Examples",
  "Cookbook",
  "Reference",
  "Constraints",
];

/**
 * Format a string to title case
 */
export function formatTitle(str: string): string {
  return str
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Extract URL from file path
 */
export function getUrlFromPath(filePath: string): string {
  let url = filePath
    .replace(/^.*\/pages/, "")  // Remove everything before /pages
    .replace(/\.(md|mdx)$/, "") // Remove file extension
    .replace(/\/index$/, "");   // Remove /index from the end

  return url || "/docs";
}

/**
 * Parse docs structure from imported modules
 */
export function parseDocsStructure(docModules: Record<string, any>): Map<string, DocItem[]> {
  const sections = new Map<string, DocItem[]>();

  Object.entries(docModules).forEach(([filePath, mod]) => {
    const url = getUrlFromPath(filePath);
    
    // Skip the main docs index
    if (url === "/docs" || url === "/docs/") return;

    // Extract section name from URL
    const pathParts = url.split("/").filter(Boolean);
    if (pathParts.length < 2) return;

    const sectionName = decodeURIComponent(pathParts[1]);
    const formattedSection = formatTitle(sectionName);

    if (!sections.has(formattedSection)) {
      sections.set(formattedSection, []);
    }

    const module = mod as any;
    sections.get(formattedSection)!.push({
      title: module.frontmatter?.title || formatTitle(pathParts[pathParts.length - 1]),
      url: url,
      order: module.frontmatter?.order || 999,
    });
  });

  // Sort items within each section
  sections.forEach((items) => {
    items.sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return a.title.localeCompare(b.title);
    });
  });

  return sections;
}

/**
 * Sort sections based on predefined order
 */
export function sortSections(sections: Map<string, DocItem[]>): Array<[string, DocItem[]]> {
  return Array.from(sections.entries()).sort((a, b) => {
    const aIndex = SECTION_ORDER.indexOf(a[0]);
    const bIndex = SECTION_ORDER.indexOf(b[0]);
    
    if (aIndex === -1 && bIndex === -1) return a[0].localeCompare(b[0]);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
}
