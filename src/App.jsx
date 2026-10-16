import { useEffect, useRef, useState } from 'react'
import { ChevronUp, Download, Menu, Moon, Sun, X } from 'lucide-react'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ExperienceSection from './components/ExperienceSection'
import EducationAchievementsCertificationsSection from './components/EducationAchievementsCertificationsSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
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
  const pointerDotRef = useRef(null)
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    if (!pointerQuery.matches) {
      return undefined
    }

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const dot = { ...pointer }
    let frameId

    const handlePointerMove = (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }

    const animateDot = () => {
      dot.x += (pointer.x - dot.x) * 0.18
      dot.y += (pointer.y - dot.y) * 0.18
      if (pointerDotRef.current) {
        pointerDotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`
      }
      frameId = window.requestAnimationFrame(animateDot)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    frameId = window.requestAnimationFrame(animateDot)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.cancelAnimationFrame(frameId)
    }
  }, [])

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

  const toggleTheme = () => setTheme((current) => (current === 'light' ? 'dark' : 'light'))

  return (
    <>
      <span ref={pointerDotRef} className="pointer-dot" aria-hidden="true" />
      <div className="site-shell">
      <header className="site-header sticky top-0 z-50 border-b border-slate-200/90 bg-white">
        <nav aria-label="Main navigation" className="mx-auto flex h-[68px] w-[calc(100%-40px)] max-w-[1136px] items-center justify-between sm:w-[calc(100%-64px)] lg:w-[calc(100%-80px)]">
          <a href="#home" className="site-brand shrink-0 text-[1.45rem] font-extrabold tracking-[-0.055em] focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-white">
            {profile.name}
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            <div className="flex items-center gap-6">{renderNavLinks()}</div>
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
            </button>
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

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={17} aria-hidden="true" /> : <Sun size={17} aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2.5 text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
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
      <ProjectsSection />
      <EducationAchievementsCertificationsSection />
      <ContactSection />

      <footer className="site-footer border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p><span className="font-semibold text-slate-700">{profile.name}</span> · Full-Stack Developer</p>
          <p>© {new Date().getFullYear()} {profile.name}. Built with React.</p>
        </div>
      </footer>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="back-to-top fixed bottom-5 right-5 z-40 inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-slate-700 shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2"
        aria-label="Back to top"
      >
        <ChevronUp size={14} aria-hidden="true" />
        <span className="back-to-top__label">Top</span>
      </button>
      </div>
    </>
  )
}

export default App
