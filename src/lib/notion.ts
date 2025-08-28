import { Client } from '@notionhq/client'

// Lazy initialization to allow environment variables to be loaded first
let notionClient: Client | null = null

function getNotionClient() {
  if (!notionClient) {
    if (!process.env.NOTION_API_KEY) {
      throw new Error('NOTION_API_KEY is not defined in environment variables')
    }
    notionClient = new Client({
      auth: process.env.NOTION_API_KEY,
    })
  }
  return notionClient
}

export const notion = {
  get databases() {
    return getNotionClient().databases
  },
  get blocks() {
    return getNotionClient().blocks
  },
  get pages() {
    return getNotionClient().pages
  }
}

// Types for Notion API responses
export interface NotionPage {
  id: string
  created_time: string
  last_edited_time: string
  properties: any
  content?: NotionBlock[]
}

export interface NotionBlock {
  id: string
  type: string
  [key: string]: any
}

export interface NotionDatabase {
  id: string
  title: string
  properties: any
}

// Helper functions for Notion API
export class NotionService {
  // Get database pages
  async getDatabasePages(databaseId: string) {
    try {
      const response = await notion.databases.query({
        database_id: databaseId,
      })
      return response.results
    } catch (error) {
      console.error('Error fetching database pages:', error)
      throw error
    }
  }

  // Get page content (blocks)
  async getPageContent(pageId: string): Promise<NotionBlock[]> {
    try {
      const response = await notion.blocks.children.list({
        block_id: pageId,
      })
      return response.results as NotionBlock[]
    } catch (error) {
      console.error('Error fetching page content:', error)
      throw error
    }
  }

  // Convert Notion blocks to MDX
  async blocksToMDX(blocks: NotionBlock[]): Promise<string> {
    let mdx = ''

    for (const block of blocks) {
      switch (block.type) {
        case 'paragraph':
          const paragraphText = this.extractTextFromRichText(block.paragraph?.rich_text || [])
          if (paragraphText) {
            mdx += `${paragraphText}\n\n`
          }
          break

        case 'heading_1':
          const h1Text = this.extractTextFromRichText(block.heading_1?.rich_text || [])
          if (h1Text) {
            mdx += `# ${h1Text}\n\n`
          }
          break

        case 'heading_2':
          const h2Text = this.extractTextFromRichText(block.heading_2?.rich_text || [])
          if (h2Text) {
            mdx += `## ${h2Text}\n\n`
          }
          break

        case 'heading_3':
          const h3Text = this.extractTextFromRichText(block.heading_3?.rich_text || [])
          if (h3Text) {
            mdx += `### ${h3Text}\n\n`
          }
          break

        case 'bulleted_list_item':
          const bulletText = this.extractTextFromRichText(block.bulleted_list_item?.rich_text || [])
          if (bulletText) {
            mdx += `- ${bulletText}\n`
          }
          break

        case 'numbered_list_item':
          const numberedText = this.extractTextFromRichText(block.numbered_list_item?.rich_text || [])
          if (numberedText) {
            mdx += `1. ${numberedText}\n`
          }
          break

        case 'quote':
          const quoteText = this.extractTextFromRichText(block.quote?.rich_text || [])
          if (quoteText) {
            mdx += `<div className="quote-box">\n"${quoteText}"\n</div>\n\n`
          }
          break

        case 'code':
          const codeText = this.extractTextFromRichText(block.code?.rich_text || [])
          const language = block.code?.language || 'text'
          if (codeText) {
            mdx += `\`\`\`${language}\n${codeText}\n\`\`\`\n\n`
          }
          break

        default:
          // Handle other block types as needed
          break
      }
    }

    return mdx
  }

  // Extract plain text from Notion rich text
  private extractTextFromRichText(richText: any[]): string {
    return richText
      .map((text) => {
        let content = text.plain_text

        // Apply formatting
        if (text.annotations?.bold) {
          content = `**${content}**`
        }
        if (text.annotations?.italic) {
          content = `*${content}*`
        }
        if (text.annotations?.code) {
          content = `\`${content}\``
        }

        // Handle links
        if (text.href) {
          content = `[${content}](${text.href})`
        }

        return content
      })
      .join('')
  }

  // Extract property value from Notion page
  extractProperty(page: any, propertyName: string): any {
    const property = page.properties[propertyName]
    if (!property) return null

    switch (property.type) {
      case 'title':
        return property.title?.[0]?.plain_text || ''
      case 'rich_text':
        return property.rich_text?.[0]?.plain_text || ''
      case 'select':
        return property.select?.name || null
      case 'multi_select':
        return property.multi_select?.map((item: any) => item.name) || []
      case 'number':
        return property.number
      case 'date':
        return property.date?.start || null
      case 'checkbox':
        return property.checkbox
      case 'url':
        return property.url
      case 'email':
        return property.email
      case 'phone_number':
        return property.phone_number
      default:
        return null
    }
  }

  // Extract quotes from content
  extractQuotes(content: string): string[] {
    const quoteRegex = /"([^"]+)"/g
    const matches = content.match(quoteRegex)
    return matches ? matches.map(match => match.replace(/"/g, '')) : []
  }

  // Calculate reading time (words per minute: 200)
  calculateReadingTime(content: string): number {
    const words = content.split(/\s+/).length
    return Math.ceil(words / 200)
  }
}

export const notionService = new NotionService()