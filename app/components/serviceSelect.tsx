import { useState } from 'react'
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

  const categories = Array.from(new Set(services.map(service => service.category)))

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedCategory || service.category === selectedCategory)
  )

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">Available Services</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 rounded ${!selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredServices.map(service => (
          <div key={service.id} className="border p-4 rounded-lg">
            <h3 className="font-semibold">{service.name}</h3>
            <p className="text-gray-600">${service.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mb-2">{service.description}</p>
            <button
              onClick={() => addToCart(service)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
