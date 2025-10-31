import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ChevronLeft, Info } from 'lucide-react'
import ServiceCard from '@/components/ServiceCard'
import { getServicesByCategory, Service } from '@/lib/supabase'

export default function CNAS() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const data = await getServicesByCategory('CNAS')
      setServices(data || [])
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
          <span>خدمات CNAS</span>
        </div>
      </div>

      {/* Page Header */}
      <section className="bg-gradient-to-b from-primary-50 to-white px-6 py-16 lg:px-12">
        <div className="container mx-auto text-center">
          <Heart className="mx-auto mb-6 h-16 w-16 text-primary-500" />
          <h1 className="mb-4 text-h1 font-bold text-neutral-900">خدمات CNAS - للأجراء</h1>
          <p className="mx-auto max-w-2xl text-body-large text-neutral-700">
            الصندوق الوطني للضمان الاجتماعي للأجراء
          </p>
        </div>
      </section>

      {/* Alert Note */}
      <section className="container mx-auto px-6 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-start gap-4 rounded-lg bg-info-50 p-6">
            <Info className="h-6 w-6 flex-shrink-0 text-info-500" />
            <div>
              <h3 className="mb-2 text-body font-semibold text-info-500">ملاحظة مهمة</h3>
              <p className="text-body-small text-neutral-700">
                يوجد خياران لشهادة عدم الانتساب حسب حالتك: مع رقم الضمان (للمنتسبين سابقاً أو حالياً) أو بدون رقم الضمان (لمن لم ينتسب أبداً)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="container mx-auto px-6 pb-16 lg:px-12">
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
