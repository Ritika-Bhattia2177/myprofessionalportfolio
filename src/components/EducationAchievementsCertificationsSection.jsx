import { Award, BookOpenText, BriefcaseBusiness, CheckCircle2, ShieldCheck } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { achievements, certifications, education } from '../data/education'
import { experience } from '../data/experience'

function EducationTimelineItem({ item, isPrimary = false, isExperience = false, index, activeIndex }) {
  const isActive = index <= activeIndex

  return (
    <article className={`education-timeline__item relative pl-6 ${isActive ? 'is-active' : ''}`}>
      <span
        className={`education-timeline__dot absolute left-0 top-1.5 block h-2.5 w-2.5 rounded-full border-2 border-white ${isActive ? 'bg-sky-600' : 'bg-slate-300'} ${isPrimary ? 'shadow-[0_0_0_3px_rgba(14,165,233,0.12)]' : ''}`}
        aria-hidden="true"
      />

      <div className="pb-5">
        <p className="mb-1 text-[0.62rem] font-semibold tracking-[0.18em] text-slate-500 uppercase">
          {isExperience ? 'Professional Experience' : isPrimary ? 'Degree' : 'Academic Record'}
        </p>

        <h3 className={`font-semibold tracking-[-0.04em] text-slate-900 ${isPrimary ? 'text-xl' : 'text-lg'}`}>
          {isExperience ? item.role : item.title}
        </h3>

        <p className="mt-1 text-base text-slate-700">{isExperience ? item.organization : item.institution}</p>
        <p className="mt-1 text-sm text-slate-500">{item.period}</p>

        {isExperience ? (
          <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
        ) : isPrimary ? (
          <div className="mt-3">
            <p className="text-base font-semibold tracking-[-0.03em] text-slate-900">CGPA {item.result.replace('CGPA: ', '')}</p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-700">{item.result}</p>
        )}
      </div>
    </article>
  )
}

function AchievementItem({ item }) {
  return (
    <div className="flex gap-3 border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-700">
        <Award size={14} aria-hidden="true" />
      </span>
      <div>
        <h3 className="text-base font-semibold tracking-[-0.03em] text-slate-900">{item.title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
      </div>
    </div>
  )
}

function CertificationLink({ item }) {
  const isConfigured = !!item.url && !item.url.endsWith('_CERTIFICATE_URL')

  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 py-3 last:border-b-0 last:pb-0">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-700">
          <ShieldCheck size={14} aria-hidden="true" />
        </span>
        <span className="text-sm font-medium text-slate-700">{item.name}</span>
      </div>

      {isConfigured ? (
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold tracking-[0.12em] text-sky-700 uppercase transition-colors hover:text-sky-800"
        >
          View Certificate
          <BookOpenText size={12} aria-hidden="true" />
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="cursor-not-allowed text-xs font-semibold tracking-[0.12em] text-slate-400 uppercase"
        >
          View Certificate
        </button>
      )}
    </div>
  )
}

function EducationAchievementsCertificationsSection() {
  const timelineRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const primaryEducation = education[0]
  const supportEducation = education.slice(1)
  const internship = experience.find((item) => item.id === 'web-development-intern')
  const timelineItems = [primaryEducation, ...supportEducation, ...(internship ? [internship] : [])]

  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return undefined

    const items = Array.from(timeline.querySelectorAll('.education-timeline__item'))
    const dots = items.map((item) => item.querySelector('.education-timeline__dot'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const alignTrack = () => {
      const timelineBounds = timeline.getBoundingClientRect()
      const firstDotBounds = dots[0]?.getBoundingClientRect()
      if (!firstDotBounds) return
      const centerX = firstDotBounds.left + firstDotBounds.width / 2 - timelineBounds.left
      timeline.style.setProperty('--timeline-x', `${centerX}px`)
      timeline.style.setProperty('--timeline-top', `${firstDotBounds.top + firstDotBounds.height / 2 - timelineBounds.top}px`)
      const lastDotBounds = dots[dots.length - 1]?.getBoundingClientRect()
      if (lastDotBounds) {
        timeline.style.setProperty('--timeline-bottom', `${timelineBounds.bottom - (lastDotBounds.top + lastDotBounds.height / 2)}px`)
      }
    }

    if (reducedMotion || !('IntersectionObserver' in window)) {
      setActiveIndex(items.length - 1)
      timeline.style.setProperty('--timeline-progress', '9999px')
      return undefined
    }

    let frame = 0
    const updateProgress = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        alignTrack()
        const viewportMarker = window.innerHeight * 0.72
        const firstDot = dots[0]?.getBoundingClientRect()
        const lastDot = dots[dots.length - 1]?.getBoundingClientRect()
        if (!firstDot || !lastDot) return
        const firstDotCenter = firstDot.top + firstDot.height / 2
        const lastDotCenter = lastDot.top + lastDot.height / 2
        const distance = Math.max(0, Math.min(lastDotCenter - firstDotCenter, viewportMarker - firstDotCenter))
        timeline.style.setProperty('--timeline-progress', `${distance}px`)
      })
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = items.indexOf(entry.target)
        if (index >= 0) setActiveIndex((current) => Math.max(current, index))
      })
    }, { rootMargin: '0px 0px -35% 0px', threshold: 0.25 })

    items.forEach((item) => observer.observe(item))
    alignTrack()
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    const resizeObserver = new ResizeObserver(updateProgress)
    resizeObserver.observe(timeline)
    dots.forEach((dot) => dot && resizeObserver.observe(dot))

    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <section id="education" className="education-section scroll-mt-28 bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-sky-700 uppercase">Education &amp; Growth</p>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-4xl">
            Academic foundation with practical learning outcomes.
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Education, hands-on development experience, and certifications that support my software engineering journey.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div ref={timelineRef} className="education-timeline relative rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-7">
            <div className="education-timeline__track" aria-hidden="true" />
            <div className="education-timeline__progress" aria-hidden="true" />

            <div className="relative z-[1] space-y-2">
              <div className="mb-2">
                <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-slate-500 uppercase">Education &amp; Experience</p>
              </div>

              <div className="space-y-1">
                {timelineItems.map((item, index) => {
                  const isExperience = item.id === 'web-development-intern'
                  return (
                    <div key={item.id} className="pl-6">
                      <EducationTimelineItem
                        item={item}
                        isPrimary={index === 0}
                        isExperience={isExperience}
                        index={index}
                        activeIndex={activeIndex}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-sky-700">
                  <Award size={15} aria-hidden="true" />
                </span>
                <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-900">Achievements &amp; Highlights</h3>
              </div>

              <div className="space-y-4">
                {achievements.map((item) => (
                  <AchievementItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div id="certifications" className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="mb-2 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-sky-700">
                  <CheckCircle2 size={15} aria-hidden="true" />
                </span>
                <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-900">Certifications</h3>
              </div>

              <p className="mb-3 pl-11 text-sm leading-6 text-slate-600">Courses and credentials earned through focused, hands-on learning.</p>
              <div className="space-y-0">
                {certifications.map((item) => (
                  <CertificationLink key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationAchievementsCertificationsSection
