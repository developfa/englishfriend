# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Grammar Through Stories is a Next.js application that teaches English grammar through inspiring stories and quotes from historical figures. The project uses a hybrid architecture with Notion as a CMS and PostgreSQL for data storage.

## Development Commands

```bash
# Development
npm run dev              # Start development server (localhost:3000)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint

# Database Operations
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema changes to database
npm run db:migrate       # Run database migrations

# Content Management
npm run sync:notion      # Sync content from Notion to PostgreSQL
```

## Architecture & Key Components

### Database Layer (Prisma + PostgreSQL)
- **Schema**: `prisma/schema.prisma` - Complete database model with Stories, Figures, Quotes, Users, UserProgress
- **Client**: `src/lib/prisma.ts` - Database connection and queries
- **Key Models**: Figure → Story → Quote relationship with user progress tracking

### Content Management (Notion Integration)
- **Notion Service**: `src/lib/notion.ts` - Notion API client and helper functions  
- **Sync Script**: `src/scripts/sync-notion.ts` - Syncs Notion databases to PostgreSQL
- **Content Flow**: Notion (editing) → Sync script → PostgreSQL (serving)

### Frontend Architecture (Next.js App Router)
- **App Router**: Using Next.js 15 app directory structure
- **Pages**: 
  - `/` - Homepage with featured stories
  - `/stories` - Story listing with filtering
  - `/stories/[slug]` - Individual story pages with grammar highlighting
- **Components**: Modular structure in `src/components/` (ui/, layout/, story/)

### Key Features
- **Story Rendering**: MDX content with grammar highlighting and interactive quotes
- **Quote Analysis**: `QuoteBox` component shows grammar explanations
- **Responsive Design**: Tailwind CSS with mobile-first approach
- **Progress Tracking**: User reading progress and bookmarks (schema ready)

## Environment Setup

Required environment variables in `.env.local`:
```
DATABASE_URL=              # PostgreSQL connection string
NOTION_API_KEY=           # Notion integration token
NOTION_STORIES_DATABASE_ID=   # Notion stories database
NOTION_FIGURES_DATABASE_ID=   # Notion figures database
```

## Content Workflow

1. **Content Creation**: Write stories in Notion using structured database
2. **Synchronization**: Run `npm run sync:notion` to pull content into PostgreSQL
3. **Development**: Test locally with `npm run dev`
4. **Deployment**: Build and deploy with automatic content sync

## Code Conventions

- **TypeScript**: Strict mode enabled, full type coverage
- **Components**: Functional components with TypeScript interfaces
- **Styling**: Tailwind CSS with custom utility classes
- **Database**: Prisma ORM with camelCase field mapping
- **Notion Integration**: Block-to-MDX conversion for rich content

## Testing & Quality

- **Linting**: ESLint with Next.js configuration
- **Database**: Test sync operations before deploying content changes
- **Content Validation**: Stories require title, figure, difficulty, and grammar tags

## Deployment Notes

- **Database**: Requires PostgreSQL (Supabase recommended)
- **Images**: Configured for Notion image domains
- **Build**: Includes content sync step for production deployment
- **Performance**: Static generation for story pages, dynamic for user features