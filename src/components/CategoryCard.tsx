import { Link } from 'react-router-dom'
import { LucideIcon, ArrowLeft } from 'lucide-react'

interface CategoryCardProps {
  title: string
  description: string
  icon: LucideIcon
  serviceCount: number
  path: string
}

export default function CategoryCard({
  title,
  description,
  icon: Icon,
  serviceCount,
  path,
}: CategoryCardProps) {
  return (
    <Link
      to={path}
      className="group flex flex-col items-center rounded-lg bg-surface p-10 text-center shadow-card transition-all duration-base hover:-translate-y-1 hover:scale-[1.01] hover:bg-surface-hover hover:shadow-card-hover"
    >
      <Icon className="mb-4 h-12 w-12 text-primary-500" />
      <h3 className="mb-2 text-h3 font-semibold text-neutral-900">{title}</h3>
      <p className="mb-4 text-body-small text-neutral-700">{description}</p>
      <span className="mb-4 rounded-full bg-neutral-200 px-4 py-1 text-caption text-neutral-700">
        {serviceCount} {serviceCount === 1 ? 'خدمة' : 'خدمات'}
      </span>
      <div className="flex items-center gap-2 text-body font-medium text-primary-700 transition-colors group-hover:text-primary-500">
        استكشف الخدمات
        <ArrowLeft className="h-4 w-4" />
      </div>
    </Link>
  )
}
