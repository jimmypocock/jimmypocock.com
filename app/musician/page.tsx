'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import './musician.css'

interface Track {
  id: number
  title: string
  genre: string
  duration: string
  color: string
}

export default function MusicianPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [progress, setProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const visualizerRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particleCanvasRef = useRef<HTMLCanvasElement>(null)

  const tracks: Track[] = [
    { id: 1, title: 'Digital Sunrise', genre: 'Ambient Electronic', duration: '4:32', color: 'linear-gradient(135deg, #00ffcc, #00D4FF)' },
    { id: 2, title: 'Neon Dreams', genre: 'Synthwave', duration: '3:45', color: 'linear-gradient(135deg, #ff006e, #8B00FF)' },
    { id: 3, title: 'Cosmic Journey', genre: 'Space Ambient', duration: '6:18', color: 'linear-gradient(135deg, #ffaa00, #ff006e)' },
    { id: 4, title: 'Midnight City', genre: 'Future Bass', duration: '3:56', color: 'linear-gradient(135deg, #8B00FF, #00D4FF)' },
    { id: 5, title: 'Electric Pulse', genre: 'Techno', duration: '5:22', color: 'linear-gradient(135deg, #00D4FF, #00FF88)' },
    { id: 6, title: 'Ethereal Waves', genre: 'Downtempo', duration: '4:08', color: 'linear-gradient(135deg, #FF006E, #00ffcc)' },
  ]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!visualizerRef.current) return

    const canvas = visualizerRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const bars: Array<{
      x: number
      height: number
      targetHeight: number
      color: string
    }> = []

    const barCount = 32 // Reduced from 64 for better performance
    const barWidth = canvas.width / barCount

    for (let i = 0; i < barCount; i++) {
      bars.push({
        x: i * barWidth,
        height: Math.random() * 200 + 50,
        targetHeight: Math.random() * 200 + 50,
        color: i % 3 === 0 ? '#00ffcc' : i % 3 === 1 ? '#ff006e' : '#ffaa00'
      })
    }

    let lastTime = 0
    const targetFPS = 30 // Limit to 30 FPS instead of 60+ for better performance

    function animate(currentTime: number) {
      if (!ctx) return
      
      if (currentTime - lastTime < 1000 / targetFPS) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      
      lastTime = currentTime
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      bars.forEach((bar) => {
        bar.height += (bar.targetHeight - bar.height) * 0.1

        if (Math.random() > 0.98) { // Reduced frequency of changes
          bar.targetHeight = isPlaying ? Math.random() * 400 + 100 : Math.random() * 200 + 50
        }

        ctx.fillStyle = bar.color
        ctx.fillRect(bar.x, canvas.height - bar.height, barWidth - 2, bar.height)

        ctx.globalAlpha = 0.3
        ctx.fillRect(bar.x, 0, barWidth - 2, bar.height * 0.5)
        ctx.globalAlpha = 1
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (isPlaying && currentTrack) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 0
          }
          return prev + 0.5
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isPlaying, currentTrack])

  // Particle system
  useEffect(() => {
    const canvas = particleCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 30 // Reduced from 50 for better performance

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      color: string

      constructor() {
        this.x = Math.random() * (canvas?.width || 1000)
        this.y = Math.random() * (canvas?.height || 1000)
        this.size = Math.random() * 3 + 1.5 // Smaller particles
        this.speedX = (Math.random() - 0.5) * 0.2 // Slower movement
        this.speedY = (Math.random() - 0.5) * 0.2
        this.opacity = Math.random() * 0.3 + 0.2 // More subtle
        const colors = ['255, 0, 110', '0, 212, 255', '255, 170, 0']
        this.color = colors[Math.floor(Math.random() * colors.length)]
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
        
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    let animationId: number

    function animate() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  const handleTrackClick = (track: Track) => {
    setCurrentTrack(track)
    setProgress(0)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const newProgress = (x / rect.width) * 100
    setProgress(newProgress)
  }

  return (
    <>
      <canvas ref={particleCanvasRef} id="particle-canvas"></canvas>
      <canvas ref={visualizerRef} id="visualizer"></canvas>
      <div className="noise"></div>

      <nav className={`main-nav music-nav ${isLoaded ? 'visible' : ''}`}>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/coder">Coder</Link></li>
          <li><Link href="/musician" className="active">Musician</Link></li>
          <li><Link href="/writer">Writer</Link></li>
        </ul>
      </nav>

      <div className="musician-container">
        <section className="hero musician-hero">
          <h1 className="glitch-text">JIMMY POCOCK</h1>
          <p className="hero-subtitle">Electronic Music Producer</p>
          <a href="#tracks" className="cta-button">Listen Now</a>
        </section>

        <section className="tracks-section" id="tracks">
          <h2 className="section-title">Latest Tracks</h2>
          <div className="tracks-grid">
            {tracks.map((track) => (
              <div 
                key={track.id} 
                className="track-card" 
                onClick={() => handleTrackClick(track)}
              >
                <div className="track-artwork" style={{ background: track.color }}>
                  <div className="waveform">
                    {[...Array(10)].map((_, i) => (
                      <div 
                        key={i} 
                        className="wave-bar" 
                        style={{
                          '--height': `${50 + (i % 3) * 20 + (i % 2) * 10}%`,
                          '--delay': `${i * 0.1}s`
                        } as React.CSSProperties}
                      />
                    ))}
                  </div>
                </div>
                <div className="track-details">
                  <h3 className="track-name">{track.title}</h3>
                  <div className="track-meta">
                    <span>{track.genre}</span>
                    <span>{track.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">About My Music</h2>
              <p>
                Creating electronic soundscapes that blend emotion with technology.
                My music explores the boundaries between organic and synthetic,
                crafting immersive experiences that transport listeners to new dimensions.
              </p>
              <p>
                Each track is a journey through carefully designed sound spaces,
                where melody meets innovation and rhythm drives exploration.
              </p>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Tracks Released</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">10k+</div>
                  <div className="stat-label">Monthly Listeners</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">5</div>
                  <div className="stat-label">Albums</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">∞</div>
                  <div className="stat-label">Passion</div>
                </div>
              </div>
            </div>
            <div className="gear-showcase" id="gear">
              <h3>Studio Setup</h3>
              <div className="equipment-grid">
                <div className="equipment-item">
                  <div className="equipment-icon">🎹</div>
                  <div className="equipment-name">MIDI Controller</div>
                  <div className="equipment-type">Hardware</div>
                </div>
                <div className="equipment-item">
                  <div className="equipment-icon">🎛️</div>
                  <div className="equipment-name">Synthesizers</div>
                  <div className="equipment-type">Hardware</div>
                </div>
                <div className="equipment-item">
                  <div className="equipment-icon">🎚️</div>
                  <div className="equipment-name">Audio Interface</div>
                  <div className="equipment-type">Hardware</div>
                </div>
                <div className="equipment-item">
                  <div className="equipment-icon">🎧</div>
                  <div className="equipment-name">Studio Monitors</div>
                  <div className="equipment-type">Hardware</div>
                </div>
                <div className="equipment-item">
                  <div className="equipment-icon">💻</div>
                  <div className="equipment-name">Ableton Live</div>
                  <div className="equipment-type">Software</div>
                </div>
                <div className="equipment-item">
                  <div className="equipment-icon">🔌</div>
                  <div className="equipment-name">VST Plugins</div>
                  <div className="equipment-type">Software</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <h2 className="section-title">Connect</h2>
          <p className="contact-subtitle">
            For collaborations, remixes, and booking inquiries
          </p>
          <div className="contact-links">
            <a href="#" className="contact-link">
              <div className="stub-icon">📧</div>
            </a>
            <a href="#" className="contact-link">
              <div className="stub-icon">🎵</div>
            </a>
            <a href="#" className="contact-link">
              <div className="stub-icon">📷</div>
            </a>
            <a href="#" className="contact-link">
              <div className="stub-icon">🐦</div>
            </a>
          </div>
        </section>
      </div>

      <div className={`audio-player ${currentTrack ? 'active' : ''}`}>
        <button className="play-button" onClick={togglePlay}>
          {isPlaying ? (
            <svg viewBox="0 0 24 24">
              <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="track-info">
          <div className="track-title">{currentTrack?.title || 'No track selected'}</div>
          <div className="track-artist">Jimmy Pocock</div>
        </div>
        <div className="progress-bar" onClick={handleProgressClick}>
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="volume-control">
          <span>🔊</span>
          <div className="volume-slider">
            <div className="volume-level"></div>
          </div>
        </div>
      </div>
    </>
  )
}