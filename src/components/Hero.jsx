import { ArrowRight, Download } from 'lucide-react'
import profileImage from '../assets/hero.png'
import { profile } from '../data/profile'

function Hero() {
  const { name, resumeUrl } = profile

  return (
    <main id="home" className="bg-[#dfeaf4] text-slate-900 antialiased scroll-mt-28">
      <section className="mx-auto w-[calc(100%-80px)] max-w-[1500px] px-4 pb-10 pt-8 sm:px-6 lg:px-12 lg:pb-12 lg:pt-12">
        <div className="grid min-h-[calc(100vh-140px)] items-center gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(500px,0.85fr)] lg:gap-8">
          <div className="mx-auto max-w-[680px] text-left lg:mx-0 lg:pl-2">
            <h1 className="text-[clamp(3.2rem,4vw,5.6rem)] font-black leading-[0.96] tracking-[-0.06em] text-slate-900">
              Hi, I&apos;m <span className="text-[#2d5ae7]">{name}</span>
              <span className="mt-2 block">a Full Stack</span>
              <span className="mt-1 block">Developer.</span>
            </h1>

            <p className="mt-7 max-w-[680px] text-[1.08rem] leading-[1.75] text-slate-700 sm:text-[1.2rem]">
              I specialize in building scalable, user-focused web applications using the MERN stack.
            </p>

            <p className="mt-4 max-w-[680px] text-[1rem] leading-[1.8] text-slate-700 sm:text-[1.08rem]">
              Turning clean code into impactful products that empower users and drive results.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#projects"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-[#3d5fe8] px-6 text-base font-semibold text-white shadow-[0_10px_24px_rgba(61,95,232,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2f52d4] focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-2"
              >
                View Projects
                <ArrowRight size={18} aria-hidden="true" />
              </a>

              <a
                href={resumeUrl}
                download
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-xl border-2 border-[#3d5fe8] bg-white/25 px-6 text-base font-semibold text-[#1f2d67] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/70 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-2"
              >
                <Download size={18} aria-hidden="true" />
                Download Resume
              </a>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center lg:mx-0 lg:justify-center">
            <div className="relative flex h-[320px] w-[320px] items-center justify-center overflow-hidden rounded-full border-[8px] border-[#d6e6ff] bg-gradient-to-br from-[#dfeaf4] via-[#cfe0ff] to-[#b8d3ff] shadow-[0_24px_45px_rgba(61,95,232,0.12)] sm:h-[380px] sm:w-[380px] lg:h-[500px] lg:w-[500px]">
              <img
                src={profileImage}
                alt="Ritika profile"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>

      </section>
    </main>
  )
}

export default Hero
