const skillCards = [
  {
    title: 'Languages & Frontend',
    skills: [
      { name: 'React.js', percentage: 90 },
      { name: 'JavaScript', percentage: 90 },
      { name: 'Tailwind CSS', percentage: 85 },
      { name: 'React Router', percentage: 85 },
      { name: 'HTML5', percentage: 95 },
      { name: 'CSS3', percentage: 95 },
      { name: 'Responsive Design', percentage: 90 },
      { name: 'Python', percentage: 75 },
      { name: 'SQL', percentage: 80 },
      { name: 'Axios', percentage: 80 },
    ],
  },
  {
    title: 'Backend & Databases',
    skills: [
      { name: 'Node.js', percentage: 85 },
      { name: 'Express.js', percentage: 85 },
      { name: 'MongoDB', percentage: 80 },
      { name: 'RESTful APIs', percentage: 90 },
      { name: 'JWT Authentication', percentage: 80 },
      { name: 'MySQL', percentage: 85 },
      { name: 'MongoDB Atlas', percentage: 80 },
      { name: 'bcrypt.js', percentage: 80 },
    ],
  },
  {
    title: 'Tools & Core Concepts',
    skills: [
      { name: 'Git & GitHub', percentage: 90 },
      { name: 'Postman', percentage: 85 },
      { name: 'VS Code', percentage: 90 },
      { name: 'Vercel', percentage: 85 },
      { name: 'Cloudinary', percentage: 80 },
      { name: 'AWS', percentage: 75 },
      { name: 'MVC', percentage: 85 },
      { name: 'CRUD', percentage: 90 },
      { name: 'SDLC', percentage: 80 },
    ],
  },
]

function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-28 bg-slate-50 px-4 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px]">
        <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="mb-3 text-xs font-semibold tracking-[0.24em] text-sky-700 uppercase">Technical toolkit</p>
          <h2 className="text-3xl font-semibold tracking-[-0.045em] text-slate-900 sm:text-4xl">
            Skills &amp; Expertise
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
            A practical full-stack toolkit for building reliable, user-focused web applications.
          </p>
        </header>

        <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-7">
          {skillCards.map(({ title, skills }) => (
            <article key={title} className="h-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-7">
              <h3 className="mb-5 text-base font-semibold tracking-[-0.01em] text-slate-900 sm:text-lg">
                {title}
              </h3>
              <ul className="divide-y divide-slate-100">
                {skills.map(({ name, percentage }) => (
                  <li key={name} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                    <span className="text-sm font-medium text-slate-700">{name}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[0.68rem] font-semibold text-slate-500">
                      {percentage}%
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
