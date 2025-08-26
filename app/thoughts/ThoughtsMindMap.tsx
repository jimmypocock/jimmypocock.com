'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Thought } from '@/lib/thoughts'

interface NodePosition {
  x: number
  y: number
  vx: number
  vy: number
}

interface ThoughtsMindMapProps {
  thoughts: Thought[]
}

export default function ThoughtsMindMap({ thoughts }: ThoughtsMindMapProps) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [nodePositions, setNodePositions] = useState<Map<string, NodePosition>>(new Map())
  const animationFrameRef = useRef<number | undefined>(undefined)

  // Initialize node positions
  useEffect(() => {
    const positions = new Map<string, NodePosition>()
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    
    // Start with a wider circular arrangement with some randomness
    thoughts.forEach((thought, index) => {
      const angle = (index / thoughts.length) * Math.PI * 2
      const baseRadius = Math.min(500, thoughts.length * 20) // Much wider radius
      const radius = baseRadius + (Math.random() - 0.5) * 100 // Add randomness
      
      positions.set(thought.slug, {
        x: centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 100,
        y: centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      })
    })

    setNodePositions(positions)
  }, [thoughts])

  // Force simulation for natural positioning
  useEffect(() => {
    const simulate = () => {
      const newPositions = new Map(nodePositions)
      const damping = 0.92
      const repulsion = 8000 // Much stronger repulsion for spacing
      const attraction = 0.005 // Weaker attraction to allow more spread
      const centerPull = 0.0002 // Very weak center pull

      // Apply forces
      thoughts.forEach(thought1 => {
        const pos1 = newPositions.get(thought1.slug)
        if (!pos1) return

        let fx = 0, fy = 0

        // Repulsion between all nodes
        thoughts.forEach(thought2 => {
          if (thought1.slug === thought2.slug) return
          const pos2 = newPositions.get(thought2.slug)
          if (!pos2) return

          const dx = pos1.x - pos2.x
          const dy = pos1.y - pos2.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          
          // Repel at all distances, stronger when closer
          if (dist < 400) { // Increased range
            const force = repulsion / (dist * dist)
            fx += (dx / dist) * force
            fy += (dy / dist) * force
          }
        })

        // Moderate attraction along connections
        if (thought1.connections) {
          thought1.connections.forEach(conn => {
            const pos2 = newPositions.get(conn.target)
            if (!pos2) return

            const dx = pos2.x - pos1.x
            const dy = pos2.y - pos1.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            
            // Target distance of 200-250 pixels for connected nodes
            const targetDist = 225
            const force = attraction * (dist - targetDist)

            fx += (dx / dist) * force
            fy += (dy / dist) * force
          })
        }

        // Also check reverse connections
        thoughts.forEach(thought2 => {
          if (thought2.connections) {
            thought2.connections.forEach(conn => {
              if (conn.target === thought1.slug) {
                const pos2 = newPositions.get(thought2.slug)
                if (!pos2) return

                const dx = pos2.x - pos1.x
                const dy = pos2.y - pos1.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                
                const targetDist = 225 // Match the forward connection distance
                const force = attraction * (dist - targetDist)

                fx += (dx / dist) * force
                fy += (dy / dist) * force
              }
            })
          }
        })

        // Center pull
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2
        fx += (centerX - pos1.x) * centerPull
        fy += (centerY - pos1.y) * centerPull

        // Update velocity and position
        pos1.vx = pos1.vx * damping + fx * 0.02 // Increased force multiplier
        pos1.vy = pos1.vy * damping + fy * 0.02
        pos1.x += pos1.vx
        pos1.y += pos1.vy
      })

      setNodePositions(newPositions)
    }

    const interval = setInterval(simulate, 30) // Faster updates
    return () => clearInterval(interval)
  }, [nodePositions, thoughts])

  // Draw connections on canvas
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw all connections
      thoughts.forEach(thought => {
        const fromPos = nodePositions.get(thought.slug)
        if (!fromPos || !thought.connections) return

        thought.connections.forEach(conn => {
          const toPos = nodePositions.get(conn.target)
          if (!toPos) return

          // Set connection color based on type
          const colors: Record<string, string> = {
            'builds-upon': '#4ecdc4',
            'questions': '#ff6b6b',
            'answers': '#52c41a',
            'contradicts': '#f5222d',
            'references': '#faad14'
          }
          
          ctx.strokeStyle = colors[conn.type] || '#666'
          ctx.lineWidth = 2
          ctx.globalAlpha = hoveredNode === thought.slug || hoveredNode === conn.target ? 0.8 : 0.3

          // Draw curved line
          ctx.beginPath()
          ctx.moveTo(fromPos.x, fromPos.y)
          
          const midX = (fromPos.x + toPos.x) / 2
          const midY = (fromPos.y + toPos.y) / 2
          const curvature = 20
          
          ctx.quadraticCurveTo(
            midX + curvature,
            midY - curvature,
            toPos.x,
            toPos.y
          )
          ctx.stroke()

          // Draw arrow head
          const angle = Math.atan2(toPos.y - midY, toPos.x - midX)
          const arrowLength = 10
          
          ctx.beginPath()
          ctx.moveTo(toPos.x, toPos.y)
          ctx.lineTo(
            toPos.x - arrowLength * Math.cos(angle - Math.PI / 6),
            toPos.y - arrowLength * Math.sin(angle - Math.PI / 6)
          )
          ctx.moveTo(toPos.x, toPos.y)
          ctx.lineTo(
            toPos.x - arrowLength * Math.cos(angle + Math.PI / 6),
            toPos.y - arrowLength * Math.sin(angle + Math.PI / 6)
          )
          ctx.stroke()
        })
      })

      ctx.globalAlpha = 1
    }

    draw()
    animationFrameRef.current = requestAnimationFrame(function animate() {
      draw()
      animationFrameRef.current = requestAnimationFrame(animate)
    })

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [nodePositions, thoughts, hoveredNode])

  const handleNodeClick = (slug: string) => {
    router.push(`/thoughts/${slug}`)
  }

  const truncateTitle = (title: string, maxLength: number = 25): string => {
    return title.length > maxLength ? title.substring(0, maxLength - 3) + '...' : title
  }

  return (
    <div 
      ref={containerRef}
      className="w-screen h-screen relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-auto"
    >
      <style jsx global>{`
        .mind-node {
          position: absolute;
          transform: translate(-50%, -50%);
          padding: 12px 20px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 25px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 13px;
          text-align: center;
          max-width: 150px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          z-index: 10;
        }

        .mind-node:hover {
          transform: translate(-50%, -50%) scale(1.1);
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
          z-index: 20;
        }

        .mind-node.has-connections {
          background: rgba(78, 205, 196, 0.1);
          border-color: rgba(78, 205, 196, 0.3);
        }

        .info-panel {
          position: fixed;
          top: 20px;
          left: 20px;
          padding: 20px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          max-width: 250px;
          z-index: 100;
        }

        .info-title {
          font-size: 24px;
          font-weight: 300;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #4ecdc4 0%, #ff6b6b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .info-subtitle {
          font-size: 12px;
          opacity: 0.7;
          line-height: 1.5;
        }

        .legend {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
          font-size: 11px;
        }

        .legend-color {
          width: 20px;
          height: 2px;
        }
      `}</style>

      {/* Canvas for connections */}
      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Thought Nodes */}
      {thoughts.map(thought => {
        const pos = nodePositions.get(thought.slug)
        if (!pos) return null

        const hasConnections = (thought.connections && thought.connections.length > 0) ||
          thoughts.some(t => t.connections?.some(c => c.target === thought.slug))

        return (
          <div
            key={thought.slug}
            className={`mind-node ${hasConnections ? 'has-connections' : ''}`}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
            }}
            onClick={() => handleNodeClick(thought.slug)}
            onMouseEnter={() => setHoveredNode(thought.slug)}
            onMouseLeave={() => setHoveredNode(null)}
            title={thought.title}
          >
            {truncateTitle(thought.title)}
          </div>
        )
      })}

      {/* Info Panel */}
      <div className="info-panel">
        <h1 className="info-title">Mind Map</h1>
        <p className="info-subtitle">
          Navigate through interconnected thoughts. 
          Click any node to explore.
        </p>
        
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#4ecdc4' }} />
            <span>Builds Upon</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#ff6b6b' }} />
            <span>Questions</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#52c41a' }} />
            <span>Answers</span>
          </div>
        </div>
      </div>

      {/* Back to Home */}
      <Link
        href="/"
        className="fixed bottom-5 left-5 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-full text-xs uppercase tracking-wider hover:bg-white/10 hover:border-white/30 transition-all z-50"
      >
        Back to Home
      </Link>

      {/* Hover Info */}
      {hoveredNode && (
        <div
          style={{
            position: 'absolute',
            left: `${(nodePositions.get(hoveredNode)?.x || 0)}px`,
            top: `${((nodePositions.get(hoveredNode)?.y || 0) - 50)}px`,
            transform: 'translateX(-50%)',
            background: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '11px',
            pointerEvents: 'none',
            zIndex: 1000,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            maxWidth: '200px',
            textAlign: 'center'
          }}
        >
          <div style={{ fontWeight: 'bold' }}>
            {thoughts.find(t => t.slug === hoveredNode)?.title}
          </div>
          <div style={{ opacity: 0.7, marginTop: '4px' }}>
            {thoughts.find(t => t.slug === hoveredNode)?.readingTime} min read
          </div>
        </div>
      )}
    </div>
  )
}