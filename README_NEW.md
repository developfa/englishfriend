# Grammar Through Stories

Learn English grammar through inspiring stories and quotes from great minds like Einstein, Steve Jobs, Helen Keller, and wisdom from the ages.

## 🚀 Features

- **Story-based Learning**: Learn grammar through engaging stories of famous figures
- **Interactive Quotes**: Click on highlighted quotes to see grammar explanations  
- **Progress Tracking**: Track your reading progress and bookmarks
- **Multi-level Content**: Stories categorized by difficulty level
- **Grammar Focus**: Each story highlights specific grammar points
- **Responsive Design**: Works great on desktop and mobile

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Content**: Notion API + MDX
- **Deployment**: Vercel + Supabase

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `NOTION_API_KEY`: Your Notion integration token
- `NOTION_STORIES_DATABASE_ID`: Notion database ID for stories
- `NOTION_FIGURES_DATABASE_ID`: Notion database ID for figures

3. Set up the database:
```bash
npm run db:push
npm run db:generate
```

4. Sync content from Notion:
```bash
npm run sync:notion
```

5. Start the development server:
```bash
npm run dev
```

## 🔄 Content Management

Content is managed through Notion databases with the following structure:

### Stories Database Properties:
- Title, Figure, Difficulty (1-5), Grammar Tags, Published, Excerpt, Meta Title, Meta Description

### Figures Database Properties:  
- Name, Category, Bio, Birth/Death Year, Nationality, Image URL

## 📝 Development Commands

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run db:push` - Update database schema
- `npm run sync:notion` - Sync content from Notion