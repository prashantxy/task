import { useState, useMemo } from 'react'
import { Service } from '../page'

const services: Service[] = [
  { id: 1, name: 'Fitness Class', price: 20, category: 'Fitness', description: 'Group fitness class for all levels' },
  { id: 2, name: 'Therapy Session', price: 80, category: 'Health', description: 'One-on-one therapy session' },
  { id: 3, name: 'Workshop', price: 50, category: 'Education', description: 'Interactive learning workshop' },
  { id: 4, name: 'Consultat', price: 100, category: 'Business', description: 'Professional business consultation' },
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
            </div>
          </div>

          <div className="p-4 sm:p-6">
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
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 break-words w-full">
                        {service.name}
                      </h3>
                     <span className="
                        text-sm sm:text-base md:text-lg font-bold 
                          bg-gradient-to-r from-green-400 to-blue-500 
                            text-transparent bg-clip-text
                             truncate w-auto
                                ">
                      ${service.price.toFixed(2)}
                 </span>

                    </div>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base md:text-lg overflow-hidden w-full">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between flex-wrap">
                      <span className="
                        text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1 rounded-full 
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
                          px-3 py-2 sm:px-4 md:px-6 sm:py-3 md:py-3 rounded-full 
                          hover:from-blue-600 hover:to-purple-700
                          transition-all duration-300
                          flex items-center space-x-2 
                          text-xs sm:text-base md:text-lg
                          group-hover:scale-105
                        "
                      >
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
