import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { path: '/', label: 'الرئيسية' },
    { path: '/employment', label: 'التشغيل' },
    { path: '/unemployment', label: 'البطالة' },
    { path: '/justice', label: 'العدلية' },
    { path: '/cnas', label: 'CNAS' },
    { path: '/casnos', label: 'CASNOS' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-surface shadow-sm">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex h-18 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="text-h3 font-bold text-primary-700">
              عتيق
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-body font-medium transition-colors duration-fast hover:text-primary-600 ${
                  location.pathname === link.path
                    ? 'border-b-2 border-primary-700 text-primary-700'
                    : 'text-neutral-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            to="/admin"
            className="hidden rounded-md bg-primary-500 px-6 py-3 text-body font-semibold text-white transition-all duration-fast hover:-translate-y-0.5 hover:scale-105 hover:bg-primary-600 md:block"
          >
            لوحة الإدارة
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md p-2 text-neutral-700 hover:bg-neutral-100 md:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-neutral-200 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-body font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary-700'
                      : 'text-neutral-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md bg-primary-500 px-6 py-3 text-center text-body font-semibold text-white"
              >
                لوحة الإدارة
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
