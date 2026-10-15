import { useEffect, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ExperienceSection from './components/ExperienceSection'
import EducationAchievementsCertificationsSection from './components/EducationAchievementsCertificationsSection'
import { contactProfile } from './data/contact'
import { profile } from './data/profile'
import './App.css'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

const RESUME_URL = contactProfile.resumeUrl

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean)

    if (!sections.length) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.15, 0.3, 0.55],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const handleOutsideClick = (event) => {
      const menu = document.getElementById('mobile-menu')
      if (menu && !menu.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  const renderNavLinks = (mobile = false) =>
    navItems.map(({ label, href }) => (
      <a
        key={label}
        href={href}
        onClick={() => setIsMenuOpen(false)}
        className={`group relative inline-flex items-center text-[15px] font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-white ${
          activeSection === href.replace('#', '')
            ? 'text-slate-900'
            : 'text-slate-600 hover:text-slate-900'
          } ${mobile ? 'block rounded-xl px-3 py-2 text-base' : 'px-0 py-2'} `}
      >
        <span className="relative">
          {label}
          <span className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-sky-600 transition-all duration-200 ${activeSection === href.replace('#', '') ? 'w-full' : 'w-0 group-hover:w-full'}`} aria-hidden="true" />
        </span>
      </a>
    ))

  return (
    <>
      <div className="bg-[#dfeaf4]">
      <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white">
        <nav aria-label="Main navigation" className="mx-auto flex h-[68px] w-[calc(100%-40px)] max-w-[1136px] items-center justify-between sm:w-[calc(100%-64px)] lg:w-[calc(100%-80px)]">
          <a href="#home" className="shrink-0 text-[1.45rem] font-extrabold tracking-[-0.055em] text-[#3157e8] focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-white">
            {profile.name}
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            <div className="flex items-center gap-6">{renderNavLinks()}</div>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-[13px] font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
            >
              <Download size={15} aria-hidden="true" />
              Resume
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2.5 text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 lg:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </nav>

        {isMenuOpen && (
          <div id="mobile-menu" className="mx-auto w-[calc(100%-40px)] max-w-[1136px] border-t border-slate-200 bg-white px-4 py-3 lg:hidden" role="menu" aria-label="Mobile navigation">
            <div className="space-y-1">{renderNavLinks(true)}</div>
            <div className="mt-4 border-t border-slate-200 pt-3">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-white"
              >
                <Download size={15} aria-hidden="true" />
                Resume
              </a>
            </div>
          </div>
        )}
      </header>

      <Hero />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationAchievementsCertificationsSection />

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-3 text-slate-700 shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2"
        aria-label="Back to top"
      >
        <span className="text-xs font-semibold tracking-[0.18em] uppercase">Top</span>
      </button>
      </div>
    </>
  )
}

export default App
