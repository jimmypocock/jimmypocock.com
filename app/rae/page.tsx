'use client'

import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './mosaic.module.css'

// Image aspect ratios and their grid spans
const ASPECT_RATIOS = {
  'square': { width: 1, height: 1, gridWidth: 1, gridHeight: 1 },           // 1:1
  'landscape': { width: 3, height: 2, gridWidth: 2, gridHeight: 1 },        // 3:2
  'landscape-wide': { width: 16, height: 9, gridWidth: 3, gridHeight: 2 },  // 16:9
  'portrait': { width: 2, height: 3, gridWidth: 1, gridHeight: 2 },         // 2:3
  'portrait-tall': { width: 9, height: 16, gridWidth: 2, gridHeight: 3 },   // 9:16
  'panoramic': { width: 21, height: 9, gridWidth: 4, gridHeight: 2 },       // 21:9
  'square-large': { width: 1, height: 1, gridWidth: 2, gridHeight: 2 },     // 1:1 but bigger
}

type AspectRatioKey = keyof typeof ASPECT_RATIOS

// Photo data structure
interface PhotoData {
  url: string
  aspectRatio: AspectRatioKey
}

export default function RaePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [zoomedImage, setZoomedImage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const renderedCells = useRef<Set<string>>(new Set())
  
  // Detect mobile device
  const [isMobile, setIsMobile] = useState(false)
  
  // Function to randomly assign aspect ratios to images
  const getRandomAspectRatio = (): AspectRatioKey => {
    const ratios: AspectRatioKey[] = [
      'square', 'square', 'square',  // 30% squares (they fill gaps well)
      'landscape', 'landscape',        // 20% landscape
      'portrait', 'portrait',          // 20% portrait
      'landscape-wide',                // 10% wide landscape
      'portrait-tall',                 // 10% tall portrait
      'square-large',                  // 10% large squares
    ]
    return ratios[Math.floor(Math.random() * ratios.length)]
  }

  // Generate photo data with randomized aspect ratios
  const dogPhotos: PhotoData[] = useMemo(() => {
    const photos: PhotoData[] = []
    
    // Total available Rae images
    const imageCount = 198
    
    // Create array of all available image indices
    const allIndices = Array.from({ length: imageCount }, (_, i) => i + 1)
    
    // Randomly select subset for both mobile and desktop
    const mobileImageLimit = 25
    const desktopImageLimit = 100
    const imageLimit = isMobile ? mobileImageLimit : desktopImageLimit
    
    // Shuffle and select random subset
    const indicesToUse = allIndices
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(imageLimit, imageCount))
    
    for (const i of indicesToUse) {
      photos.push({
        url: `/images/rae/rae-${i}.webp`,
        aspectRatio: getRandomAspectRatio()
      })
    }
    
    // Shuffle the array for more randomness
    return photos.sort(() => Math.random() - 0.5)
  }, [isMobile])
  
  useEffect(() => {
    const checkMobile = () => {
      // Check for ?mobile=true query parameter for testing
      const forceMobile = searchParams.get('mobile') === 'true'
      
      if (forceMobile) {
        setIsMobile(true)
        return
      }
      
      // Better mobile detection: check for touch support AND small screen
      // or common mobile user agents
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth <= 768
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
      // Consider it mobile if:
      // 1. It has a mobile user agent, OR
      // 2. It has touch support AND a small screen
      const mobile = isMobileUserAgent || (hasTouch && isSmallScreen)
      setIsMobile(mobile)
    }
    checkMobile()
    
    // Re-check on resize in case device orientation changes
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [searchParams])

  // Base cell size and grid dimensions - smaller on mobile
  const BASE_SIZE = isMobile ? 100 : 120 // pixels
  const GRID_COLUMNS = isMobile ? 6 : 30 // Smaller grid for mobile - roughly fits 20 images
  const GRID_ROWS = isMobile ? 8 : 30 // Smaller grid for mobile

  // Pre-generate a layout pattern for the repeating grid
  const generateLayoutPattern = useCallback(() => {
    const pattern: Array<{
      photo: PhotoData,
      gridColumn: number,
      gridRow: number,
      spanX: number,
      spanY: number
    }> = []
    
    const occupied = new Set<string>()
    
    // Try to place each photo type in the grid
    let photoIndex = 0
    
    for (let row = 0; row < GRID_ROWS; row += 2) {
      for (let col = 0; col < GRID_COLUMNS; col += 2) {
        // Check if this position is already occupied
        const key = `${col},${row}`
        if (occupied.has(key)) continue
        
        // Get next photo and its aspect ratio
        const photo = dogPhotos[photoIndex % dogPhotos.length]
        const ratio = ASPECT_RATIOS[photo.aspectRatio]
        
        // Check if this photo fits at this position
        let fits = true
        for (let y = row; y < row + ratio.gridHeight && y < GRID_ROWS; y++) {
          for (let x = col; x < col + ratio.gridWidth && x < GRID_COLUMNS; x++) {
            if (occupied.has(`${x},${y}`)) {
              fits = false
              break
            }
          }
          if (!fits) break
        }
        
        if (fits) {
          // Mark cells as occupied
          for (let y = row; y < row + ratio.gridHeight && y < GRID_ROWS; y++) {
            for (let x = col; x < col + ratio.gridWidth && x < GRID_COLUMNS; x++) {
              occupied.add(`${x},${y}`)
            }
          }
          
          pattern.push({
            photo,
            gridColumn: col,
            gridRow: row,
            spanX: ratio.gridWidth,
            spanY: ratio.gridHeight
          })
          
          photoIndex++
        }
      }
    }
    
    // Fill any remaining gaps with square images
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLUMNS; col++) {
        if (!occupied.has(`${col},${row}`)) {
          pattern.push({
            photo: dogPhotos[photoIndex % dogPhotos.length],
            gridColumn: col,
            gridRow: row,
            spanX: 1,
            spanY: 1
          })
          photoIndex++
        }
      }
    }
    
    return pattern
  }, [dogPhotos])

  const [layoutPattern] = useState(() => generateLayoutPattern())

  // Zoom functionality
  const openZoom = useCallback((imageSrc: string) => {
    setZoomedImage(imageSrc)
    setIsZoomOpen(true)
  }, [])

  // Create a cell element
  const createCell = useCallback((
    photo: PhotoData,
    worldX: number,
    worldY: number,
    spanX: number,
    spanY: number
  ) => {
    const cell = document.createElement('div')
    cell.className = styles['photo-cell']
    cell.style.backgroundImage = `url(${photo.url})`
    cell.style.position = 'absolute'
    cell.style.left = `${worldX * BASE_SIZE}px`
    cell.style.top = `${worldY * BASE_SIZE}px`
    cell.style.width = `${spanX * BASE_SIZE - 4}px` // -4 for gap
    cell.style.height = `${spanY * BASE_SIZE - 4}px` // -4 for gap
    cell.dataset.worldX = worldX.toString()
    cell.dataset.worldY = worldY.toString()
    
    // Add aspect ratio class for special styling
    cell.classList.add(styles[`aspect-${photo.aspectRatio}`])
    
    cell.addEventListener('click', () => openZoom(photo.url))
    
    return cell
  }, [openZoom])

  // Render visible cells
  const renderVisibleCells = useCallback(() => {
    if (!containerRef.current || !gridRef.current) return
    
    const container = containerRef.current
    const grid = gridRef.current
    
    const scrollLeft = container.scrollLeft
    const scrollTop = container.scrollTop
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    // Calculate visible bounds with buffer - smaller buffer for mobile
    const buffer = isMobile ? 200 : 500 // pixels - much smaller buffer on mobile
    const visibleLeft = Math.floor((scrollLeft - buffer) / BASE_SIZE)
    const visibleRight = Math.ceil((scrollLeft + viewportWidth + buffer) / BASE_SIZE)
    const visibleTop = Math.floor((scrollTop - buffer) / BASE_SIZE)
    const visibleBottom = Math.ceil((scrollTop + viewportHeight + buffer) / BASE_SIZE)
    
    // Track which cells should be visible
    const shouldBeVisible = new Set<string>()
    
    // Calculate which pattern cells should be visible
    for (let worldRow = visibleTop; worldRow < visibleBottom; worldRow++) {
      for (let worldCol = visibleLeft; worldCol < visibleRight; worldCol++) {
        // Find which pattern cell this world coordinate maps to
        const patternCol = ((worldCol % GRID_COLUMNS) + GRID_COLUMNS) % GRID_COLUMNS
        const patternRow = ((worldRow % GRID_ROWS) + GRID_ROWS) % GRID_ROWS
        
        // Find the pattern cell that covers this position
        const patternCell = layoutPattern.find(cell => {
          return patternCol >= cell.gridColumn &&
                 patternCol < cell.gridColumn + cell.spanX &&
                 patternRow >= cell.gridRow &&
                 patternRow < cell.gridRow + cell.spanY
        })
        
        if (patternCell) {
          // Calculate the actual world position for this cell
          const cellWorldCol = worldCol - (patternCol - patternCell.gridColumn)
          const cellWorldRow = worldRow - (patternRow - patternCell.gridRow)
          const cellKey = `${cellWorldCol},${cellWorldRow}`
          
          if (!renderedCells.current.has(cellKey)) {
            shouldBeVisible.add(cellKey)
            
            // Create and add the cell
            const cell = createCell(
              patternCell.photo,
              cellWorldCol,
              cellWorldRow,
              patternCell.spanX,
              patternCell.spanY
            )
            
            grid.appendChild(cell)
            renderedCells.current.add(cellKey)
          }
        }
      }
    }
    
    // Remove cells that are no longer visible - more aggressive on mobile
    const cleanupBuffer = isMobile ? 3 : 10
    const cells = grid.querySelectorAll('[data-world-x]')
    cells.forEach(cell => {
      const element = cell as HTMLElement
      const x = parseInt(element.dataset.worldX || '0')
      const y = parseInt(element.dataset.worldY || '0')
      const key = `${x},${y}`
      
      if (x < visibleLeft - cleanupBuffer || x > visibleRight + cleanupBuffer ||
          y < visibleTop - cleanupBuffer || y > visibleBottom + cleanupBuffer) {
        element.remove()
        renderedCells.current.delete(key)
      }
    })
  }, [layoutPattern, createCell, isMobile])

  // Initialize grid
  useEffect(() => {
    if (!gridRef.current || !containerRef.current) return
    
    const container = containerRef.current
    
    // Clear existing cells
    gridRef.current.innerHTML = ''
    renderedCells.current.clear()
    
    // Initial render
    renderVisibleCells()
    
    // Center the view - calculated based on actual grid size
    if (isMobile) {
      const mobileWorldWidth = 6 * 100 * 3  // GRID_COLUMNS * BASE_SIZE * repetitions
      const mobileWorldHeight = 8 * 100 * 3  // GRID_ROWS * BASE_SIZE * repetitions
      container.scrollLeft = mobileWorldWidth / 2 - window.innerWidth / 2
      container.scrollTop = mobileWorldHeight / 2 - window.innerHeight / 2
    } else {
      container.scrollLeft = 2000
      container.scrollTop = 2000
    }
    
    setIsLoading(false)
  }, [renderVisibleCells])

  // Handle scroll
  useEffect(() => {
    if (!containerRef.current) return
    
    const container = containerRef.current
    let scrollTimeout: NodeJS.Timeout
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        renderVisibleCells()
      }, isMobile ? 100 : 50) // Slower response on mobile to reduce CPU usage
    }
    
    container.addEventListener('scroll', handleScroll)
    
    return () => {
      container.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [renderVisibleCells])

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
        {/* Infinite Grid - properly sized for content */}
        <div 
          ref={gridRef}
          className={styles['infinite-grid']}
          style={{
            // Size based on grid dimensions × cell size
            // Mobile: 6 cols × 100px = 600px minimum, but we want some scrolling room
            // We'll make it 3x3 repetitions of the pattern for mobile
            width: isMobile ? `${GRID_COLUMNS * BASE_SIZE * 3}px` : '20000px',
            height: isMobile ? `${GRID_ROWS * BASE_SIZE * 3}px` : '20000px'
          }}
        />
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className={styles.loading}>
          {isMobile ? 'Loading mobile-optimized mosaic...' : 'Generating mosaic...'}
        </div>
      )}

      {/* Control Panel */}
      <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[1000] bg-white/95 backdrop-blur px-4 py-3 rounded-full shadow-lg">
        <button 
          className={styles['control-btn']}
          onClick={() => router.push('/')}
        >
          Go Home
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

/* 
RECOMMENDED IMAGE SPECIFICATIONS:

Aspect Ratios to prepare:
1. Square (1:1) - Instagram style, face close-ups
2. Landscape (3:2) - Classic photo ratio, good for side profiles
3. Portrait (2:3) - Vertical shots, sitting/standing dogs
4. Wide Landscape (16:9) - Cinematic, action shots, multiple dogs
5. Tall Portrait (9:16) - Phone style vertical, full body shots
6. Panoramic (21:9) - Ultra-wide shots, dogs running

Image Count Recommendations:
- Minimum: 50-60 images total for good variety
- Optimal: 100-150 images (the pattern repeats but with enough variety it won't be noticeable)
- Maximum before performance impact: 200-300 unique images

Distribution suggestion:
- 30% Square (1:1) - These fill gaps nicely
- 25% Landscape (3:2)
- 20% Portrait (2:3)
- 15% Wide Landscape (16:9)
- 5% Tall Portrait (9:16)
- 5% Panoramic (21:9)

The system only loads images that are visible (plus a small buffer), so even with 200+ images, 
only about 20-40 will be loaded at any given time, keeping performance smooth.
*/
