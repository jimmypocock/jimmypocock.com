'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransitionTech({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    setIsTransitioning(true)
    
    const timeout = setTimeout(() => {
      setDisplayChildren(children)
      setIsTransitioning(false)
    }, 500)

    return () => clearTimeout(timeout)
  }, [pathname, children])

  return (
    <>
      <div className={`page-transition-tech ${isTransitioning ? 'active' : ''}`}>
        <div className="transition-grid">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="grid-cell" style={{ '--index': i } as React.CSSProperties}></div>
          ))}
        </div>
        <div className="glitch-text">{isTransitioning ? 'LOADING' : ''}</div>
      </div>
      <div className={`page-content ${isTransitioning ? 'transitioning' : ''}`}>
        {displayChildren}
      </div>
    </>
  )
}