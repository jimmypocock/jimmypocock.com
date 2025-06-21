'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import './home.css'

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    )

    const sections = document.querySelectorAll('.content-section')
    sections.forEach(section => observer.observe(section))

    return () => {
      sections.forEach(section => observer.unobserve(section))
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 60

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number

      constructor() {
        this.x = Math.random() * (canvas?.width || 1000)
        this.y = Math.random() * (canvas?.height || 1000)
        this.size = Math.random() * 4 + 1.5
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.opacity = Math.random() * 0.6 + 0.3
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (canvas) {
          if (this.x > canvas.width) this.x = 0
          if (this.x < 0) this.x = canvas.width
          if (this.y > canvas.height) this.y = 0
          if (this.y < 0) this.y = canvas.height
        }
      }

      draw() {
        if (!ctx) return
        
        ctx.fillStyle = `rgba(78, 205, 196, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150 && ctx) {
            ctx.strokeStyle = `rgba(78, 205, 196, ${0.15 * (1 - distance / 150)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <canvas ref={canvasRef} id="particle-canvas"></canvas>

      <nav className={`main-nav ${isLoaded ? 'visible' : ''}`}>
        <ul className="nav-links">
          <li><Link href="/" className="active">Home</Link></li>
          <li><Link href="/coder">Coder</Link></li>
          <li><Link href="/musician">Musician</Link></li>
          <li><Link href="/writer">Writer</Link></li>
        </ul>
      </nav>

      <div className="home-container">
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="word">Jimmy</span>
                <span className="word">Pocock</span>
              </h1>
              <p className="hero-subtitle">
                Co-founder & CTO at RoverPass
              </p>
              <p className="hero-description">
                Tech innovator scaling the future of outdoor hospitality.<br/>
                Building software that connects millions to nature.
              </p>
              <div className="hero-links">
                <Link href="/coder" className="hero-link">View Work</Link>
                <Link href="#about" className="hero-link secondary">Learn More</Link>
              </div>
            </div>
            <div className="hero-image">
              <img src="/thinker.png" alt="Jimmy Pocock" />
              <div className="image-overlay"></div>
            </div>
          </div>
          
          <div className="floating-text">create</div>
          <div className="floating-text">build</div>
          <div className="floating-text">innovate</div>
          <div className="floating-text">explore</div>
          <div className="floating-text">inspire</div>
        </section>

        <section 
          id="about" 
          className={`content-section ${visibleSections.has('about') ? 'visible' : ''}`}
        >
          <div className="section-header">
            <h2>About Me</h2>
            <div className="section-line"></div>
          </div>

          <div className="about-grid">
            <div className="about-text">
              <p>
                I&apos;m a full-stack developer and creative technologist passionate about building
                beautiful, functional experiences that push the boundaries of what&apos;s possible.
                My journey spans from writing elegant code to producing electronic music and
                crafting stories that explore the human experience in our digital age.
              </p>
              <p>
                With over 5 years of experience in software development, I specialize in creating
                scalable web applications, designing intuitive user interfaces, and architecting
                systems that balance performance with maintainability. When I&apos;m not coding,
                you&apos;ll find me in my home studio making music or writing about the
                intersection of technology and creativity.
              </p>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <span>Personal Photo</span>
              </div>
            </div>
          </div>
        </section>

        <section 
          id="journey" 
          className={`content-section ${visibleSections.has('journey') ? 'visible' : ''}`}
        >
          <div className="section-header">
            <h2>My Journey</h2>
            <div className="section-line"></div>
          </div>

          <div className="journey-timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>The Beginning</h3>
                <p>Started coding as a teenager, fascinated by the ability to create something from nothing but logic and creativity.</p>
                <div className="timeline-image">
                  <div className="image-placeholder small">
                    <span>Early Days</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>Professional Growth</h3>
                <p>Transitioned from hobbyist to professional developer, working on increasingly complex projects and learning the art of software craftsmanship.</p>
                <div className="timeline-image">
                  <div className="image-placeholder small">
                    <span>Career Milestone</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>Creative Expansion</h3>
                <p>Discovered electronic music production and writing as complementary creative outlets, finding parallels between code and art.</p>
                <div className="timeline-image">
                  <div className="image-placeholder small">
                    <span>Studio Setup</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>Present Day</h3>
                <p>Now working as a full-stack developer while pursuing personal projects that blend technology, music, and storytelling.</p>
                <div className="timeline-image">
                  <div className="image-placeholder small">
                    <span>Current Work</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section 
          id="interests" 
          className={`content-section ${visibleSections.has('interests') ? 'visible' : ''}`}
        >
          <div className="section-header">
            <h2>Interests & Hobbies</h2>
            <div className="section-line"></div>
          </div>

          <div className="interests-grid">
            <div className="interest-card">
              <div className="interest-icon">🎵</div>
              <h3>Music Production</h3>
              <p>Creating electronic music that explores emotions through sound design and rhythm.</p>
              <div className="interest-image">
                <div className="image-placeholder medium">
                  <span>Music Studio</span>
                </div>
              </div>
            </div>

            <div className="interest-card">
              <div className="interest-icon">✍️</div>
              <h3>Creative Writing</h3>
              <p>Crafting stories and essays about technology, creativity, and the human experience.</p>
              <div className="interest-image">
                <div className="image-placeholder medium">
                  <span>Writing Space</span>
                </div>
              </div>
            </div>

            <div className="interest-card">
              <div className="interest-icon">🏃</div>
              <h3>Running</h3>
              <p>Finding clarity and inspiration through movement, exploring Austin&apos;s trails and paths.</p>
              <div className="interest-image">
                <div className="image-placeholder medium">
                  <span>Running Routes</span>
                </div>
              </div>
            </div>

            <div className="interest-card">
              <div className="interest-icon">📷</div>
              <h3>Photography</h3>
              <p>Capturing moments and perspectives that tell stories without words.</p>
              <div className="interest-image">
                <div className="image-placeholder medium">
                  <span>Photo Collection</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section 
          id="connect" 
          className={`content-section ${visibleSections.has('connect') ? 'visible' : ''}`}
        >
          <div className="section-header">
            <h2>Let&apos;s Connect</h2>
            <div className="section-line"></div>
          </div>

          <div className="connect-content">
            <p className="connect-intro">
              Whether you&apos;re interested in collaboration, have a project in mind,
              or just want to chat about technology and creativity, I&apos;d love to hear from you.
            </p>
            
            <div className="connect-links">
              <a href="#" className="connect-link">
                <div className="connect-icon">📧</div>
                <span>Email</span>
              </a>
              <a href="#" className="connect-link">
                <div className="connect-icon">💼</div>
                <span>LinkedIn</span>
              </a>
              <a href="#" className="connect-link">
                <div className="connect-icon">🐙</div>
                <span>GitHub</span>
              </a>
              <a href="#" className="connect-link">
                <div className="connect-icon">🐦</div>
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}