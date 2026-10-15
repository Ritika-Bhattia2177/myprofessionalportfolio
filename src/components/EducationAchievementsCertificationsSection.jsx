import { Award, BookOpenText, CheckCircle2, ShieldCheck } from 'lucide-react'
import { achievements, certifications, education } from '../data/education'

function EducationTimelineItem({ item, isPrimary = false }) {
  return (
    <div className="relative pl-6">
      <span
        className={`absolute left-0 top-1.5 block h-2.5 w-2.5 rounded-full border-2 border-white bg-sky-600 ${
          isPrimary ? 'shadow-[0_0_0_3px_rgba(14,165,233,0.12)]' : ''
        }`}
        aria-hidden="true"
      />

      <div className={`pb-6 ${isPrimary ? 'pb-5' : 'pb-5'}`}>
        <p className="mb-1 text-[0.62rem] font-semibold tracking-[0.18em] text-slate-500 uppercase">
          {isPrimary ? 'Degree' : 'Academic Record'}
        </p>

        <h3 className={`font-semibold tracking-[-0.04em] text-slate-900 ${isPrimary ? 'text-xl' : 'text-lg'}`}>
          {item.title}
        </h3>

        <p className="mt-1 text-base text-slate-700">{item.institution}</p>
        <p className="mt-1 text-sm text-slate-500">{item.period}</p>

        {isPrimary ? (
          <div className="mt-3">
            <p className="text-base font-semibold tracking-[-0.03em] text-slate-900">CGPA {item.result.replace('CGPA: ', '')}</p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-700">{item.result}</p>
        )}
      </div>
    </div>
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
  const isConfigured = !!item.url && item.url !== 'REACT_CERTIFICATE_URL' && item.url !== 'GITHUB_CERTIFICATE_URL' && item.url !== 'VERSION_CONTROL_CERTIFICATE_URL' && item.url !== 'AI_FUNDAMENTALS_CERTIFICATE_URL'

  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 py-2.5 last:border-b-0 last:pb-0">
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
  const primaryEducation = education[0]
  const supportEducation = education.slice(1)

  return (
    <section id="education" className="scroll-mt-28 bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-sky-700 uppercase">Education &amp; Certifications</p>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-4xl">
            Academic foundation with practical learning outcomes.
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Education, hands-on development experience, and certifications that support my software engineering journey.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="relative">
            <div className="absolute left-[0.45rem] top-0 hidden h-full w-px bg-slate-200 md:block" aria-hidden="true" />

            <div className="space-y-2">
              <div className="mb-2">
                <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-slate-500 uppercase">Education</p>
              </div>

              <div className="space-y-1">
                <div className="pl-6">
                  <EducationTimelineItem item={primaryEducation} isPrimary />
                </div>

                {supportEducation.map((item) => (
                  <div key={item.id} className="pl-6">
                    <EducationTimelineItem item={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
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

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-50 text-sky-700">
                  <CheckCircle2 size={15} aria-hidden="true" />
                </span>
                <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-900">Certifications</h3>
              </div>

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
