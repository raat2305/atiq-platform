import { useState, useEffect } from 'react'
import { Plus, Search as SearchIcon, Edit2, Trash2, X } from 'lucide-react'
import { getAllServices, getServicesByCategory, searchServices, createService, updateService, deleteService, Service } from '@/lib/supabase'

export default function Admin() {
  const [services, setServices] = useState<Service[]>([])
  const [filteredServices, setFilteredServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('الكل')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'التشغيل',
    link: '',
    has_special_cases: false,
    special_cases_data: '',
  })

  useEffect(() => {
    fetchServices()
  }, [])

  useEffect(() => {
    const applyFilters = async () => {
      await filterServices()
    }
    applyFilters()
  }, [services, searchQuery, categoryFilter])

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

  const filterServices = async () => {
    try {
      let filtered = services

      if (categoryFilter !== 'الكل') {
        const categoryServices = await getServicesByCategory(categoryFilter)
        filtered = filtered.filter((s) => categoryServices.some(cs => cs.id === s.id))
      }

      if (searchQuery) {
        const searchResults = await searchServices(searchQuery)
        filtered = filtered.filter((s) => searchResults.some(rs => rs.id === s.id))
      }

      setFilteredServices(filtered)
    } catch (error) {
      console.error('Error filtering services:', error)
      setFilteredServices(services)
    }
  }

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingService(service)
      setFormData({
        name: service.name,
        description: service.description,
        category: service.category,
        link: service.link,
        has_special_cases: service.has_special_cases,
        special_cases_data: service.special_cases_data
          ? JSON.stringify(service.special_cases_data, null, 2)
          : '',
      })
    } else {
      setEditingService(null)
      setFormData({
        name: '',
        description: '',
        category: 'التشغيل',
        link: '',
        has_special_cases: false,
        special_cases_data: '',
      })
    }
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setEditingService(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let specialCasesData = null
      if (formData.has_special_cases && formData.special_cases_data) {
        try {
          specialCasesData = JSON.parse(formData.special_cases_data)
        } catch {
          alert('البيانات الخاصة بالحالات غير صحيحة (يجب أن تكون JSON)')
          return
        }
      }

      const serviceData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        link: formData.link,
        has_special_cases: formData.has_special_cases,
        special_cases_data: specialCasesData,
        updated_at: new Date().toISOString(),
      }

      if (editingService) {
        await updateService(editingService.id, serviceData)
        alert('تم تحديث الخدمة بنجاح')
      } else {
        await createService(serviceData)
        alert('تم إضافة الخدمة بنجاح')
      }

      handleCloseModal()
      fetchServices()
    } catch (error) {
      console.error('Error saving service:', error)
      alert('حدث خطأ أثناء حفظ الخدمة')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return

    try {
      await deleteService(id)
      alert('تم حذف الخدمة بنجاح')
      fetchServices()
    } catch (error) {
      console.error('Error deleting service:', error)
      alert('حدث خطأ أثناء حذف الخدمة')
    }
  }

  const categories = ['الكل', 'التشغيل', 'البطالة', 'العدلية', 'CNAS', 'CASNOS']

  return (
    <div className="min-h-screen bg-page-bg py-8">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-h1 font-bold text-neutral-900">لوحة الإدارة</h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-body font-semibold text-white transition-all duration-fast hover:bg-primary-600"
          >
            <Plus className="h-5 w-5" />
            إضافة خدمة جديدة
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 rounded-lg bg-neutral-50 p-6 md:flex-row">
          <div className="relative flex-1">
            <SearchIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن خدمة..."
              className="w-full rounded-md border border-neutral-200 bg-white py-3 pr-12 pl-4 text-body outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-md border border-neutral-200 bg-white px-4 py-3 text-body outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                القسم: {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg bg-surface shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-100">
                <tr>
                  <th className="px-6 py-4 text-right text-body font-semibold text-neutral-900">
                    اسم الخدمة
                  </th>
                  <th className="px-6 py-4 text-right text-body font-semibold text-neutral-900">
                    القسم
                  </th>
                  <th className="px-6 py-4 text-right text-body font-semibold text-neutral-900">
                    الحالة
                  </th>
                  <th className="px-6 py-4 text-right text-body font-semibold text-neutral-900">
                    آخر تحديث
                  </th>
                  <th className="px-6 py-4 text-center text-body font-semibold text-neutral-900">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-body text-neutral-700">
                      جاري التحميل...
                    </td>
                  </tr>
                ) : filteredServices.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-body text-neutral-700">
                      لا توجد خدمات
                    </td>
                  </tr>
                ) : (
                  filteredServices.map((service) => (
                    <tr
                      key={service.id}
                      className="border-b border-neutral-200 transition-colors hover:bg-neutral-50"
                    >
                      <td className="px-6 py-4 text-body text-neutral-900">{service.name}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-primary-100 px-3 py-1 text-caption font-medium text-primary-700">
                          {service.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-success-50 px-3 py-1 text-caption font-medium text-success-500">
                          نشط
                        </span>
                      </td>
                      <td className="px-6 py-4 text-body-small text-neutral-700">
                        {new Date(service.updated_at).toLocaleDateString('ar-DZ')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenModal(service)}
                            className="rounded-md p-2 text-primary-700 transition-colors hover:bg-primary-50"
                          >
                            <Edit2 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="rounded-md p-2 text-error-500 transition-colors hover:bg-error-50"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-modal">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-h2 font-semibold text-neutral-900">
                {editingService ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="rounded-md p-2 text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-body-small font-semibold text-neutral-900">
                  اسم الخدمة
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full rounded-md border border-neutral-200 px-4 py-3 text-body outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-body-small font-semibold text-neutral-900">
                  القسم
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="w-full rounded-md border border-neutral-200 px-4 py-3 text-body outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
                >
                  <option value="التشغيل">التشغيل</option>
                  <option value="البطالة">البطالة</option>
                  <option value="العدلية">العدلية</option>
                  <option value="CNAS">CNAS</option>
                  <option value="CASNOS">CASNOS</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-body-small font-semibold text-neutral-900">
                  الوصف
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  className="w-full rounded-md border border-neutral-200 px-4 py-3 text-body outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-body-small font-semibold text-neutral-900">
                  الرابط
                </label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  required
                  className="w-full rounded-md border border-neutral-200 px-4 py-3 text-body outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="has_special_cases"
                  checked={formData.has_special_cases}
                  onChange={(e) =>
                    setFormData({ ...formData, has_special_cases: e.target.checked })
                  }
                  className="h-5 w-5 rounded border-neutral-300 text-primary-500 focus:ring-2 focus:ring-primary-500"
                />
                <label htmlFor="has_special_cases" className="text-body text-neutral-900">
                  يوجد حالات خاصة
                </label>
              </div>

              {formData.has_special_cases && (
                <div>
                  <label className="mb-2 block text-body-small font-semibold text-neutral-900">
                    بيانات الحالات الخاصة (JSON)
                  </label>
                  <textarea
                    value={formData.special_cases_data}
                    onChange={(e) =>
                      setFormData({ ...formData, special_cases_data: e.target.value })
                    }
                    placeholder='{"cases": [{"name": "اسم الحالة", "description": "الوصف"}]}'
                    rows={6}
                    className="w-full rounded-md border border-neutral-200 px-4 py-3 font-mono text-body-small outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              )}

              <div className="flex justify-end gap-4 border-t border-neutral-200 pt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-md border-2 border-neutral-200 px-6 py-3 text-body font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-primary-500 px-6 py-3 text-body font-semibold text-white transition-colors hover:bg-primary-600"
                >
                  {editingService ? 'تحديث الخدمة' : 'حفظ الخدمة'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
