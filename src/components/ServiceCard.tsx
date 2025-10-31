import { Link } from 'react-router-dom'
import { ExternalLink, LucideIcon } from 'lucide-react'
import { Service } from '@/lib/supabase'

interface ServiceCardProps {
  service: Service
  icon?: LucideIcon
}

export default function ServiceCard({ service, icon: Icon }: ServiceCardProps) {
  return (
    <div className="group rounded-lg bg-surface p-8 shadow-card transition-all duration-base hover:-translate-y-1 hover:scale-[1.01] hover:shadow-card-hover">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          {Icon && <Icon className="h-6 w-6 text-primary-500" />}
          <h3 className="text-h3 font-semibold text-neutral-900">{service.name}</h3>
        </div>
        {service.has_special_cases && (
          <span className="rounded-full bg-info-50 px-3 py-1 text-caption font-medium text-info-500">
            حالات خاصة
          </span>
        )}
      </div>

      <p className="mb-6 text-body text-neutral-700">{service.description}</p>

      {service.has_special_cases && service.special_cases_data?.cases && (
        <div className="mb-4 space-y-2">
          <p className="text-body-small font-medium text-neutral-900">الحالات المتاحة:</p>
          <div className="flex flex-wrap gap-2">
            {service.special_cases_data.cases.map((specialCase, index) => (
              <span
                key={index}
                className="rounded-full bg-neutral-100 px-3 py-1 text-caption text-neutral-700"
              >
                {specialCase.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Link
          to={`/service/${service.id}`}
          className="text-body font-medium text-primary-700 transition-colors hover:text-primary-500 hover:underline"
        >
          عرض التفاصيل
        </Link>
        <a
          href={service.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md bg-primary-500 px-6 py-3 text-body font-semibold text-white transition-all duration-fast hover:-translate-y-0.5 hover:scale-105 hover:bg-primary-600"
        >
          الوصول للخدمة
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
