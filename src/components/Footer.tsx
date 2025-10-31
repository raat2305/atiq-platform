import { Link } from 'react-router-dom'

export default function Footer() {
  const footerSections = [
    {
      title: 'عن المنصة',
      links: [
        { label: 'من نحن', path: '/about' },
        { label: 'اتصل بنا', path: '/contact' },
      ],
    },
    {
      title: 'الأقسام',
      links: [
        { label: 'التشغيل', path: '/employment' },
        { label: 'البطالة', path: '/unemployment' },
        { label: 'العدلية', path: '/justice' },
      ],
    },
    {
      title: 'المساعدة',
      links: [
        { label: 'الأسئلة الشائعة', path: '/faq' },
        { label: 'دليل الاستخدام', path: '/guide' },
      ],
    },
    {
      title: 'تواصل معنا',
      links: [
        { label: 'support@atiq.dz', path: 'mailto:support@atiq.dz' },
      ],
    },
  ]

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-6 py-12 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-h3 font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-body-small text-neutral-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-neutral-700 pt-8 text-center">
          <p className="text-body-small text-neutral-400">
            © 2025 عتيق للخدمات الرقمية. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}
