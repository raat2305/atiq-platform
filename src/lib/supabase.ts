// مصفوفة الخدمات المحلية
let servicesCache: Service[] | null = null;

// تحميل الخدمات من الملف المحلي
async function loadServicesFromFile(): Promise<Service[]> {
  if (servicesCache) {
    return servicesCache;
  }

  try {
    const response = await fetch('/services.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    servicesCache = await response.json();
    return servicesCache;
  } catch (error) {
    console.error('خطأ في تحميل الخدمات:', error);
    return [];
  }
}

// Types (نفس الواجهة الموجودة مسبقاً)
export interface Service {
  id: string
  name: string
  description: string
  category: string
  link: string
  has_special_cases: boolean
  special_cases_data: {
    cases?: Array<{
      name: string
      description: string
    }>
  } | null
  created_at: string
  updated_at: string
}

// دالة جلب جميع الخدمات
export async function getAllServices(): Promise<Service[]> {
  return await loadServicesFromFile();
}

// دالة جلب الخدمات حسب الفئة
export async function getServicesByCategory(category: string): Promise<Service[]> {
  const services = await loadServicesFromFile();
  return services.filter(service => service.category === category);
}

// دالة البحث في الخدمات
export async function searchServices(query: string): Promise<Service[]> {
  const services = await loadServicesFromFile();
  const searchTerm = query.toLowerCase();
  
  return services.filter(service => 
    service.name.toLowerCase().includes(searchTerm) ||
    service.description.toLowerCase().includes(searchTerm) ||
    service.category.toLowerCase().includes(searchTerm)
  );
}

// دالة جلب خدمة محددة
export async function getServiceById(id: string): Promise<Service | null> {
  const services = await loadServicesFromFile();
  return services.find(service => service.id === id) || null;
}

// الدوال المؤقتة للوظائف غير المستخدمة (للحفاظ على التوافق مع الكود الحالي)
export async function createService(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service | null> {
  console.warn('وظيفة createService غير متاحة - تم تعطيل Supabase للانتقال إلى GitHub Pages');
  return null;
}

export async function updateService(id: string, updates: Partial<Service>): Promise<Service | null> {
  console.warn('وظيفة updateService غير متاحة - تم تعطيل Supabase للانتقال إلى GitHub Pages');
  return null;
}

export async function deleteService(id: string): Promise<boolean> {
  console.warn('وظيفة deleteService غير متاحة - تم تعطيل Supabase للانتقال إلى GitHub Pages');
  return false;
}