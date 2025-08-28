import { Badge } from '@/components/ui/Badge'

interface QuoteBoxProps {
  quote: string
  author: string
  grammarPoint?: string
  explanation?: string
  korean?: string
}

export default function QuoteBox({ 
  quote, 
  author, 
  grammarPoint, 
  explanation,
  korean 
}: QuoteBoxProps) {
  return (
    <div className="my-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-lg">
      <blockquote className="text-xl italic text-gray-800 mb-3">
        "{quote}"
      </blockquote>
      
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-600 font-medium">— {author}</p>
        {grammarPoint && (
          <Badge variant="default" className="ml-2">
            {grammarPoint}
          </Badge>
        )}
      </div>
      
      {korean && (
        <p className="text-sm text-gray-600 mb-3 italic">
          "{korean}"
        </p>
      )}
      
      {explanation && (
        <div className="mt-4 p-4 bg-white rounded border border-blue-200">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Grammar Focus</h4>
          <p className="text-sm text-gray-700">{explanation}</p>
        </div>
      )}
    </div>
  )
}