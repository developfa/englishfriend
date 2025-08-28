import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import QuoteBox from '@/components/story/QuoteBox'
import { prisma } from '@/lib/prisma'

interface StoryPageProps {
  params: Promise<{
    slug: string
  }>
}

// Get story from database by slug
async function getStory(slug: string) {
  try {
    const story = await prisma.story.findUnique({
      where: { 
        slug: slug,
        published: true 
      },
      include: {
        figure: true,
        quotes: true
      }
    })
    
    return story
  } catch (error) {
    console.error('Error fetching story:', error)
    return null
  }
}

export async function generateMetadata({ params }: StoryPageProps) {
  const { slug } = await params
  const story = await getStory(slug)
  
  if (!story) {
    return {
      title: 'Story Not Found'
    }
  }

  return {
    title: `${story.title} | Grammar Stories`,
    description: story.excerpt,
  }
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params
  const story = await getStory(slug)

  if (!story) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-800">Home</Link>
          <span>/</span>
          <Link href="/stories" className="hover:text-gray-800">Stories</Link>
          <span>/</span>
          <span className="text-gray-800">{story.title}</span>
        </div>
      </nav>

      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <Badge variant="secondary" className="capitalize">
            {story.figure.category}
          </Badge>
          <Badge className={
            story.difficulty <= 2 ? 'bg-green-100 text-green-800' :
            story.difficulty <= 3 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }>
            Level {story.difficulty}
          </Badge>
          <span className="text-gray-600 text-sm">{story.readingTime} min read</span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {story.title}
        </h1>

        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-600">
              {story.figure.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-800">{story.figure.name}</p>
            <p className="text-sm text-gray-600">{story.figure.bio}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {story.grammarTags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="story-content" dangerouslySetInnerHTML={{ 
          __html: story.content.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>')
            .replace(/## (.*?)<\/p>/g, '</p><h2>$1</h2>')
            .replace('<p></p>', '')
        }} />
      </div>

      {/* Quotes */}
      {story.quotes.map((quote) => (
        <QuoteBox
          key={quote.id}
          quote={quote.text}
          author={story.figure.name}
          grammarPoint={quote.grammarPoint}
          explanation={quote.explanation}
          korean={quote.korean}
        />
      ))}

      {/* Navigation */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link 
            href="/stories"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Stories
          </Link>
          
          <div className="flex space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}