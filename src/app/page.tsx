import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import StoryCard from '@/components/story/StoryCard'

// Mock data for featured stories
async function getFeaturedStories() {
  return [
    {
      id: 1,
      title: "The Patent Clerk Who Changed Physics",
      slug: "einstein-patent-clerk",
      excerpt: "When Einstein was working at the patent office in Bern, he had been dreaming of unlocking the universe's secrets.",
      difficulty: 3,
      readingTime: 7,
      grammarTags: ["Past Perfect", "Comparatives"],
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
      excerpt: "Steve Jobs and Steve Wozniak started Apple in a garage. This story explores how two college dropouts revolutionized personal computing.",
      difficulty: 2,
      readingTime: 5,
      grammarTags: ["Past Simple", "Present Perfect"],
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
      excerpt: "Helen Keller lost her sight and hearing at 19 months old, but she never lost her spirit.",
      difficulty: 4,
      readingTime: 8,
      grammarTags: ["Past Perfect", "Passive Voice"],
      published: true,
      figure: {
        name: "Helen Keller",
        category: "historical",
        imageUrl: null
      }
    }
  ]
}

export default async function Home() {
  const featuredStories = await getFeaturedStories()

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Grammar Through Stories
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Learn English grammar through inspiring stories and quotes from great minds like Einstein, Steve Jobs, Helen Keller, and wisdom from the ages.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/stories">
            <Button size="lg">Start Learning</Button>
          </Link>
          <Link href="/stories">
            <Button variant="outline" size="lg">Browse Stories</Button>
          </Link>
        </div>
      </div>

      {/* Featured Quote */}
      <div className="mb-16">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
          <blockquote className="text-2xl italic text-gray-700 mb-4">
            "Imagination is more important than knowledge."
          </blockquote>
          <p className="text-gray-600 mb-4">
            — Albert Einstein
          </p>
          <div className="p-4 bg-yellow-50 rounded border-l-4 border-yellow-400">
            <p className="text-sm text-gray-600">
              <strong>Grammar Focus:</strong> Comparative adjectives (more + adjective + than)
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Link href="/stories?category=scientist" className="group">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🧬</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600">Scientists</h3>
            <p className="text-gray-600">Revolutionary minds like Einstein, Edison, and Marie Curie</p>
          </div>
        </Link>
        
        <Link href="/stories?category=innovator" className="group">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600">Innovators</h3>
            <p className="text-gray-600">Visionaries like Steve Jobs, Walt Disney, and other pioneers</p>
          </div>
        </Link>
        
        <Link href="/stories?category=historical" className="group">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🏛️</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600">Historical Figures</h3>
            <p className="text-gray-600">Inspiring leaders like Helen Keller and Martin Luther King Jr.</p>
          </div>
        </Link>

        <Link href="/stories?category=wisdom" className="group">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📜</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600">Wisdom Literature</h3>
            <p className="text-gray-600">Timeless wisdom from the Bible, Talmud, and great philosophers</p>
          </div>
        </Link>
      </div>

      {/* Featured Stories */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Featured Stories</h2>
          <Link href="/stories" className="text-blue-600 hover:text-blue-800 font-medium">
            View All Stories →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>
      
      {/* Call to Action */}
      <div className="text-center bg-white p-12 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start Learning?</h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Join thousands of learners who are improving their English grammar through engaging stories and memorable quotes.
        </p>
        <Link href="/stories">
          <Button size="lg">Explore Stories</Button>
        </Link>
      </div>
    </div>
  )
}