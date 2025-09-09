import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import CoderPage from '../page'

// Mock Next.js Link component
jest.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode; href: string }) => {
      return <a href={href}>{children}</a>
    }
  }
})

// Mock canvas for particle effects
HTMLCanvasElement.prototype.getContext = jest.fn()

describe('CoderPage Terminal Structure', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should have terminal structure without header', () => {
    render(<CoderPage />)
    
    // Check that terminal body exists directly (no header)
    const terminalBody = document.querySelector('.terminal-body')
    expect(terminalBody).toBeInTheDocument()
    
    // Check that there is no terminal header
    const terminalHeader = document.querySelector('.terminal-header')
    expect(terminalHeader).not.toBeInTheDocument()
  })

  it('should display commands in correct sequence', async () => {
    render(<CoderPage />)
    
    // First command should be ./welcome.sh
    await waitFor(() => {
      const welcomeCommands = screen.getAllByText('./welcome.sh')
      expect(welcomeCommands[0]).toBeInTheDocument()
    }, { timeout: 2000 })
    
    // ASCII art should appear as output of welcome.sh
    await waitFor(() => {
      const asciiContainer = screen.getByText(/Initializing workspace.../).closest('.output')
      expect(asciiContainer).toBeInTheDocument()
      // Check for ASCII art elements instead of exact text
      expect(asciiContainer?.querySelector('.ascii-art')).toBeInTheDocument()
      expect(asciiContainer?.textContent).toContain('Full-stack developer, creative technologist, and problem solver')
      expect(asciiContainer?.textContent).toContain('Welcome to my digital workspace!')
    })
    
    // Second command: ls
    await waitFor(() => {
      const lsCommands = screen.getAllByText('ls')
      expect(lsCommands[0]).toBeInTheDocument()
    }, { timeout: 3000 })
    
    // Third command: cat about.md
    await waitFor(() => {
      const catCommands = screen.getAllByText('cat about.md')
      expect(catCommands[0]).toBeInTheDocument()
    }, { timeout: 4000 })
    
    // Fourth command: projects
    await waitFor(() => {
      const projectCommands = screen.getAllByText('projects')
      expect(projectCommands[0]).toBeInTheDocument()
    }, { timeout: 5000 })
    
    // Fifth command: skills
    await waitFor(() => {
      const skillsCommands = screen.getAllByText('skills')
      expect(skillsCommands[0]).toBeInTheDocument()
    }, { timeout: 6000 })
  })

  it('should have command input at the bottom', async () => {
    render(<CoderPage />)
    
    // Wait for commands to load
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('autoFocus')
    expect(input.parentElement?.textContent).toContain('jimmy@pocock:~$')
  })

  it('should display each command with prompt and output', async () => {
    render(<CoderPage />)
    
    // Wait for all commands to load (5 commands * 2 steps * 800ms + buffer)
    await waitFor(() => {
      const allPrompts = screen.getAllByText('jimmy@pocock:~$')
      // Should have 5 commands + 1 input prompt = 6 total
      expect(allPrompts.length).toBe(6)
    }, { timeout: 10000 })
    
    // Verify each command has its output
    const outputs = screen.getAllByText(/Featured Projects:|Technical Proficiencies:|About Me/)
    expect(outputs.length).toBeGreaterThan(0)
  }, 15000)

  it('should handle user commands correctly', async () => {
    const user = userEvent.setup()
    render(<CoderPage />)
    
    // Wait for input to be ready
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
    
    const input = screen.getByRole('textbox')
    
    // Type a command
    await user.type(input, 'help')
    await user.keyboard('{Enter}')
    
    // Check that help menu opens
    await waitFor(() => {
      expect(screen.getByText('Available Commands')).toBeInTheDocument()
    })
  })

  it('should maintain terminal structure integrity', () => {
    const { container } = render(<CoderPage />)
    
    // Check overall structure
    const terminal = container.querySelector('.terminal')
    expect(terminal).toBeInTheDocument()
    
    // No terminal header should exist
    const terminalHeader = container.querySelector('.terminal-header')
    expect(terminalHeader).not.toBeInTheDocument()
    
    const terminalBody = container.querySelector('.terminal-body')
    expect(terminalBody).toBeInTheDocument()
    
    const inputContainer = container.querySelector('.terminal-input-container')
    expect(inputContainer).toBeInTheDocument()
    
    // Verify hierarchy
    expect(terminal?.contains(terminalBody!)).toBe(true)
    expect(terminalBody?.contains(inputContainer!)).toBe(true)
  })
})