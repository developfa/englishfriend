#!/usr/bin/env tsx

import { config } from 'dotenv'
import { join } from 'path'
config({ path: join(process.cwd(), '.env.local') }) // Load environment variables

import { PrismaClient } from '@prisma/client'
import { notionService } from '../lib/notion'
import { slugify } from '../lib/utils'

const prisma = new PrismaClient()

interface NotionStoryPage {
  id: string
  properties: {
    Title: { title: Array<{ plain_text: string }> }
    Figure: { select: { name: string } | null }
    Category: { select: { name: string } | null }
    Difficulty: { number: number | null }
    'Grammar Tags': { multi_select: Array<{ name: string }> }
    Published: { checkbox: boolean }
    Excerpt: { rich_text: Array<{ plain_text: string }> }
    'Meta Title': { rich_text: Array<{ plain_text: string }> }
    'Meta Description': { rich_text: Array<{ plain_text: string }> }
  }
  created_time: string
  last_edited_time: string
}

interface NotionFigurePage {
  id: string
  properties: {
    Name: { title: Array<{ plain_text: string }> }
    Category: { select: { name: string } | null }
    Bio: { rich_text: Array<{ plain_text: string }> }
    'Birth Year': { number: number | null }
    'Death Year': { number: number | null }
    Nationality: { rich_text: Array<{ plain_text: string }> }
    'Image URL': { url: string | null }
  }
}

class NotionSyncService {
  private readonly STORIES_DATABASE_ID = process.env.NOTION_STORIES_DATABASE_ID!
  private readonly FIGURES_DATABASE_ID = process.env.NOTION_FIGURES_DATABASE_ID!

  async syncAll() {
    console.log('🚀 Starting Notion sync...')
    
    try {
      // First sync figures, then stories (due to foreign key relationship)
      await this.syncFigures()
      await this.syncStories()
      
      console.log('✅ Notion sync completed successfully!')
    } catch (error) {
      console.error('❌ Error during sync:', error)
      throw error
    }
  }

  async syncFigures() {
    console.log('📚 Syncing figures from Notion...')

    if (!this.FIGURES_DATABASE_ID) {
      console.log('⚠️  NOTION_FIGURES_DATABASE_ID not set, skipping figures sync')
      return
    }

    try {
      const pages = await notionService.getDatabasePages(this.FIGURES_DATABASE_ID)
      const figurePages = pages.filter(page => 'properties' in page && page.properties !== undefined)
      console.log(`Found ${figurePages.length} figure pages in Notion`)

      for (const page of figurePages) {
        await this.syncFigure(page as any)
      }

      console.log('✅ Figures sync completed')
    } catch (error) {
      console.error('❌ Error syncing figures:', error)
      throw error
    }
  }

  async syncFigure(notionPage: NotionFigurePage) {
    const name = notionService.extractProperty(notionPage, 'Name') || 'Untitled'
    const slug = slugify(name)
    const category = notionService.extractProperty(notionPage, 'Category') || 'general'
    const bio = notionService.extractProperty(notionPage, 'Bio') || ''
    const birthYear = notionService.extractProperty(notionPage, 'Birth Year')
    const deathYear = notionService.extractProperty(notionPage, 'Death Year')
    const nationality = notionService.extractProperty(notionPage, 'Nationality') || ''
    const imageUrl = notionService.extractProperty(notionPage, 'Image URL')

    try {
      // Upsert figure
      await prisma.figure.upsert({
        where: { slug },
        update: {
          name,
          category,
          bio,
          birthYear,
          deathYear,
          nationality,
          imageUrl,
          updatedAt: new Date(),
        },
        create: {
          name,
          slug,
          category,
          bio,
          birthYear,
          deathYear,
          nationality,
          imageUrl,
        },
      })

      console.log(`✅ Synced figure: ${name}`)
    } catch (error) {
      console.error(`❌ Error syncing figure ${name}:`, error)
    }
  }

  async syncStories() {
    console.log('📖 Syncing stories from Notion...')

    if (!this.STORIES_DATABASE_ID) {
      console.error('❌ NOTION_STORIES_DATABASE_ID is required')
      throw new Error('NOTION_STORIES_DATABASE_ID is not set')
    }

    try {
      const pages = await notionService.getDatabasePages(this.STORIES_DATABASE_ID)
      const storyPages = pages.filter(page => 'properties' in page && page.properties !== undefined)
      console.log(`Found ${storyPages.length} story pages in Notion`)

      for (const page of storyPages) {
        await this.syncStory(page as any)
      }

      console.log('✅ Stories sync completed')
    } catch (error) {
      console.error('❌ Error syncing stories:', error)
      throw error
    }
  }

