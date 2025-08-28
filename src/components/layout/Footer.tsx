import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EF</span>
              </div>
              <span className="text-xl font-bold">English Friend</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              지식과 이야기로 영어를 배우세요. 사회, 문화, 역사 등 다양한 주제를 통해 즐겁게 학습합니다.
            </p>
          </div>

          {/* Stories */}
          <div className="col-start-1 md:col-start-2">
            <h3 className="text-lg font-semibold mb-4">이야기 (Stories)</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/stories?category=scientist" className="hover:text-white transition-colors">과학자 (Scientists)</Link></li>
              <li><Link href="/stories?category=innovator" className="hover:text-white transition-colors">혁신가 (Innovators)</Link></li>
              <li><Link href="/stories?category=historical" className="hover:text-white transition-colors">역사적 인물 (Historical Figures)</Link></li>
              <li><Link href="/stories?category=wisdom" className="hover:text-white transition-colors">지혜 문학 (Wisdom Literature)</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">도움말 (Resources)</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/help" className="hover:text-white transition-colors">도움말 (Help)</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 English Friend. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}