import { useState, useMemo } from 'react'
import { Service } from '../page'

const services: Service[] = [
  { id: 1, name: 'Fitness Class', price: 20, category: 'Fitness', description: 'Group fitness class for all levels' },
  { id: 2, name: 'Therapy Session', price: 80, category: 'Health', description: 'One-on-one therapy session' },
  { id: 3, name: 'Workshop', price: 50, category: 'Education', description: 'Interactive learning workshop' },
  { id: 4, name: 'Consultation', price: 100, category: 'Business', description: 'Professional business consultation' },
  { id: 5, name: 'Yoga Class', price: 15, category: 'Fitness', description: 'Relaxing yoga session for all levels' },
  { id: 6, name: 'Nutrition Plan', price: 75, category: 'Health', description: 'Personalized nutrition plan' },
  { id: 7, name: 'Language Course', price: 60, category: 'Education', description: '4-week language learning course' },
  { id: 8, name: 'Marketing Strategy', price: 150, category: 'Business', description: 'Comprehensive marketing strategy session' },
]

export default function ServiceSelection({ addToCart }: { addToCart: (service: Service) => void }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = useMemo(() => Array.from(new Set(services.map(service => service.category))), [])

  const filteredServices = useMemo(() => 
    services.filter(service => 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCategory || service.category === selectedCategory)
    ), 
    [searchTerm, selectedCategory]
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center sm:text-left">
                Explore Our Services
              </h2>
              <div className="relative w-full sm:w-64 md:w-96">
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="
                    w-full px-4 py-2 sm:py-3 rounded-full 
                    bg-white/20 text-white 
                    placeholder-white/70 
                    focus:outline-none 
                    focus:ring-2 focus:ring-white/30
                    transition-all text-sm sm:text-base
                  "
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 sm:h-6 sm:w-6 absolute right-4 top-2.5 sm:top-3.5 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 justify-center sm:justify-start">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`
                  px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium 
                  transition-all duration-300
                  ${!selectedCategory 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }
                `}
              >
                All Services
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium 
                    transition-all duration-300
                    ${selectedCategory === category 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>

            {filteredServices.length === 0 ? (
              <div className="text-center py-12 sm:py-16 bg-gray-50 rounded-2xl">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-16 w-16 sm:h-24 sm:w-24 mx-auto text-gray-300 mb-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1} 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <p className="text-xl sm:text-2xl text-gray-500">No services found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredServices.map(service => (
                  <div 
                    key={service.id} 
                    className="
                      bg-white border border-gray-200 
                      rounded-2xl sm:rounded-3xl overflow-hidden 
                      shadow-md hover:shadow-xl 
                      transform hover:-translate-y-1
                      transition-all duration-300
                      group w-full
                    "
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex justify-between items-start mb-2 sm:mb-4">
                        <h3 className="text-lg sm:text-2xl font-bold text-gray-800">{service.name}</h3>
                        <span className="
                          text-base sm:text-xl font-extrabold 
                          bg-gradient-to-r from-green-400 to-blue-500 
                          text-transparent bg-clip-text
                        ">
                          ${service.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 text-sm sm:text-base h-12 sm:h-20 overflow-hidden">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="
                          text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full 
                          bg-blue-50 text-blue-600
                          font-medium
                        ">
                          {service.category}
                        </span>
                        <button
                          onClick={() => addToCart(service)}
                          className="
                            bg-gradient-to-r from-blue-500 to-purple-600
                            text-white 
                            px-3 py-2 sm:px-6 sm:py-3 rounded-full 
                            hover:from-blue-600 hover:to-purple-700
                            transition-all duration-300
                            flex items-center space-x-2 
                            text-xs sm:text-base
                            group-hover:scale-105
                          "
                        >
                          <span>Add to Cart</span>
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M12 4v16m8-8H4" 
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}