  async syncStory(notionPage: NotionStoryPage) {
    const title = notionService.extractProperty(notionPage, 'Title') || notionService.extractProperty(notionPage, 'Name') || 'Untitled'
    const slug = slugify(title)
    const figureName = notionService.extractProperty(notionPage, 'Figure')
    const difficulty = notionService.extractProperty(notionPage, 'Difficulty') || 1
    const grammarTags = notionService.extractProperty(notionPage, 'Grammar Tags') || []
    const published = notionService.extractProperty(notionPage, 'Published') || false
    const excerpt = notionService.extractProperty(notionPage, 'Excerpt') || ''
    const metaTitle = notionService.extractProperty(notionPage, 'Meta Title') || title
    const metaDescription = notionService.extractProperty(notionPage, 'Meta Description') || excerpt

    console.log(`Processing story: ${title}`)

    try {
      // Find the figure
      let figure
      if (figureName) {
        figure = await prisma.figure.findUnique({
          where: { name: figureName }
        })
        
        if (!figure) {
          // Create a basic figure if it doesn't exist
          const figureSlug = slugify(figureName)
          figure = await prisma.figure.create({
            data: {
              name: figureName,
              slug: figureSlug,
              category: 'general',
            }
          })
          console.log(`Created new figure: ${figureName}`)
        }
      } else {
        // Create a default figure if none specified
        figure = await prisma.figure.upsert({
          where: { slug: 'unknown' },
          update: {},
          create: {
            name: 'Unknown',
            slug: 'unknown',
            category: 'general',
          }
        })
      }

      // Get page content and convert to MDX
      const blocks = await notionService.getPageContent(notionPage.id)
      const content = await notionService.blocksToMDX(blocks)
      const readingTime = notionService.calculateReadingTime(content)

      // Extract quotes from content
      const quotes = notionService.extractQuotes(content)

      // Upsert story
      const story = await prisma.story.upsert({
        where: { slug },
        update: {
          title,
          content,
          excerpt,
          figureId: figure.id,
          difficulty,
          grammarTags,
          readingTime,
          metaTitle,
          metaDescription,
          published,
          publishedAt: published ? new Date() : null,
          updatedAt: new Date(),
        },
        create: {
          notionId: notionPage.id,
          title,
          slug,
          content,
          excerpt,
          figureId: figure.id,
          difficulty,
          grammarTags,
          readingTime,
          metaTitle,
          metaDescription,
          published,
          publishedAt: published ? new Date() : null,
        },
      })

      // Sync quotes for this story
      await this.syncQuotes(story.id, figure.id, quotes)

      console.log(`✅ Synced story: ${title} (${readingTime}min read)`)
    } catch (error) {
      console.error(`❌ Error syncing story ${title}:`, error)
    }
  }

  async syncQuotes(storyId: number, figureId: number, quotes: string[]) {
    // Delete existing quotes for this story
    await prisma.quote.deleteMany({
      where: { storyId }
    })

    // Create new quotes
    for (const quoteText of quotes) {
      if (quoteText.trim()) {
        try {
          await prisma.quote.create({
            data: {
              text: quoteText,
              storyId,
              figureId,
            }
          })
        } catch (error) {
          console.error(`Error creating quote: ${quoteText}`, error)
        }
      }
    }

    if (quotes.length > 0) {
      console.log(`  📝 Synced ${quotes.length} quotes`)
    }
  }

  async cleanup() {
    await prisma.$disconnect()
  }
}

// Main execution
async function main() {
  const syncService = new NotionSyncService()
  
  try {
    await syncService.syncAll()
  } catch (error) {
    console.error('Sync failed:', error)
    process.exit(1)
  } finally {
    await syncService.cleanup()
  }
}

// Run the sync if this file is executed directly
if (require.main === module) {
  main()
    .then(() => {
      console.log('🎉 Sync process completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('💥 Sync process failed:', error)
      process.exit(1)
    })
}

export { NotionSyncService }