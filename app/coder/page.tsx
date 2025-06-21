'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import './coder.css'

interface Command {
  input: string
  output: React.ReactElement | string
  timestamp: number
}

export default function CoderPage() {
  const [commands, setCommands] = useState<Command[]>([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [matrixEnabled, setMatrixEnabled] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Define commandHandlers early to avoid reference errors
  const commandHandlers: Record<string, () => React.ReactElement | string> = {
    help: () => {
      setIsHelpOpen(true)
      return 'Opening help menu...'
    },
    about: () => (
      <div className="code-block">
        <span className="code-comment">{`/**
         * Full-Stack Developer & Creative Technologist
         * 
         * Passionate about building elegant solutions to complex problems.
         * When I'm not coding, you'll find me exploring new technologies,
         * creating music, or writing about the intersection of tech and creativity.
         * 
         * Philosophy: "Code is poetry written for two audiences: computers and humans"
         */`}</span><br/><br/>
        <span className="code-keyword">export default</span> {'{'}
        <br/>
        &nbsp;&nbsp;experience: <span className="code-string">&quot;5+ years&quot;</span>,<br/>
        &nbsp;&nbsp;specialties: [<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">&quot;Frontend Development&quot;</span>,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">&quot;Backend Architecture&quot;</span>,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">&quot;UI/UX Design&quot;</span>,<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-string">&quot;Creative Coding&quot;</span><br/>
        &nbsp;&nbsp;]<br/>
        {'}'}
      </div>
    ),
    projects: () => (
      <div>
        <div className="output-header">Featured Projects:</div>
        <div className="project-grid">
          <div className="project-card">
            <div className="project-title">E-Commerce Platform</div>
            <div className="project-desc">Full-stack marketplace with real-time inventory management</div>
            <div className="project-tech">
              <span className="tech-tag">React</span>
              <span className="tech-tag">Node.js</span>
              <span className="tech-tag">PostgreSQL</span>
            </div>
          </div>
          <div className="project-card">
            <div className="project-title">Creative Portfolio CMS</div>
            <div className="project-desc">Custom content management system for creative professionals</div>
            <div className="project-tech">
              <span className="tech-tag">Next.js</span>
              <span className="tech-tag">GraphQL</span>
              <span className="tech-tag">AWS</span>
            </div>
          </div>
          <div className="project-card">
            <div className="project-title">Real-time Analytics Dashboard</div>
            <div className="project-desc">Data visualization platform with live updates</div>
            <div className="project-tech">
              <span className="tech-tag">Vue.js</span>
              <span className="tech-tag">WebSockets</span>
              <span className="tech-tag">D3.js</span>
            </div>
          </div>
        </div>
      </div>
    ),
    skills: () => (
      <div>
        <div className="output-header">Technical Proficiencies:</div>
        <div className="skill-container">
          <div className="skill-bar">
            <div className="skill-name">
              <span>JavaScript/TypeScript</span>
              <span className="skill-percentage">95%</span>
            </div>
            <div className="skill-progress">
              <div className="skill-progress-bar" style={{ width: '95%' }}></div>
            </div>
          </div>
          <div className="skill-bar">
            <div className="skill-name">
              <span>React/Next.js</span>
              <span className="skill-percentage">90%</span>
            </div>
            <div className="skill-progress">
              <div className="skill-progress-bar" style={{ width: '90%' }}></div>
            </div>
          </div>
          <div className="skill-bar">
            <div className="skill-name">
              <span>Node.js/Express</span>
              <span className="skill-percentage">85%</span>
            </div>
            <div className="skill-progress">
              <div className="skill-progress-bar" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className="skill-bar">
            <div className="skill-name">
              <span>Python</span>
              <span className="skill-percentage">80%</span>
            </div>
            <div className="skill-progress">
              <div className="skill-progress-bar" style={{ width: '80%' }}></div>
            </div>
          </div>
          <div className="skill-bar">
            <div className="skill-name">
              <span>System Design</span>
              <span className="skill-percentage">85%</span>
            </div>
            <div className="skill-progress">
              <div className="skill-progress-bar" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      </div>
    ),
    contact: () => (
      <div className="code-block">
        {'{'}<br/>
        &nbsp;&nbsp;<span className="code-variable">email</span>: <span className="code-string">&quot;jimmy@example.com&quot;</span>,<br/>
        &nbsp;&nbsp;<span className="code-variable">github</span>: <span className="code-string">&quot;github.com/jimmypocock&quot;</span>,<br/>
        &nbsp;&nbsp;<span className="code-variable">linkedin</span>: <span className="code-string">&quot;linkedin.com/in/jimmypocock&quot;</span><br/>
        {'}'}<br/><br/>
        <span className="code-comment">{/* Feel free to reach out for collaborations or just to chat about tech! */}</span>
      </div>
    ),
    clear: () => {
      setCommands([])
      return ''
    },
    matrix: () => {
      setMatrixEnabled(!matrixEnabled)
      return `Matrix effect ${!matrixEnabled ? 'enabled' : 'disabled'}`
    },
    ls: () => (
      <div className="file-list">
        <div className="file-item">
          <span className="dir-icon">📁</span>
          <span>projects/</span>
        </div>
        <div className="file-item">
          <span className="dir-icon">📁</span>
          <span>skills/</span>
        </div>
        <div className="file-item">
          <span className="dir-icon">📁</span>
          <span>experience/</span>
        </div>
        <div className="file-item">
          <span className="file-icon">📄</span>
          <span>README.md</span>
        </div>
        <div className="file-item">
          <span className="file-icon">📄</span>
          <span>resume.pdf</span>
        </div>
        <div className="file-item">
          <span className="exec-icon">🚀</span>
          <span>contact.sh</span>
        </div>
      </div>
    )
  }

  useEffect(() => {
    setIsLoaded(true)
    
    // Initial commands
    const initialCommands: Command[] = [
      {
        input: './welcome.sh',
        output: (
          <div className="output">
            <pre className="ascii-art">{`
 ██████╗ ██████╗ ██████╗ ███████╗██████╗ 
██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔══██╗
██║     ██║   ██║██║  ██║█████╗  ██████╔╝
██║     ██║   ██║██║  ██║██╔══╝  ██╔══██╗
╚██████╗╚██████╔╝██████╔╝███████╗██║  ██║
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
            `}</pre>
            <p className="comment">
              Full-stack developer, creative technologist, and problem solver<br/>
              Welcome to my digital workspace
            </p>
          </div>
        ),
        timestamp: Date.now()
      },
      {
        input: 'ls',
        output: commandHandlers.ls(),
        timestamp: Date.now() + 500
      },
      {
        input: 'cat about.md',
        output: (
          <div className="code-block">
            <span className="code-comment"># About Me</span><br/><br/>
            <span className="code-keyword">const</span> <span className="code-variable">developer</span> = {'{'}
            <br/>
            &nbsp;&nbsp;<span className="code-variable">name</span>: <span className="code-string">&quot;Jimmy Pocock&quot;</span>,<br/>
            &nbsp;&nbsp;<span className="code-variable">location</span>: <span className="code-string">&quot;Austin, TX&quot;</span>,<br/>
            &nbsp;&nbsp;<span className="code-variable">role</span>: <span className="code-string">&quot;Full-Stack Developer&quot;</span>,<br/>
            &nbsp;&nbsp;<span className="code-variable">languages</span>: [<span className="code-string">&quot;JavaScript&quot;</span>, <span className="code-string">&quot;TypeScript&quot;</span>, <span className="code-string">&quot;Python&quot;</span>, <span className="code-string">&quot;Go&quot;</span>],<br/>
            &nbsp;&nbsp;<span className="code-variable">interests</span>: [<span className="code-string">&quot;Web Development&quot;</span>, <span className="code-string">&quot;System Design&quot;</span>, <span className="code-string">&quot;Creative Coding&quot;</span>],<br/>
            &nbsp;&nbsp;<span className="code-variable">currentFocus</span>: <span className="code-string">&quot;Building beautiful, functional web experiences&quot;</span><br/>
            {'}'};
          </div>
        ),
        timestamp: Date.now() + 1000
      },
      {
        input: 'projects',
        output: commandHandlers.projects(),
        timestamp: Date.now() + 1500
      },
      {
        input: 'skills',
        output: commandHandlers.skills(),
        timestamp: Date.now() + 2000
      }
    ]

    // Set commands with progressive reveal
    let currentIndex = 0
    const revealInterval = setInterval(() => {
      if (currentIndex < initialCommands.length) {
        setCommands(prev => [...prev, initialCommands[currentIndex]])
        currentIndex++
      } else {
        clearInterval(revealInterval)
      }
    }, 1000)

    return () => clearInterval(revealInterval)
  }, [])

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 30

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
        this.size = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * 0.2
        this.speedY = (Math.random() - 0.5) * 0.2
        this.opacity = Math.random() * 0.3 + 0.1
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
        
        ctx.fillStyle = `rgba(78, 201, 176, ${this.opacity})`
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

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      const cmd = currentCommand.trim().toLowerCase()
      const handler = commandHandlers[cmd]
      
      const newCommand: Command = {
        input: currentCommand,
        output: handler ? handler() : (
          <span className="error">
            Command not found: {cmd}<br/>
            <span className="comment">Type &apos;help&apos; for available commands</span>
          </span>
        ),
        timestamp: Date.now()
      }

      setCommands([...commands, newCommand])
      setCurrentCommand('')
    }
  }

  return (
    <>
      <canvas ref={canvasRef} id="particle-canvas"></canvas>
      
      <nav className={`main-nav terminal-nav ${isLoaded ? 'visible' : ''}`}>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/coder" className="active">Coder</Link></li>
          <li><Link href="/musician">Musician</Link></li>
          <li><Link href="/writer">Writer</Link></li>
        </ul>
      </nav>

      <div className={`matrix-bg ${matrixEnabled ? '' : 'hidden'}`}>
        <MatrixRain />
      </div>

      <div className="terminal">
        <div className="terminal-header">
          <div className="terminal-ascii">
            <pre className="ascii-art">{`
 ██████╗ ██████╗ ██████╗ ███████╗██████╗ 
██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔══██╗
██║     ██║   ██║██║  ██║█████╗  ██████╔╝
██║     ██║   ██║██║  ██║██╔══╝  ██╔══██╗
╚██████╗╚██████╔╝██████╔╝███████╗██║  ██║
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
            `}</pre>
            <p className="ascii-subtitle">Full-stack developer, creative technologist, and problem solver</p>
          </div>
        </div>
        <div className="terminal-body">
          {commands.filter(cmd => cmd && cmd.input && cmd.output).map((cmd, index) => (
            <div key={index} className="command-group">
              <div className="command-line">
                <span className="prompt">jimmy@pocock:~$</span>
                <span className="command">{cmd.input}</span>
              </div>
              <div className="output">{cmd.output}</div>
            </div>
          ))}
          
          <div className="terminal-input-container">
            <div className="terminal-input">
              <span className="prompt">jimmy@pocock:~$</span>
              <input
                type="text"
                id="commandInput"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleCommand}
                autoComplete="off"
                autoFocus
              />
              <span className="cursor"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="status-bar">
        <div className="status-left">
          <div className="status-item">🔌 Connected</div>
          <div className="status-item">🌿 main</div>
          <div className="status-item">✓ Ready</div>
        </div>
        <div className="status-right">
          <span>UTF-8 | LF | Space Mono</span>
        </div>
      </div>

      {isHelpOpen && (
        <>
          <div className="overlay active" onClick={() => setIsHelpOpen(false)}></div>
          <div className="help-menu active">
            <h3>Available Commands</h3>
            <div className="help-command">
              <span className="help-cmd">help</span>
              <span className="help-desc">Show this help menu</span>
            </div>
            <div className="help-command">
              <span className="help-cmd">about</span>
              <span className="help-desc">Display information about me</span>
            </div>
            <div className="help-command">
              <span className="help-cmd">projects</span>
              <span className="help-desc">List featured projects</span>
            </div>
            <div className="help-command">
              <span className="help-cmd">skills</span>
              <span className="help-desc">Show technical skills</span>
            </div>
            <div className="help-command">
              <span className="help-cmd">contact</span>
              <span className="help-desc">Get contact information</span>
            </div>
            <div className="help-command">
              <span className="help-cmd">ls</span>
              <span className="help-desc">List directory contents</span>
            </div>
            <div className="help-command">
              <span className="help-cmd">clear</span>
              <span className="help-desc">Clear terminal</span>
            </div>
            <div className="help-command">
              <span className="help-cmd">matrix</span>
              <span className="help-desc">Toggle matrix effect</span>
            </div>
            <p className="help-footer">Press ESC to close</p>
          </div>
        </>
      )}
    </>
  )
}

function MatrixRain() {
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.className = 'matrix-canvas'
    const container = document.querySelector('.matrix-bg')
    if (!container) return
    
    container.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const columns = Math.floor(canvas.width / 20)
    const drops: number[] = []
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'

    function draw() {
      if (!ctx) return
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#4ec9b0'
      ctx.font = '15px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * 20, drops[i] * 20)

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    return () => {
      clearInterval(interval)
      canvas.remove()
    }
  }, [])

  return null
}