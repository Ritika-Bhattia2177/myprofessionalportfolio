import { Code2, Target } from 'lucide-react'
import { experience } from '../data/experience'
import { profile } from '../data/profile'

function AboutSection() {
  const internship = experience.find((item) => item.type === 'technical')

  return (
    <section id="about" className="scroll-mt-28 bg-[#f8fafc] px-4 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[640px]">
        <header className="mb-8 text-center sm:mb-10">
          <h2 className="text-3xl font-bold tracking-[-0.045em] text-slate-900 sm:text-4xl">
            About Me
          </h2>
          <span className="mx-auto mt-2 block h-[3px] w-10 rounded-full bg-[#3157e8]" aria-hidden="true" />
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
            Full-stack developer creating modern, scalable web applications.
          </p>
        </header>

        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:p-7">
          <div className="space-y-4 text-sm leading-6 text-slate-700 sm:text-[15px]">
            <p>
              {profile.summary} My internship at <strong className="font-semibold text-slate-900">{internship.organization}</strong> gave me hands-on experience building a rehabilitation management platform for real-world operations.
            </p>
            <p>
              {internship.summary} I designed and implemented 20+ RESTful API endpoints, integrated secure JWT authentication and role-based authorization, and built CRUD functionality following MVC architecture.
            </p>
            <p>
              I also optimized database interactions and responsive user interfaces to improve maintainability and user experience across devices.
            </p>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#3157e8]">
              <Code2 size={14} aria-hidden="true" />
              Core Tech Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {['React.js', 'Node.js', 'Express.js', 'MySQL', 'REST APIs', 'JWT', 'MVC'].map((technology) => (
                <span key={technology} className="rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-semibold text-[#3157e8]">
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 border-l-[3px] border-l-[#3157e8] bg-gradient-to-r from-blue-50/80 to-white p-4">
            <div className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-[#3157e8]">
              <Target size={15} aria-hidden="true" />
              Internship
            </div>
            <p className="text-sm leading-6 text-slate-600">
              {internship.role} · {internship.period} · {internship.location}
              <br />
              {internship.organization}
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default AboutSection
