import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search as SearchIcon, ChevronLeft } from 'lucide-react'
import ServiceCard from '@/components/ServiceCard'
import { searchServices, Service } from '@/lib/supabase'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل')

  useEffect(() => {
    performSearch()
  }, [query, selectedCategory])

  const performSearch = async () => {
    try {
      const data = await searchServices(query)
      
      // فلترة حسب الفئة المختارة
      let filteredData = data
      if (selectedCategory !== 'الكل') {
        filteredData = data.filter(service => service.category === selectedCategory)
      }
      
      setServices(filteredData)
    } catch (error) {
      console.error('Error searching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['الكل', 'التشغيل', 'البطالة', 'العدلية', 'CNAS', 'CASNOS']

  const filteredServices =
    selectedCategory === 'الكل'
      ? services
      : services.filter((s) => s.category === selectedCategory)

  const getCategoryCount = (category: string) => {
    if (category === 'الكل') return services.length
    return services.filter((s) => s.category === category).length
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-4 lg:px-12">
        <div className="flex items-center gap-2 text-body-small text-neutral-700">
          <Link to="/" className="hover:text-primary-600">
            الرئيسية
          </Link>
          <ChevronLeft className="h-4 w-4" />
          <span>نتائج البحث</span>
        </div>
      </div>

      {/* Search Header */}
      <section className="container mx-auto px-6 py-8 lg:px-12">
        <h1 className="mb-2 text-h1 font-bold text-neutral-900">
          نتائج البحث عن: "{query}"
        </h1>
        <p className="text-body text-neutral-700">
          وُجد {filteredServices.length} {filteredServices.length === 1 ? 'نتيجة' : 'نتائج'}
        </p>
      </section>

      {/* Category Filters */}
      <section className="container mx-auto px-6 lg:px-12">
        <div className="flex gap-4 overflow-x-auto border-b border-neutral-200 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap rounded-t-md px-6 py-3 text-body font-medium transition-colors ${
                selectedCategory === category
                  ? 'border-b-2 border-primary-500 text-primary-700'
                  : 'text-neutral-700 hover:text-primary-600'
              }`}
            >
              {category} ({getCategoryCount(category)})
            </button>
          ))}
        </div>
      </section>

      {/* Search Results */}
      <section className="container mx-auto px-6 py-8 lg:px-12">
        {loading ? (
          <div className="text-center text-body text-neutral-700">جاري البحث...</div>
        ) : filteredServices.length === 0 ? (
          <div className="py-16 text-center">
            <SearchIcon className="mx-auto mb-6 h-24 w-24 text-neutral-300" />
            <h2 className="mb-4 text-h2 font-semibold text-neutral-900">
              لم يتم العثور على نتائج
            </h2>
            <p className="mb-6 text-body text-neutral-700">
              جرب كلمات مختلفة أو تصفح الأقسام
            </p>
            <Link
              to="/"
              className="inline-block rounded-md bg-primary-500 px-6 py-3 text-body font-semibold text-white transition-all duration-fast hover:bg-primary-600"
            >
              تصفح جميع الخدمات
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
