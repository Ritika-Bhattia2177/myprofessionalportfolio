import { useRef } from 'react'
import { ArrowRight, Download, Layers3, Database, Braces } from 'lucide-react'
import profileImage from '../assets/ritika.jpeg'
import { profile } from '../data/profile'

function Hero() {
  const visualRef = useRef(null)
  const displayName = profile.name.charAt(0) + profile.name.slice(1).toLowerCase()
  const technologies = profile.technologies.slice(0, 4)

  const handlePointerMove = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    visualRef.current?.style.setProperty('--tilt-x', `${y * -3}deg`)
    visualRef.current?.style.setProperty('--tilt-y', `${x * 3}deg`)
    visualRef.current?.style.setProperty('--shift-x', `${x * 5}px`)
    visualRef.current?.style.setProperty('--shift-y', `${y * 5}px`)
  }

  const resetPointer = () => {
    visualRef.current?.style.setProperty('--tilt-x', '0deg')
    visualRef.current?.style.setProperty('--tilt-y', '0deg')
    visualRef.current?.style.setProperty('--shift-x', '0px')
    visualRef.current?.style.setProperty('--shift-y', '0px')
  }

  return (
    <main id="home" className="hero-shell scroll-mt-20">
      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-eyebrow"><span aria-hidden="true" />{profile.eyebrow}</p>
            <h1 id="hero-heading">Hi, I&apos;m <span>{displayName}.</span><strong>{profile.role}</strong></h1>
            <p className="hero-description">I build user-focused web applications with modern frontend and backend technologies, from thoughtful interfaces to reliable, data-driven features.</p>

            <div className="hero-built-with" aria-label={`Building with ${technologies.join(', ')}`}>
              <span className="hero-built-label">BUILDING WITH</span>
              <div className="hero-tech-list">
                {technologies.map((technology) => <span key={technology}>{technology}</span>)}
              </div>
            </div>

            <div className="hero-actions">
              <a href="#projects" className="hero-primary-action">View Projects <ArrowRight size={17} aria-hidden="true" /></a>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="hero-secondary-action"><Download size={16} aria-hidden="true" />Download Resume</a>
            </div>
          </div>

          <div className="hero-visual-wrap" onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
            <div className="hero-visual" ref={visualRef}>
              <div className="hero-visual-orbit" />
              <div className="hero-portrait-card">
                <img src={profileImage} alt="Ritika, Full-Stack Developer" fetchPriority="high" />
                <div className="hero-portrait-caption"><span className="hero-status-dot" />Building for the web</div>
              </div>
              <div className="hero-code-card" aria-hidden="true">
                <div className="hero-code-heading"><span /><span /><span /><b>app / stack</b></div>
                <div className="hero-code-body">
                  <span className="code-line-number">01</span><span className="code-token">const</span><span> product = {'{'}</span>
                  <span className="code-line-number">02</span><span className="code-indent code-key">frontend:</span><span className="code-value"> React</span>
                  <span className="code-line-number">03</span><span className="code-indent code-key">backend:</span><span className="code-value"> Node.js</span>
                  <span className="code-line-number">04</span><span className="code-indent code-key">data:</span><span className="code-value"> MongoDB</span>
                  <span className="code-line-number">05</span><span>{'}'}</span>
                </div>
              </div>
              <div className="hero-layer-label layer-frontend"><Braces size={14} aria-hidden="true" /><span>Frontend</span></div>
              <div className="hero-layer-label layer-backend"><Layers3 size={14} aria-hidden="true" /><span>Backend</span></div>
              <div className="hero-layer-label layer-database"><Database size={14} aria-hidden="true" /><span>Database</span></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Hero
