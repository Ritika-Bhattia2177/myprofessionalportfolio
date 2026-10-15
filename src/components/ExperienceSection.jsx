import { ArrowUpRight, CalendarRange, MapPin } from 'lucide-react'
import { experience } from '../data/experience'

const scopeLabels = [
  'Rehabilitation Platform',
  'RESTful API Development',
  'Authentication & Authorization',
  'Centre & Treatment Management',
  'Blogs & User Management',
  'MVC Architecture',
  'Database Optimisation',
  'Responsive Interfaces',
]

function ExperienceCard({ item, index }) {
  const isTechnical = item.type === 'technical'
  const scopes = isTechnical ? scopeLabels : item.skills

  return (
    <article className="experience-card">
      <div className="experience-card__main">
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="section-kicker text-sky-700">
            {String(index + 1).padStart(2, '0')} — {isTechnical ? 'Web Development Internship' : 'Campus Operations & Leadership'}
          </p>
          <span className="hidden rounded-full border border-slate-200 bg-white px-3 py-1 text-[0.62rem] font-semibold tracking-[0.16em] text-slate-500 uppercase sm:inline-flex">
            {item.period}
          </span>
        </div>

        <h3 className="text-2xl font-semibold tracking-[-0.045em] text-slate-900 sm:text-[1.75rem]">{item.role}</h3>
        <p className="mt-2 text-sm font-medium text-sky-600 sm:text-base">{item.organization}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarRange size={14} aria-hidden="true" />
            {item.period}
          </span>
          <span className="text-slate-300">·</span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} aria-hidden="true" />
            {item.location}
          </span>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600 sm:text-[0.95rem]">{item.summary}</p>

        {isTechnical && (
          <div className="mt-5 flex items-baseline gap-3 border-y border-slate-200 py-4">
            <span className="text-3xl font-semibold tracking-[-0.06em] text-slate-900">20+</span>
            <span className="text-sm font-medium text-slate-600">RESTful API endpoints</span>
          </div>
        )}

        <div className="mt-5 border-t border-slate-200 pt-4">
          <p className="section-kicker mb-3 text-sky-600">
            {isTechnical ? 'Key Contributions' : 'Key Responsibilities'}
          </p>
          <ul className="space-y-2.5">
            {item.contributions.map((point) => (
              <li key={point} className="flex gap-2.5 text-xs leading-5 text-slate-600 sm:text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {(isTechnical ? item.technologies : item.skills).map((technology) => (
            <span key={technology} className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-[0.68rem] font-medium text-slate-600">
              {technology}
            </span>
          ))}
        </div>
      </div>

      <aside className="experience-card__scope" aria-label={`${item.role} scope`}>
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="section-kicker text-sky-600">{isTechnical ? 'Architecture & Scope' : 'Leadership & Scope'}</p>
          <span className="rounded border border-slate-200 bg-white px-2 py-1 text-[0.6rem] font-medium text-slate-500">
            {scopes.length} focus areas
          </span>
        </div>
        <div className="space-y-1.5">
          {scopes.map((scope, scopeIndex) => (
            <div key={scope} className="rounded border border-slate-200 bg-white px-2.5 py-2">
              <p className="text-[0.68rem] font-semibold text-slate-700">
                <span className="mr-1.5 text-sky-600">{scopeIndex + 1}.</span>
                {scope}
              </p>
              <p className="mt-0.5 text-[0.64rem] leading-4 text-slate-500">
                {isTechnical ? item.contributions[scopeIndex % item.contributions.length] : item.contributions[scopeIndex % item.contributions.length]}
              </p>
            </div>
          ))}
        </div>
        {isTechnical && (
          <a href="#contact" className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-sky-600">
            Discuss my experience <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        )}
      </aside>
    </article>
  )
}

function ExperienceSection() {
  return (
    <section id="experience" className="experience-section scroll-mt-28 py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl sm:mb-10">
          <p className="section-kicker mb-3 text-sky-700">Work Experience</p>
          <h2 className="text-3xl font-semibold tracking-[-0.055em] text-slate-900 sm:text-4xl">
            Building real-world web applications through hands-on development.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Full-stack development and campus operations experience built through hands-on technical and leadership responsibilities.
          </p>
        </div>

        <div className="space-y-7">
          {experience.map((item, index) => (
            <ExperienceCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
