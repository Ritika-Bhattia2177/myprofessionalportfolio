import { ArrowUpRight, GitBranch, Globe, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'

function ProjectPreview({ title, image }) {
  const hasImage = Boolean(image)

  return (
    <div className="project-preview overflow-hidden rounded-[20px] border border-slate-200 bg-slate-50 p-3">
      <div className="rounded-[16px] border border-slate-200 bg-white p-3">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" aria-hidden="true" />
        </div>

        <div className="rounded-[12px] border border-dashed border-slate-300 bg-slate-50 p-4">
          {hasImage ? (
            <div className="flex h-40 items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-500">
              {title}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[0.62rem] font-semibold tracking-[0.18em] text-slate-500 uppercase">
                <span>Project Preview</span>
                <span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[0.6rem] text-slate-600">
                  {title}
                </span>
              </div>
              <div className="h-2.5 w-3/4 rounded-full bg-slate-200" aria-hidden="true" />
              <div className="h-2.5 w-2/3 rounded-full bg-slate-200" aria-hidden="true" />
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="h-14 rounded-lg bg-slate-200" aria-hidden="true" />
                <div className="h-14 rounded-lg bg-slate-200" aria-hidden="true" />
                <div className="h-14 rounded-lg bg-slate-200" aria-hidden="true" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ProjectDetailsModal({ project, onClose }) {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6 backdrop-blur-[1px]"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-[0_30px_70px_rgba(15,23,42,0.18)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-sky-700 uppercase">Project Details</p>
            <h3 id="project-modal-title" className="mt-1 text-xl font-semibold tracking-[-0.04em] text-slate-900">
              {project.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            aria-label="Close project details"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-6 px-5 py-5 sm:px-6">
          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-slate-500 uppercase">Project Type</p>
            <p className="mt-2 text-base text-slate-700">{project.type}</p>
          </div>

          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-slate-500 uppercase">Overview</p>
            <p className="mt-2 text-base leading-7 text-slate-700">{project.overview}</p>
          </div>

          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-slate-500 uppercase">Key Features</p>
            <ul className="mt-2 space-y-2 text-base leading-7 text-slate-700">
              {project.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-600" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-slate-500 uppercase">Technology Stack</p>
            <p className="mt-2 text-base leading-7 text-slate-700">{project.technologies.join(' · ')}</p>
          </div>

          {project.status && (
            <div>
              <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-slate-500 uppercase">Status</p>
              <p className="mt-2 text-base text-slate-700">{project.status}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <Globe size={15} aria-hidden="true" />
                Live Demo
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400"
              >
                <Globe size={15} aria-hidden="true" />
                Live Demo
              </button>
            )}

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <GitBranch size={15} aria-hidden="true" />
                GitHub
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400"
              >
                <GitBranch size={15} aria-hidden="true" />
                GitHub
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectsSection() {
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const activeProject = projects.find((project) => project.id === activeProjectId) || projects[0]

  return (
    <section id="projects" className="scroll-mt-28 bg-slate-100/70 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-sky-700 uppercase">Projects</p>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-4xl">Selected work</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Applications I've built across e-commerce, healthcare management, and travel planning.
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-wrap gap-2 rounded-full border border-slate-200 bg-slate-50 p-1">
            {projects.map((project) => {
              const isActive = activeProjectId === project.id
              const label =
                project.name === 'Rehabilitation Management Platform'
                  ? 'Rehabilitation'
                  : project.name

              return (
                <button
                  key={project.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 sm:px-4 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  onClick={() => setActiveProjectId(project.id)}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <div
            key={activeProject.id}
            className="project-showcase grid gap-6 rounded-[20px] border border-slate-200 bg-slate-50 p-4 transition-all duration-200 animate-[fadeIn_0.2s_ease-out] lg:grid-cols-[1.15fr_0.85fr] lg:p-6"
          >
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[0.66rem] font-semibold tracking-[0.18em] text-sky-700 uppercase">
                    {activeProject.category}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-[2rem]">
                    {activeProject.name}
                  </h3>
                </div>

                {activeProject.status && (
                  <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[0.62rem] font-medium tracking-[0.14em] text-slate-600 uppercase">
                    {activeProject.status}
                  </span>
                )}
              </div>

              <p className="text-base leading-7 text-slate-700">{activeProject.description}</p>

              <div className="space-y-3">
                <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-slate-500 uppercase">Key Features</p>
                <ul className="space-y-2 text-sm leading-6 text-slate-700">
                  {activeProject.features.slice(0, 5).map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-sky-600" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-slate-500 uppercase">Technology Stack</p>
                <p className="text-base leading-7 text-slate-700">
                  {activeProject.technologies.join(' · ')}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <ArrowUpRight size={15} aria-hidden="true" />
                  About Project
                </button>

                {activeProject.liveUrl ? (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <Globe size={15} aria-hidden="true" />
                    Live Demo
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400"
                  >
                    <Globe size={15} aria-hidden="true" />
                    Live Demo
                  </button>
                )}

                {activeProject.githubUrl ? (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <GitBranch size={15} aria-hidden="true" />
                    GitHub
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400"
                  >
                    <GitBranch size={15} aria-hidden="true" />
                    GitHub
                  </button>
                )}
              </div>
            </div>

            <div className="project-preview-column flex items-start justify-center">
              <ProjectPreview title={activeProject.name} image={activeProject.image} />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <ProjectDetailsModal project={activeProject} onClose={() => setIsModalOpen(false)} />}
    </section>
  )
}

export default ProjectsSection
