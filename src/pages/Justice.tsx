import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Scale, ChevronLeft } from 'lucide-react'
import ServiceCard from '@/components/ServiceCard'
import { getServicesByCategory, Service } from '@/lib/supabase'

export default function Justice() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const data = await getServicesByCategory('العدلية')
      // ترتيب الخدمات حسب تاريخ الإنشاء (الأحدث أولاً)
      const sortedData = data.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      setServices(sortedData)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
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
          <span>الخدمات العدلية</span>
        </div>
      </div>

      {/* Page Header */}
      <section className="bg-gradient-to-b from-primary-50 to-white px-6 py-16 lg:px-12">
        <div className="container mx-auto text-center">
          <Scale className="mx-auto mb-6 h-16 w-16 text-primary-500" />
          <h1 className="mb-4 text-h1 font-bold text-neutral-900">الخدمات العدلية</h1>
          <p className="mx-auto max-w-2xl text-body-large text-neutral-700">
            استخراج شهادة السوابق العدلية وخدمات قانونية أخرى
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="container mx-auto px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-4xl">
          {loading ? (
            <div className="text-center text-body text-neutral-700">جاري التحميل...</div>
          ) : services.length === 0 ? (
            <div className="text-center text-body text-neutral-700">
              لا توجد خدمات متاحة حالياً
            </div>
          ) : (
            <div className="space-y-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
