'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransitionWave({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    setIsTransitioning(true)
    
    const timeout = setTimeout(() => {
      setDisplayChildren(children)
      setIsTransitioning(false)
    }, 800)

    return () => clearTimeout(timeout)
  }, [pathname, children])

  return (
    <>
      <div className={`page-transition-wave ${isTransitioning ? 'active' : ''}`}>
        <svg viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path
            className="wave-path"
            d="M0,0 Q600,400 1200,0 L1200,800 L0,800 Z"
          />
        </svg>
      </div>
      <div className={`page-content ${isTransitioning ? 'transitioning' : ''}`}>
        {displayChildren}
      </div>
    </>
  )
}