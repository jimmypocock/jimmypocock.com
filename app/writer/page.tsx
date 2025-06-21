'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import './writer.css'

interface Thought {
  id: number
  date: string
  title: string
  excerpt: string
  category: string
}

export default function WriterPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const thoughts: Thought[] = [
    {
      id: 1,
      date: 'March 15, 2024',
      title: 'The Poetry of Code',
      excerpt: 'Exploring how programming languages mirror the structure and beauty of human language, and why the best code reads like well-crafted prose.',
      category: 'Technology'
    },
    {
      id: 2,
      date: 'March 8, 2024',
      title: 'Digital Minimalism in Practice',
      excerpt: 'Learning to cultivate intentional spaces in our hyper-connected world, and finding beauty in the pause between notifications.',
      category: 'Philosophy'
    },
    {
      id: 3,
      date: 'February 28, 2024',
      title: 'Creating in the Age of AI',
      excerpt: 'What it means to be creative when machines can generate art, and how human creativity evolves alongside artificial intelligence.',
      category: 'Creativity'
    },
    {
      id: 4,
      date: 'February 20, 2024',
      title: 'The Sound of Silence',
      excerpt: 'How moments of quiet contemplation fuel creative breakthroughs, and why silence is becoming our most precious resource.',
      category: 'Mindfulness'
    },
    {
      id: 5,
      date: 'February 12, 2024',
      title: 'Building Digital Gardens',
      excerpt: 'Why I chose to create a space for ideas to grow organically, rather than chasing viral moments in the attention economy.',
      category: 'Writing'
    },
    {
      id: 6,
      date: 'February 5, 2024',
      title: 'The Art of Slow Technology',
      excerpt: 'Designing experiences that encourage reflection rather than reaction, and building tools that respect human attention.',
      category: 'Design'
    }
  ]

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

    const sections = document.querySelectorAll('.garden-section')
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

    const particleCount = 70

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
        this.size = Math.random() * 4 + 2
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.4
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
        
        ctx.fillStyle = `rgba(139, 149, 109, ${this.opacity})`
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

      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150 && ctx) {
            ctx.strokeStyle = `rgba(139, 149, 109, ${0.1 * (1 - distance / 150)})`
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

      <nav className={`main-nav writer-nav ${isLoaded ? 'visible' : ''}`}>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/coder">Coder</Link></li>
          <li><Link href="/musician">Musician</Link></li>
          <li><Link href="/writer" className="active">Writer</Link></li>
        </ul>
      </nav>

      <div className="container writer-container">
        <section className="hero writer-hero">
          <div className="floating-quote left">&ldquo;</div>
          <div className="floating-quote right">&rdquo;</div>

          <h1>
            <span className="word">JIMMY</span>
            <span className="word">POCOCK</span>
          </h1>
          <p className="hero-subtitle">
            Cultivating ideas at the intersection of technology,
            creativity, and human experience. This is my digital garden&mdash;a living
            collection of thoughts, reflections, and discoveries.
          </p>
        </section>

        <section 
          id="garden" 
          className={`garden-section ${visibleSections.has('garden') ? 'visible' : ''}`}
        >
          <h2 className="section-title">Recent Thoughts</h2>

          <div className="thought-grid">
            {thoughts.map(thought => (
              <div 
                key={thought.id} 
                className="thought-card"
              >
                <div className="thought-date">{thought.date}</div>
                <h3 className="thought-title">{thought.title}</h3>
                <p className="thought-excerpt">{thought.excerpt}</p>
                <span className="thought-category">{thought.category}</span>
              </div>
            ))}
          </div>
        </section>

        <section 
          id="personas" 
          className="personality-grid"
        >
          <div className="personality-card">
            <span className="personality-icon">
              <div className="stub-icon">💭</div>
            </span>
            <h3>Thinker</h3>
            <p>Exploring ideas at the edges of technology and humanity, always questioning what&apos;s possible.</p>
          </div>

          <div className="personality-card">
            <span className="personality-icon">
              <div className="stub-icon">✍️</div>
            </span>
            <h3>Writer</h3>
            <p>Crafting narratives that bridge the digital and analog, finding stories in code and poetry in systems.</p>
          </div>

          <div className="personality-card">
            <span className="personality-icon">
              <div className="stub-icon">🌱</div>
            </span>
            <h3>Gardener</h3>
            <p>Nurturing ideas from seeds to full bloom, believing that the best thoughts grow slowly.</p>
          </div>
        </section>

        <section 
          id="about" 
          className={`garden-section ${visibleSections.has('about') ? 'visible' : ''}`}
        >
          <h2 className="section-title">About This Space</h2>

          <div className="about-content">
            <p>
              This garden is my experiment in <span className="highlight">slow creation</span>—a
              place where ideas can germinate at their own pace, free from the pressure
              of constant publishing and performative productivity.
            </p>
            <p>
              Here, thoughts evolve like living things: some bloom quickly into essays,
              others remain as seeds of possibility. Each piece is tended with care,
              watered with curiosity, and pruned with thoughtful revision.
            </p>
            <p>
              I write about the intersection of technology and creativity, the philosophy
              of building, and the art of maintaining humanity in an increasingly digital world.
              Every word is an invitation to think deeper, question more, and imagine differently.
            </p>
          </div>
        </section>

        <section 
          id="process" 
          className={`garden-section ${visibleSections.has('process') ? 'visible' : ''}`}
        >
          <h2 className="section-title">Writing Process</h2>

          <div className="process-grid">
            <div className="process-step">
              <div className="step-number">01</div>
              <h3>Seed</h3>
              <p>Ideas begin as fragments—a question, an observation, a connection between disparate thoughts.</p>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <h3>Cultivate</h3>
              <p>Through research and reflection, seeds grow into drafts, finding their shape and voice.</p>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <h3>Prune</h3>
              <p>Editing with intention, removing what doesn&apos;t serve the core idea, strengthening what remains.</p>
            </div>
            <div className="process-step">
              <div className="step-number">04</div>
              <h3>Share</h3>
              <p>Publishing not as an end, but as part of an ongoing conversation with readers and ideas.</p>
            </div>
          </div>
        </section>
      </div>

      <footer>
        <p>Cultivated with care by Jimmy Pocock</p>
        <div className="social-links">
          <a href="#">Email</a>
          <a href="#">RSS</a>
          <a href="#">Newsletter</a>
        </div>
      </footer>
    </>
  )
}