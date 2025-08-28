import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import StoryCard from '@/components/story/StoryCard'
import { prisma } from '@/lib/prisma'

// Get featured stories from database
async function getFeaturedStories() {
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
      },
      take: 3
    })
    
    return stories
  } catch (error) {
    console.error('Error fetching featured stories:', error)
    return []
  }
}

export default async function Home() {
  const featuredStories = await getFeaturedStories()

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to English Friend
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          사회, 문화, 역사 등 다양한 지식을 담은 이야기로 영어를 배워보세요. 딱딱한 문법이 아닌, 살아있는 문맥 속에서 자연스럽게 실력이 향상됩니다.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/stories">
            <Button size="lg">학습 시작하기 (Start Learning)</Button>
          </Link>
          <Link href="/stories">
            <Button variant="outline" size="lg">이야기 둘러보기 (Browse Stories)</Button>
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Link href="/stories?category=scientist" className="group">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🧬</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600">과학자 (Scientists)</h3>
            <p className="text-gray-600">아인슈타인, 마리 퀴리 등 혁신적인 인물들</p>
          </div>
        </Link>
        
        <Link href="/stories?category=innovator" className="group">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600">혁신가 (Innovators)</h3>
            <p className="text-gray-600">스티브 잡스, 월트 디즈니 등 세상을 바꾼 선구자들</p>
          </div>
        </Link>
        
        <Link href="/stories?category=historical" className="group">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🏛️</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600">역사적 인물 (Historical Figures)</h3>
            <p className="text-gray-600">헬렌 켈러, 마틴 루터 킹 등 영감을 주는 리더들</p>
          </div>
        </Link>

        <Link href="/stories?category=wisdom" className="group">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📜</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600">지혜 문학 (Wisdom Literature)</h3>
            <p className="text-gray-600">성경, 탈무드 등 시대를 초월한 지혜</p>
          </div>
        </Link>
      </div>

      {/* Featured Stories */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">추천 이야기 (Featured Stories)</h2>
          <Link href="/stories" className="text-blue-600 hover:text-blue-800 font-medium">
            모든 이야기 보기 (View All) →
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
        <h2 className="text-3xl font-bold text-gray-800 mb-4">학습할 준비가 되셨나요? (Ready to Learn?)</h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          흥미로운 이야기와 기억에 남는 문장으로 영어 실력을 향상시키세요. 지금 바로 시작해보세요.
        </p>
        <Link href="/stories">
          <Button size="lg">이야기 탐색하기 (Explore Stories)</Button>
        </Link>
      </div>
    </div>
  )
}