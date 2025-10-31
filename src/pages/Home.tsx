import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Briefcase, UserMinus, Scale, Heart, Users, TrendingUp } from 'lucide-react'
import CategoryCard from '@/components/CategoryCard'
import { getAllServices, getServicesByCategory, Service } from '@/lib/supabase'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const data = await getAllServices()
      setServices(data || [])
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const categories = [
    {
      title: 'خدمات التشغيل',
      description: 'التسجيل والتمديد في موقع الوسيط',
      icon: Briefcase,
      path: '/employment',
      category: 'التشغيل',
    },
    {
      title: 'خدمات البطالة',
      description: 'التسجيل في منحة البطالة',
      icon: UserMinus,
      path: '/unemployment',
      category: 'البطالة',
    },
    {
      title: 'الخدمات العدلية',
      description: 'استخراج شهادة السوابق العدلية',
      icon: Scale,
      path: '/justice',
      category: 'العدلية',
    },
    {
      title: 'خدمات CNAS',
      description: 'للأجراء - شهادات عدم الانتساب',
      icon: Heart,
      path: '/cnas',
      category: 'CNAS',
    },
    {
      title: 'خدمات CASNOS',
      description: 'لغير الأجراء - شهادات متعددة',
      icon: Users,
      path: '/casnos',
      category: 'CASNOS',
    },
  ]

  const getServiceCountByCategory = (category: string) => {
    return services.filter((s) => s.category === category).length
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white px-6 py-24 lg:px-12 lg:py-32">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-hero font-bold text-primary-900">
              منصة عتيق للخدمات الرقمية
            </h1>
            <p className="mb-8 text-body-large text-neutral-700">
              الوصول السريع لجميع الخدمات الحكومية الجزائرية في مكان واحد
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mx-auto max-w-2xl">
              <div className="flex items-center gap-3 rounded-md bg-white p-3 shadow-sm">
                <Search className="h-6 w-6 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن خدمة..."
                  className="flex-1 bg-transparent text-body outline-none"
                />
                <button
                  type="submit"
                  className="rounded-md bg-primary-500 px-6 py-3 text-body font-semibold text-white transition-all duration-fast hover:bg-primary-600"
                >
                  بحث
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-6 py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-surface p-8 text-center shadow-card">
            <div className="mb-2 text-5xl font-bold text-primary-600">
              {loading ? '...' : services.length}+
            </div>
            <div className="text-body-small text-neutral-700">الخدمات المتاحة</div>
          </div>
          <div className="rounded-lg bg-surface p-8 text-center shadow-card">
            <div className="mb-2 text-5xl font-bold text-primary-600">
              {categories.length}
            </div>
            <div className="text-body-small text-neutral-700">الأقسام</div>
          </div>
          <div className="rounded-lg bg-surface p-8 text-center shadow-card">
            <div className="mb-2 text-5xl font-bold text-primary-600">2025</div>
            <div className="text-body-small text-neutral-700">آخر تحديث</div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-6 py-16 lg:px-12">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-h2 font-semibold text-neutral-900">أقسام الخدمات</h2>
          <p className="text-body text-neutral-700">
            اختر القسم المناسب للوصول للخدمة التي تحتاجها
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.path}
              title={category.title}
              description={category.description}
              icon={category.icon}
              serviceCount={getServiceCountByCategory(category.category)}
              path={category.path}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
