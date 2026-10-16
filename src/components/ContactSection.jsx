import { useForm, ValidationError } from '@formspree/react'
import { ArrowRight, BriefcaseBusiness, GitBranch } from 'lucide-react'
import { contactProfile } from '../data/contact'

function ContactSection() {
  const { email, resumeUrl, githubUrl, linkedinUrl } = contactProfile
  const [state, handleSubmit] = useForm('xrperplo')

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

          <div className="contact-details mt-10">
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

          <div className="contact-lower mt-10 grid items-start gap-8 border-t border-slate-200 pt-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <aside className="contact-aside rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-sky-700 uppercase">Get in touch</p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-slate-900">Have a question or an idea?</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Send a note and I’ll get back to you. You can also reach me directly using the contact details above.
              </p>
              <a href={`mailto:${email}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800">
                {email}<ArrowRight size={14} aria-hidden="true" />
              </a>
            </aside>

            <div className="contact-form-card rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
            <div className="mb-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-slate-500 uppercase">Send a Message</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">Let’s discuss your next opportunity.</h3>
            </div>

            {state.succeeded && (
              <p className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-sm text-emerald-700">
                Thanks for reaching out. Your message has been sent successfully.
              </p>
            )}

            <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
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
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                  />
                  <ValidationError prefix="Subject" field="subject" errors={state.errors} />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    minLength="10"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                {state.errors && (
                  <ValidationError
                    errors={state.errors}
                    className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                  />
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {state.submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
