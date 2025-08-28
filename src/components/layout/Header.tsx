import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GS</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Grammar Stories</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/stories" 
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Stories
            </Link>
            <Link 
              href="/figures" 
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Figures
            </Link>
            <Link 
              href="/grammar" 
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Grammar
            </Link>
            <Link 
              href="/about" 
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Search Button */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2 text-gray-600 hover:text-gray-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}