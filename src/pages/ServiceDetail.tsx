import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, ExternalLink, Calendar } from 'lucide-react'
import { getServiceById, Service } from '@/lib/supabase'

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchService()
    }
  }, [id])

  const fetchService = async () => {
    try {
      const data = await getServiceById(id!)
      setService(data)
    } catch (error) {
      console.error('Error fetching service:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-body text-neutral-700">جاري التحميل...</div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-h2 text-neutral-900">الخدمة غير موجودة</h2>
          <Link to="/" className="text-body text-primary-700 hover:underline">
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    )
  }

  const getCategoryPath = (category: string) => {
    const paths: Record<string, string> = {
      'التشغيل': '/employment',
      'البطالة': '/unemployment',
      'العدلية': '/justice',
      'CNAS': '/cnas',
      'CASNOS': '/casnos',
    }
    return paths[category] || '/'
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
          <Link to={getCategoryPath(service.category)} className="hover:text-primary-600">
            {service.category}
          </Link>
          <ChevronLeft className="h-4 w-4" />
          <span>{service.name}</span>
        </div>
      </div>

      {/* Service Header */}
      <section className="container mx-auto px-6 py-8 lg:px-12">
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <h1 className="mb-4 text-h1 font-bold text-neutral-900">{service.name}</h1>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary-100 px-4 py-2 text-body-small font-medium text-primary-700">
                {service.category}
              </span>
              {service.has_special_cases && (
                <span className="rounded-full bg-info-50 px-4 py-2 text-body-small font-medium text-info-500">
                  حالات خاصة
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Service Content */}
      <section className="container mx-auto px-6 pb-16 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-7">
            <div className="space-y-8">
              <div>
                <h2 className="mb-4 text-h2 font-semibold text-neutral-900">الوصف</h2>
                <p className="text-body leading-relaxed text-neutral-700">
                  {service.description}
                </p>
              </div>

              {service.has_special_cases && service.special_cases_data?.cases && (
                <div>
                  <h2 className="mb-4 text-h2 font-semibold text-neutral-900">
                    الحالات الخاصة المتاحة
                  </h2>
                  <div className="space-y-4">
                    {service.special_cases_data.cases.map((specialCase, index) => (
                      <div
                        key={index}
                        className="rounded-lg border border-neutral-200 bg-surface p-6"
                      >
                        <h3 className="mb-2 text-h3 font-semibold text-neutral-900">
                          {specialCase.name}
                        </h3>
                        <p className="text-body text-neutral-700">{specialCase.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h2 className="mb-4 text-h2 font-semibold text-neutral-900">ملاحظات</h2>
                <ul className="list-inside list-disc space-y-2 text-body text-neutral-700">
                  <li>تأكد من توفر جميع الوثائق المطلوبة قبل البدء</li>
                  <li>احتفظ بنسخة من جميع المستندات المقدمة</li>
                  <li>تابع حالة طلبك بانتظام على الموقع الرسمي</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              {/* Quick Info Card */}
              <div className="rounded-lg bg-surface p-6 shadow-card">
                <h3 className="mb-4 text-h3 font-semibold text-neutral-900">معلومات سريعة</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-body-small text-neutral-500">القسم</div>
                    <div className="text-body font-medium text-neutral-900">
                      {service.category}
                    </div>
                  </div>
                  <div>
                    <div className="text-body-small text-neutral-500">الحالة</div>
                    <div className="text-body font-medium text-success-500">نشط</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-neutral-500" />
                    <div className="text-body-small text-neutral-500">
                      آخر تحديث: {new Date(service.updated_at).toLocaleDateString('ar-DZ')}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href={service.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-16 items-center justify-center gap-3 rounded-lg bg-primary-500 text-h3 font-semibold text-white shadow-card transition-all duration-fast hover:-translate-y-1 hover:bg-primary-600 hover:shadow-card-hover"
              >
                الوصول للخدمة
                <ExternalLink className="h-6 w-6" />
              </a>

              {/* Help Card */}
              <div className="rounded-lg bg-info-50 p-6">
                <h3 className="mb-2 text-body font-semibold text-info-500">هل تحتاج مساعدة؟</h3>
                <p className="text-body-small text-neutral-700">
                  إذا واجهت أي مشكلة في الوصول للخدمة، يمكنك التواصل مع الدعم الفني
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
