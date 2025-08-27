'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import type { Thought } from '@/lib/thoughts'

interface NodePosition {
  x: number
  y: number
  radius: number
  angle: number
}

interface ThoughtsMindMapProps {
  thoughts: Thought[]
}

export default function ThoughtsMindMap({ thoughts }: ThoughtsMindMapProps) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  const [viewOffset, setViewOffset] = useState({ x: 0, y: 0 })

  // Sort thoughts by publishedOn date (newest first) and calculate positions
  const nodeData = useMemo(() => {
    const sorted = [...thoughts].sort((a, b) => {
      const dateA = new Date(a.publishedOn || '1970-01-01').getTime()
      const dateB = new Date(b.publishedOn || '1970-01-01').getTime()
      return dateB - dateA
    })

    // Calculate connections based on shared tags
    const connections = new Map<string, Set<string>>()
    thoughts.forEach(thought => {
      if (!thought.tags || thought.tags.length === 0) return
      
      const relatedSlugs = new Set<string>()
      thoughts.forEach(other => {
        if (other.slug === thought.slug) return
        if (!other.tags || other.tags.length === 0) return
        
        // Check if they share any tags
        const sharedTags = thought.tags?.filter(tag => other.tags?.includes(tag)) || []
        if (sharedTags.length > 0) {
          relatedSlugs.add(other.slug)
        }
      })
      
      if (relatedSlugs.size > 0) {
        connections.set(thought.slug, relatedSlugs)
      }
    })

    // Calculate connection counts for sizing (both outgoing and incoming)
    const connectionCounts = new Map<string, number>()
    thoughts.forEach(thought => {
      let count = connections.get(thought.slug)?.size || 0
      // Count incoming connections too
      connections.forEach((targets, source) => {
        if (targets.has(thought.slug) && source !== thought.slug) {
          count++
        }
      })
      connectionCounts.set(thought.slug, count)
    })

    // Position nodes in concentric circles based on date
    const positions = new Map<string, NodePosition>()
    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2
    
    // Group by year/month for better organization
    const rings = 4 // Number of concentric circles
    const itemsPerRing = Math.ceil(sorted.length / rings)
    
    sorted.forEach((thought, index) => {
      const ring = Math.floor(index / itemsPerRing)
      const indexInRing = index % itemsPerRing
      const itemsInThisRing = Math.min(itemsPerRing, sorted.length - ring * itemsPerRing)
      
      const radius = 180 + ring * 240 // Start at 180px, expand by 240px per ring (20% more spacing)
      const angle = (indexInRing / itemsInThisRing) * Math.PI * 2 - Math.PI / 2 // Start from top
      
      positions.set(thought.slug, {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        radius,
        angle
      })
    })

    return { sorted, positions, connectionCounts, connections }
  }, [thoughts, dimensions])

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Handle scroll/pan with mouse wheel
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      // Update view offset based on scroll
      setViewOffset(prev => ({
        x: prev.x - e.deltaX,
        y: prev.y - e.deltaY
      }))
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [])

  // Draw connections on canvas
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw connections based on shared tags
    nodeData.connections.forEach((targets, sourceSlug) => {
      const fromPos = nodeData.positions.get(sourceSlug)
      if (!fromPos) return

      targets.forEach(targetSlug => {
        const toPos = nodeData.positions.get(targetSlug)
        if (!toPos) return

        // Avoid drawing duplicate connections (A->B and B->A)
        if (sourceSlug > targetSlug) {
          const reverseConnection = nodeData.connections.get(targetSlug)
          if (reverseConnection?.has(sourceSlug)) return
        }

        // Determine if this connection should be highlighted
        const isHighlighted = 
          hoveredNode === sourceSlug || 
          hoveredNode === targetSlug ||
          selectedNode === sourceSlug ||
          selectedNode === targetSlug

        // Simple gray lines, darker when highlighted
        ctx.strokeStyle = isHighlighted ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.08)'
        ctx.lineWidth = isHighlighted ? 2 : 1

        // Draw straight line with view offset
        ctx.beginPath()
        ctx.moveTo(fromPos.x + viewOffset.x, fromPos.y + viewOffset.y)
        ctx.lineTo(toPos.x + viewOffset.x, toPos.y + viewOffset.y)
        ctx.stroke()
      })
    })
  }, [nodeData, hoveredNode, selectedNode, dimensions, viewOffset])

  // Calculate node size based on connections
  const getNodeSize = (slug: string): number => {
    const count = nodeData.connectionCounts.get(slug) || 0
    return 30 + Math.min(count * 5, 30) // Base 30px, max 60px radius for larger nodes with text
  }

  // Calculate node color based on date (opacity)
  const getNodeOpacity = (thought: Thought): number => {
    const index = nodeData.sorted.findIndex(t => t.slug === thought.slug)
    return 1 - (index / nodeData.sorted.length) * 0.6 // Newest: 1, oldest: 0.4
  }

  const handleNodeClick = (slug: string) => {
    if (selectedNode === slug) {
      // Double click to navigate
      router.push(`/thoughts/${slug}`)
    } else {
      setSelectedNode(slug)
    }
  }

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      
      // Check if click is outside sidebar and not on a node
      const sidebar = document.querySelector('.sidebar-panel')
      const isNode = target.closest('[data-node]')
      
      if (selectedNode && sidebar && !sidebar.contains(target) && !isNode) {
        setSelectedNode(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [selectedNode])

  const selectedThought = thoughts.find(t => t.slug === selectedNode)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Canvas Area */}
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden"
      >
        {/* Connection Canvas */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0"
          style={{ pointerEvents: 'none' }}
        />

        {/* Thought Nodes */}
        {thoughts.map(thought => {
          const pos = nodeData.positions.get(thought.slug)
          if (!pos) return null

          const size = getNodeSize(thought.slug)
          const opacity = getNodeOpacity(thought)
          const isHovered = hoveredNode === thought.slug
          const isSelected = selectedNode === thought.slug
          const hasConnections = (nodeData.connectionCounts.get(thought.slug) || 0) > 0

          return (
            <div
              key={thought.slug}
              data-node="true"
              className="absolute flex items-center justify-center cursor-pointer"
              style={{
                left: `${pos.x + viewOffset.x}px`,
                top: `${pos.y + viewOffset.y}px`,
                width: `${size * 2}px`,
                height: `${size * 2}px`,
                transform: `translate(-50%, -50%) ${isHovered ? 'scale(1.1)' : ''} ${isSelected ? 'scale(1.15)' : ''}`,
                transition: 'transform 200ms',  // Only transition the scale, not position
                zIndex: isHovered || isSelected ? 20 : 10
              }}
              onClick={() => handleNodeClick(thought.slug)}
              onMouseEnter={() => setHoveredNode(thought.slug)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Node Circle */}
              <div
                className="absolute inset-0 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: hasConnections ? '#3b82f6' : '#9ca3af',
                  opacity: opacity,
                  border: isSelected ? '4px solid #1e40af' : 'none',
                  boxShadow: isHovered ? '0 0 30px rgba(59, 130, 246, 0.5)' : '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                {/* Text inside node */}
                <div className="text-white text-center px-2" style={{ fontSize: `${Math.max(10, size / 4)}px` }}>
                  {thought.title.split(' ').slice(0, 2).join(' ')}
                </div>
              </div>
            </div>
          )
        })}

        <div className="absolute top-4 left-4">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-sm text-black"
          >
            Go Home
          </button>
        </div>
      </div>

      {/* Sidebar for Selected Thought */}
      <div className={`sidebar-panel w-[600px] bg-white shadow-2xl transition-transform duration-300 ${selectedNode ? 'translate-x-0' : 'translate-x-full absolute right-0'} h-full overflow-y-auto`}>
        {selectedThought && (
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">{selectedThought.title}</h2>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            
            <div className="text-sm text-gray-500 mb-6">
              {selectedThought.readingTime} min read • {selectedThought.publishedOn}
            </div>
            
            {selectedThought.excerpt && (
              <p className="text-gray-700 mb-8 leading-relaxed">
                {selectedThought.excerpt}
              </p>
            )}

            {(() => {
              const relatedThoughts = nodeData.connections.get(selectedThought.slug)
              if (!relatedThoughts || relatedThoughts.size === 0) return null
              
              return (
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Related Thoughts</h4>
                  <div className="space-y-2">
                    {Array.from(relatedThoughts).map(targetSlug => {
                      const target = thoughts.find(t => t.slug === targetSlug)
                      if (!target) return null
                      return (
                        <button
                          key={targetSlug}
                          onClick={() => setSelectedNode(targetSlug)}
                          className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                        >
                          <div className="font-medium text-gray-900">{target.title}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })()}

            <button
              onClick={() => router.push(`/thoughts/${selectedThought.slug}`)}
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Read Full Post →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}