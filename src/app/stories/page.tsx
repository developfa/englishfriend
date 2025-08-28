import Link from 'next/link'
import StoryCard from '@/components/story/StoryCard'
import { Button } from '@/components/ui/Button'
import { prisma } from '@/lib/prisma'

// Get all published stories from database
async function getStories() {
  try {
    const stories = await prisma.story.findMany({
      where: {
        published: true
      },
      include: {
        figure: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return stories
  } catch (error) {
    console.error('Error fetching stories:', error)
    return []
  }
}

export default async function StoriesPage() {
  const stories = await getStories()

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Stories of Great Minds
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Learn English grammar through the inspiring journeys of history's most influential figures.
        </p>
        
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button variant="outline" size="sm">All Stories</Button>
          <Button variant="ghost" size="sm">Scientists</Button>
          <Button variant="ghost" size="sm">Innovators</Button>
          <Button variant="ghost" size="sm">Historical Figures</Button>
          <Button variant="ghost" size="sm">Wisdom Literature</Button>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button>Load More Stories</Button>
      </div>
    </div>
  )
}