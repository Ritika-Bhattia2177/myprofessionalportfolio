import { useState } from 'react'
import { ArrowRight, BriefcaseBusiness, GitBranch, Mail, MapPin, Phone } from 'lucide-react'
import { contactProfile } from '../data/contact'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function ContactSection() {
  const { name, email, phone, location, resumeUrl, githubUrl, linkedinUrl } = contactProfile
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [statusMessage, setStatusMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const nextErrors = {}

    if (!form.name.trim()) {
      nextErrors.name = 'Full name is required.'
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!form.message.trim()) {
      nextErrors.message = 'Message is required.'
    } else if (form.message.trim().length < 10) {
      nextErrors.message = 'Message should be at least 10 characters long.'
    }

    return nextErrors
  }

  const handleChange = (event) => {
    const { name: fieldName, value } = event.target
    setForm((current) => ({ ...current, [fieldName]: value }))

    if (errors[fieldName]) {
      setErrors((current) => ({ ...current, [fieldName]: '' }))
    }

    if (statusMessage) {
      setStatusMessage('')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    const subject = form.subject?.trim() || 'Portfolio enquiry'
    const body = encodeURIComponent(
      `Hi Ritika,\n\n${form.message.trim()}\n\nFrom: ${form.name.trim()}\nEmail: ${form.email.trim()}`
    )

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`

    setTimeout(() => {
      setIsSubmitting(false)
      setStatusMessage('Your email client will open to complete the message.')
      setForm(initialForm)
    }, 300)
  }

  const contactItems = [
    {
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      icon: Mail,
    },
    {
      label: 'Phone',
      value: phone,
      href: `tel:+918091451830`,
      icon: Phone,
    },
    {
      label: 'Location',
      value: location,
      href: null,
      icon: MapPin,
    },
  ]

  return (
    <section id="contact" className="scroll-mt-28 bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-200 pt-8 sm:pt-10">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-sky-700 uppercase">Let’s Connect</p>
            <h2 className="text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-4xl">
              Have an opportunity or project in mind?
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              I’m open to discussing software development opportunities, internships, projects, and
              professional collaborations.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              Email Me
              <ArrowRight size={15} aria-hidden="true" />
            </a>

            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                View Resume
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center justify-center rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400"
              >
                View Resume
              </button>
            )}
          </div>

          <div className="mt-10 border-t border-slate-200 pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              {contactItems.map(({ label, value, href, icon: Icon }) => (
                <div key={label} className="min-w-0">
                  <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-slate-500 uppercase">{label}</p>
                  <div className="mt-2 flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-700">
                      <Icon size={14} aria-hidden="true" />
                    </span>
                    {href ? (
                      <a href={href} className="text-sm leading-6 text-slate-700 hover:text-slate-900">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm leading-6 text-slate-700">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              {githubUrl ? (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
                >
                  <GitBranch size={15} aria-hidden="true" />
                  GitHub
                </a>
              ) : null}

              {linkedinUrl ? (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
                >
                  <BriefcaseBusiness size={15} aria-hidden="true" />
                  LinkedIn
                </a>
              ) : null}
            </div>
          </div>

          <div className="mt-10 max-w-3xl border-t border-slate-200 pt-6">
            <div className="mb-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">Send a Message</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">Let’s discuss your next opportunity.</h3>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-700">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              {statusMessage && (
                <p className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-700">
                  {statusMessage}
                </p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Preparing...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
