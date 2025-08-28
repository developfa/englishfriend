import { Suspense } from 'react'
import Link from 'next/link'
import StoryCard from '@/components/story/StoryCard'
import { Button } from '@/components/ui/Button'

// This would typically come from your database
async function getStories() {
  // Mock data for now
  return [
    {
      id: 1,
      title: "The Patent Clerk Who Changed Physics",
      slug: "einstein-patent-clerk",
      excerpt: "When Einstein was working at the patent office in Bern, he had been dreaming of unlocking the universe's secrets. This is the story of how imagination became more important than knowledge.",
      difficulty: 3,
      readingTime: 7,
      grammarTags: ["Past Perfect", "Comparatives", "Present Perfect"],
      published: true,
      figure: {
        name: "Albert Einstein",
        category: "scientist",
        imageUrl: null
      }
    },
    {
      id: 2,
      title: "From Garage to Empire",
      slug: "jobs-garage-empire", 
      excerpt: "Steve Jobs and Steve Wozniak started Apple in a garage. This story explores how two college dropouts revolutionized personal computing and changed the world forever.",
      difficulty: 2,
      readingTime: 5,
      grammarTags: ["Past Simple", "Present Perfect", "Modal Verbs"],
      published: true,
      figure: {
        name: "Steve Jobs",
        category: "innovator",
        imageUrl: null
      }
    },
    {
      id: 3,
      title: "Light in the Darkness",
      slug: "helen-keller-light-darkness",
      excerpt: "Helen Keller lost her sight and hearing at 19 months old, but she never lost her spirit. Her journey from isolation to inspiration shows the power of determination.",
      difficulty: 4,
      readingTime: 8,
      grammarTags: ["Past Perfect", "Present Perfect", "Passive Voice"],
      published: true,
      figure: {
        name: "Helen Keller",
        category: "historical",
        imageUrl: null
      }
    }
  ]
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
      <Suspense fallback={<div>Loading stories...</div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </Suspense>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button>Load More Stories</Button>
      </div>
    </div>
  )
}