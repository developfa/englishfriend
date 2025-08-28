import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface StoryCardProps {
  story: {
    id: number
    title: string
    slug: string
    excerpt: string
    difficulty: number
    readingTime: number
    grammarTags: string[]
    published: boolean
    figure: {
      name: string
      category: string
      imageUrl?: string | null
    }
  }
}

const difficultyColors = {
  1: 'bg-green-100 text-green-800',
  2: 'bg-blue-100 text-blue-800', 
  3: 'bg-yellow-100 text-yellow-800',
  4: 'bg-orange-100 text-orange-800',
  5: 'bg-red-100 text-red-800',
}

const categoryColors = {
  scientist: 'bg-purple-100 text-purple-800',
  innovator: 'bg-blue-100 text-blue-800',
  historical: 'bg-green-100 text-green-800',
  wisdom: 'bg-amber-100 text-amber-800',
  general: 'bg-gray-100 text-gray-800',
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 mb-2">
            {story.figure.imageUrl && (
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={story.figure.imageUrl}
                  alt={story.figure.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-600">{story.figure.name}</p>
              <Badge 
                variant="secondary" 
                className={categoryColors[story.figure.category as keyof typeof categoryColors] || categoryColors.general}
              >
                {story.figure.category}
              </Badge>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Badge className={difficultyColors[story.difficulty as keyof typeof difficultyColors]}>
              Level {story.difficulty}
            </Badge>
            <span className="text-xs text-gray-500">{story.readingTime}min</span>
          </div>
        </div>
        
        <CardTitle className="line-clamp-2">
          <Link 
            href={`/stories/${story.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {story.title}
          </Link>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <CardDescription className="line-clamp-3 mb-4">
          {story.excerpt}
        </CardDescription>
        
        {story.grammarTags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {story.grammarTags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {story.grammarTags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{story.grammarTags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}