'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, ReactNode, useRef } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const prevPathname = useRef(pathname)

  useEffect(() => {
    // Only transition if the pathname actually changed
    if (prevPathname.current !== pathname) {
      setIsTransitioning(true)
      prevPathname.current = pathname
      
      const timeout = setTimeout(() => {
        setIsTransitioning(false)
      }, 600)

      return () => clearTimeout(timeout)
    }
  }, [pathname])

  return (
    <>
      <div className={`page-transition-curtain ${isTransitioning ? 'active' : ''}`}>
        <div className="curtain-slice"></div>
        <div className="curtain-slice"></div>
        <div className="curtain-slice"></div>
        <div className="curtain-slice"></div>
        <div className="curtain-slice"></div>
      </div>
      <div className={`page-content ${isTransitioning ? 'transitioning' : ''}`}>
        {children}
      </div>
    </>
  )
}