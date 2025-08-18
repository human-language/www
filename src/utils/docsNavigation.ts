/**
 * Utility functions for documentation navigation
 */

export interface DocItem {
  title: string
  url: string
  order: number
}

export interface DocSection {
  name: string
  items: DocItem[ ]
}

// Define the section order
export const SECTION_ORDER = [
  "Getting Started",
  "Guide",
  "Reference",
  "Examples",
  "Cookbook",
]

/**
 * Format a string to title case
 */
export function formatTitle(str: string): string {
  return str
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

/**
 * Extract URL from file path
 */
export function getUrlFromPath(filePath: string): string {
  let url = filePath
    .replace(/^.*\/pages/, "")  // Remove everything before /pages
    .replace(/\.(md|mdx)$/, "") // Remove file extension
    .replace(/\/index$/, "")   // Remove /index from the end

  return url || "/docs"
}

/**
 * Parse docs structure from imported modules
 */
export function parseDocsStructure(docModules: Record<string, any>): Map<string, DocItem[ ]> {
  const sections = new Map<string, DocItem[ ]>()

  Object.entries(docModules).forEach(([ filePath, mod ]) => {
    const url = getUrlFromPath(filePath)
    
    // Extract section name from URL
    const pathParts = url.split("/").filter(Boolean)
    
    // Skip if not in docs folder
    if (pathParts.length < 1 || pathParts[0] !== "docs") return
    
    // Determine section: either a subdirectory or "Getting Started" for root files
    let sectionName = "Getting Started"
    if (pathParts.length > 2) {
      // File is in a subdirectory like /docs/guide/something.md
      sectionName = decodeURIComponent(pathParts[1])
    }
    
    const formattedSection = formatTitle(sectionName)

    if (!sections.has(formattedSection)) {
      sections.set(formattedSection, [ ])
    }

    // Extract the filename from the original file path
    const filename = filePath.split("/").pop()?.replace(/\.(md|mdx)$/, "") || "untitled"
    
    // Format the filename: convert kebab-case or spaces to Title Case
    const formattedFilename = filename
      .replace(/[-_]/g, " ")  // Replace dashes and underscores with spaces
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")

    const module = mod as any
    sections.get(formattedSection)!.push({
      title : formattedFilename,
      url   : url,
      order : module.frontmatter?.order || 999,
    })
  })

  // Sort items within each section
  sections.forEach((items) => {
    items.sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order
      return a.title.localeCompare(b.title)
    })
  })

  return sections
}

/**
 * Sort sections based on predefined order
 */
export function sortSections(sections: Map<string, DocItem[ ]>): Array<[ string, DocItem[ ] ]> {
  return Array.from(sections.entries()).sort((a, b) => {
    const aIndex = SECTION_ORDER.indexOf(a[0])
    const bIndex = SECTION_ORDER.indexOf(b[0])
    
    if (aIndex === -1 && bIndex === -1) return a[0].localeCompare(b[0])
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1
    return aIndex - bIndex
  })
}
