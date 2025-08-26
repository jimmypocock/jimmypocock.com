'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import styles from './mosaic.module.css'

export default function RaePage() {
  const [currentLayout, setCurrentLayout] = useState<'random' | 'uniform' | 'pattern'>('random')
  const [colorMode, setColorMode] = useState(false)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [zoomedImage, setZoomedImage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // Cell size variations
  const sizes = ['size-small', 'size-medium', 'size-large', 'size-tall', 'size-small']
  const colors = ['overlay-blue', 'overlay-purple', 'overlay-green', 'overlay-orange', 'overlay-pink']
  
  // Dog photos - replace these with your S3 bucket URLs
  const dogPhotos = [
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb', // Golden Retriever
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1', // Happy dog
    'https://images.unsplash.com/photo-1561037404-61cd46aa615b', // Dog portrait
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b', // Dogs playing
    'https://images.unsplash.com/photo-1552053831-71594a27632d', // Good boy
    'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2', // Dog close-up
    'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e', // Cute dog
    'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9'  // Funny dog
  ]

  // Create a repeating grid pattern
  const GRID_SIZE = 20 // 20x20 grid that repeats
  const CELL_SIZE = 150 // pixels per cell
  const VISIBLE_BUFFER = 2 // Number of grid repeats to render around visible area

  // Generate grid cells with deterministic pattern
  const generateGridCells = useCallback(() => {
    const cells = []
    const totalCells = GRID_SIZE * GRID_SIZE
    
    for (let i = 0; i < totalCells; i++) {
      const row = Math.floor(i / GRID_SIZE)
      const col = i % GRID_SIZE
      
      // Deterministic photo selection based on position
      const photoIndex = (row * 3 + col * 7) % dogPhotos.length
      const sizeIndex = (row * 5 + col * 2) % sizes.length
      const colorIndex = (row * 2 + col * 3) % colors.length
      
      cells.push({
        id: `${row}-${col}`,
        photo: dogPhotos[photoIndex],
        size: sizes[sizeIndex],
        color: colors[colorIndex],
        row,
        col
      })
    }
    
    return cells
  }, [])

  const [gridCells] = useState(() => generateGridCells())

  // Initialize grid
  useEffect(() => {
    if (!gridRef.current || !containerRef.current) return

    const container = containerRef.current
    const grid = gridRef.current
    
    // Clear existing cells
    grid.innerHTML = ''
    
    // Create cells for visible area plus buffer
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const startCol = -Math.ceil(viewportWidth / CELL_SIZE / 2) - VISIBLE_BUFFER * GRID_SIZE
    const endCol = Math.ceil(viewportWidth / CELL_SIZE / 2) + VISIBLE_BUFFER * GRID_SIZE
    const startRow = -Math.ceil(viewportHeight / CELL_SIZE / 2) - VISIBLE_BUFFER * GRID_SIZE
    const endRow = Math.ceil(viewportHeight / CELL_SIZE / 2) + VISIBLE_BUFFER * GRID_SIZE
    
    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        // Use modulo to get the repeating pattern
        const gridRow = ((row % GRID_SIZE) + GRID_SIZE) % GRID_SIZE
        const gridCol = ((col % GRID_SIZE) + GRID_SIZE) % GRID_SIZE
        const cellData = gridCells[gridRow * GRID_SIZE + gridCol]
        
        const cell = document.createElement('div')
        cell.className = `${styles['photo-cell']} ${styles[cellData.size]}`
        cell.style.backgroundImage = `url(${cellData.photo})`
        cell.style.position = 'absolute'
        cell.style.left = `${col * CELL_SIZE}px`
        cell.style.top = `${row * CELL_SIZE}px`
        cell.style.width = cellData.size.includes('medium') || cellData.size.includes('large') ? `${CELL_SIZE * 2}px` : `${CELL_SIZE}px`
        cell.style.height = cellData.size.includes('tall') || cellData.size.includes('large') ? `${CELL_SIZE * 2}px` : `${CELL_SIZE}px`
        cell.dataset.row = row.toString()
        cell.dataset.col = col.toString()
        
        if (colorMode) {
          cell.classList.add(styles['overlay-color'], styles[cellData.color])
        }
        
        // Click to zoom
        cell.addEventListener('click', () => openZoom(cellData.photo))
        
        grid.appendChild(cell)
      }
    }
    
    // Center the view
    container.scrollLeft = viewportWidth / 2
    container.scrollTop = viewportHeight / 2
    
    setIsLoading(false)
  }, [gridCells, colorMode, currentLayout])

  // Handle infinite scroll
  useEffect(() => {
    if (!containerRef.current || !gridRef.current) return
    
    const container = containerRef.current
    const grid = gridRef.current
    let scrollTimeout: NodeJS.Timeout
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      
      scrollTimeout = setTimeout(() => {
        const scrollLeft = container.scrollLeft
        const scrollTop = container.scrollTop
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        
        // Calculate visible bounds
        const visibleLeft = scrollLeft - viewportWidth
        const visibleRight = scrollLeft + viewportWidth * 2
        const visibleTop = scrollTop - viewportHeight
        const visibleBottom = scrollTop + viewportHeight * 2
        
        // Remove cells that are far outside the viewport
        const cells = grid.querySelectorAll('[data-row]')
        cells.forEach(cell => {
          const cellElement = cell as HTMLElement
          const row = parseInt(cellElement.dataset.row!)
          const col = parseInt(cellElement.dataset.col!)
          const cellLeft = col * CELL_SIZE
          const cellTop = row * CELL_SIZE
          
          if (cellLeft < visibleLeft - CELL_SIZE * GRID_SIZE || 
              cellLeft > visibleRight + CELL_SIZE * GRID_SIZE ||
              cellTop < visibleTop - CELL_SIZE * GRID_SIZE || 
              cellTop > visibleBottom + CELL_SIZE * GRID_SIZE) {
            cellElement.remove()
          }
        })
        
        // Add new cells for newly visible areas
        const startCol = Math.floor((visibleLeft - CELL_SIZE * VISIBLE_BUFFER) / CELL_SIZE)
        const endCol = Math.ceil((visibleRight + CELL_SIZE * VISIBLE_BUFFER) / CELL_SIZE)
        const startRow = Math.floor((visibleTop - CELL_SIZE * VISIBLE_BUFFER) / CELL_SIZE)
        const endRow = Math.ceil((visibleBottom + CELL_SIZE * VISIBLE_BUFFER) / CELL_SIZE)
        
        for (let row = startRow; row <= endRow; row++) {
          for (let col = startCol; col <= endCol; col++) {
            // Check if cell already exists
            if (!grid.querySelector(`[data-row="${row}"][data-col="${col}"]`)) {
              // Use modulo to get the repeating pattern
              const gridRow = ((row % GRID_SIZE) + GRID_SIZE) % GRID_SIZE
              const gridCol = ((col % GRID_SIZE) + GRID_SIZE) % GRID_SIZE
              const cellData = gridCells[gridRow * GRID_SIZE + gridCol]
              
              const cell = document.createElement('div')
              cell.className = `${styles['photo-cell']} ${styles[cellData.size]}`
              cell.style.backgroundImage = `url(${cellData.photo})`
              cell.style.position = 'absolute'
              cell.style.left = `${col * CELL_SIZE}px`
              cell.style.top = `${row * CELL_SIZE}px`
              cell.style.width = cellData.size.includes('medium') || cellData.size.includes('large') ? `${CELL_SIZE * 2}px` : `${CELL_SIZE}px`
              cell.style.height = cellData.size.includes('tall') || cellData.size.includes('large') ? `${CELL_SIZE * 2}px` : `${CELL_SIZE}px`
              cell.dataset.row = row.toString()
              cell.dataset.col = col.toString()
              
              if (colorMode) {
                cell.classList.add(styles['overlay-color'], styles[cellData.color])
              }
              
              cell.addEventListener('click', () => openZoom(cellData.photo))
              
              grid.appendChild(cell)
            }
          }
        }
      }, 100) // Debounce scroll events
    }
    
    container.addEventListener('scroll', handleScroll)
    
    return () => {
      container.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [gridCells, colorMode])

  // Layout changes
  const changeLayout = (layout: 'random' | 'uniform' | 'pattern') => {
    setCurrentLayout(layout)
    // Re-render grid with new layout
    window.location.reload() // Simple solution for now
  }

  // Toggle color overlays
  const toggleColors = () => {
    setColorMode(!colorMode)
    
    // Update all existing cells
    if (gridRef.current) {
      const cells = gridRef.current.querySelectorAll(`.${styles['photo-cell']}`)
      cells.forEach((cell, i) => {
        const cellElement = cell as HTMLElement
        const row = parseInt(cellElement.dataset.row || '0')
        const col = parseInt(cellElement.dataset.col || '0')
        const gridRow = ((row % GRID_SIZE) + GRID_SIZE) % GRID_SIZE
        const gridCol = ((col % GRID_SIZE) + GRID_SIZE) % GRID_SIZE
        const cellData = gridCells[gridRow * GRID_SIZE + gridCol]
        
        if (!colorMode) {
          cellElement.classList.add(styles['overlay-color'], styles[cellData.color])
        } else {
          cellElement.classList.remove(styles['overlay-color'], ...colors.map(c => styles[c]))
        }
      })
    }
  }

  // Shuffle grid
  const shuffleGrid = () => {
    // Shuffle the photos array and reload
    dogPhotos.sort(() => Math.random() - 0.5)
    window.location.reload()
  }

  // Zoom functionality
  const openZoom = (imageSrc: string) => {
    setZoomedImage(imageSrc)
    setIsZoomOpen(true)
  }

  const closeZoom = () => {
    setIsZoomOpen(false)
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeZoom()
    }
    
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [])

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#fafafa]">
      {/* Scrollable Container */}
      <div 
        ref={containerRef}
        className={styles['scroll-container']}
      >
        {/* Infinite Grid */}
        <div 
          ref={gridRef}
          className={styles['infinite-grid']}
        />
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className={styles.loading}>Generating infinite mosaic...</div>
      )}

      {/* Control Panel */}
      <div className="fixed top-10 left-1/2 -translate-x-1/2 flex gap-2.5 z-[1000] bg-white px-2.5 py-2.5 rounded-[30px] shadow-lg">
        <button 
          className={`${styles['control-btn']} ${currentLayout === 'random' ? styles['active'] : ''}`}
          onClick={() => changeLayout('random')}
        >
          Random
        </button>
        <button 
          className={`${styles['control-btn']} ${currentLayout === 'uniform' ? styles['active'] : ''}`}
          onClick={() => changeLayout('uniform')}
        >
          Uniform
        </button>
        <button 
          className={`${styles['control-btn']} ${currentLayout === 'pattern' ? styles['active'] : ''}`}
          onClick={() => changeLayout('pattern')}
        >
          Pattern
        </button>
        <button 
          className={`${styles['control-btn']} ${colorMode ? styles['active'] : ''}`}
          onClick={toggleColors}
        >
          Colors
        </button>
        <button 
          className={styles['control-btn']}
          onClick={shuffleGrid}
        >
          Shuffle
        </button>
      </div>

      {/* Zoom Overlay */}
      <div 
        className={`${styles['zoom-overlay']} ${isZoomOpen ? styles['active'] : ''}`}
        onClick={closeZoom}
      >
        <div 
          className={styles['zoomed-photo']}
          style={{ backgroundImage: `url(${zoomedImage})` }}
        />
      </div>
    </div>
  )
}