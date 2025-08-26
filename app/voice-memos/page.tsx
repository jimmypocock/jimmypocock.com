'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from './voice-memos.module.css'

export default function VoiceMemosPage() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState('9:41')
  const [isFloating, setIsFloating] = useState(false)
  const iphoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Update time in status bar
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    // Add floating animation after load
    const floatTimeout = setTimeout(() => {
      setIsFloating(true)
    }, 1500)

    return () => {
      clearInterval(interval)
      clearTimeout(floatTimeout)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!iphoneRef.current) return
      const x = (e.clientX - window.innerWidth / 2) / 100
      const y = (e.clientY - window.innerHeight / 2) / 100
      iphoneRef.current.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`
    }

    const handleMouseLeave = () => {
      if (!iphoneRef.current) return
      iphoneRef.current.style.transform = 'perspective(1000px) rotateX(2deg)'
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f7] to-[#e8e8ed] flex flex-col justify-center items-center px-5 py-10 relative overflow-x-hidden">
      {/* Go Home Button */}
      <button 
        className="fixed top-6 left-6 z-50 bg-white/95 backdrop-blur px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm font-medium text-[#1d1d1f] hover:bg-white"
        onClick={() => router.push('/')}
      >
        Go Home
      </button>

      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-[rgba(120,119,198,0.05)] via-transparent to-transparent opacity-50" style={{ backgroundPosition: '20% 80%' }} />
        <div className="absolute inset-0 bg-gradient-radial from-[rgba(255,119,198,0.05)] via-transparent to-transparent opacity-50" style={{ backgroundPosition: '80% 20%' }} />
        <div className="absolute inset-0 bg-gradient-radial from-[rgba(120,219,255,0.05)] via-transparent to-transparent opacity-50" style={{ backgroundPosition: '40% 40%' }} />
      </div>

      {/* Header */}
      <div className={`text-center mb-15 ${styles['animate-fadeInDown']} relative z-10`}>
        <h1 className="text-5xl md:text-[56px] font-semibold bg-gradient-to-br from-black to-[#434343] bg-clip-text text-transparent mb-3 tracking-tight">
          Voice Memos
        </h1>
        <p className="text-lg md:text-[21px] text-[#6e6e73] font-normal tracking-wide leading-relaxed">
          Captured moments. Unfiltered creativity.
        </p>
      </div>

      {/* iPhone Container */}
      <div className={`relative ${styles['animate-fadeInUp']} ${styles['animation-delay-300']} ${isFloating ? styles['animate-float'] : ''}`}>
        <div 
          ref={iphoneRef}
          className="w-[844px] h-[390px] bg-[#1c1c1e] rounded-[44px] p-[14px] relative shadow-device transform perspective-1000 rotate-x-2 transition-transform duration-500 hover:rotate-x-0 hover:scale-102 max-w-[90vw] md:max-w-[844px] scale-[0.6] md:scale-[0.8] lg:scale-[0.9] xl:scale-100"
          style={{ boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1), 0 20px 60px rgba(0, 0, 0, 0.15), 0 40px 120px rgba(0, 0, 0, 0.1)' }}
        >
          {/* Screen */}
          <div className="w-full h-full bg-black rounded-[30px] overflow-hidden relative flex items-center justify-center">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-8 bg-black rounded-[20px] z-[11] shadow-island" />
            
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-[30px] bg-black/80 backdrop-blur-[10px] flex justify-between items-center px-9 z-10">
              <div className="text-white text-xs font-semibold">{currentTime}</div>
              <div className="flex gap-1.5 items-center text-white text-xs">
                <span>⚡</span>
                <span>📶</span>
                <span>📵</span>
                <span>100%</span>
              </div>
            </div>

            {/* App Interface */}
            <div className="w-full h-full pt-[45px] px-9 pb-5 flex flex-col bg-gradient-to-b from-[#1c1c1e] to-[#2c2c2e]">
              {/* Player Container */}
              <div className="flex-1 bg-white/5 rounded-xl overflow-hidden shadow-player relative">
                <iframe 
                  width="100%" 
                  height="100%" 
                  scrolling="no" 
                  frameBorder="no" 
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/2049446895&color=%23211717&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                />
                <div className={`absolute inset-0 pointer-events-none ${styles['animate-shimmer']} bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -left-full`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className={`max-w-[600px] mt-15 text-center ${styles['animate-fadeInUp']} ${styles['animation-delay-600']} relative z-10`}>
        <p className="text-[17px] leading-relaxed text-[#6e6e73] mb-6">
          Raw ideas captured in their purest form. From late-night melodies to shower acoustics,
          every track began as a simple voice memo on this iPhone.
        </p>
        <div className="flex justify-center gap-10 flex-wrap">
          <div className="flex flex-col items-center">
            <span className="text-xs text-[#86868b] uppercase tracking-wider mb-1">Recorded On</span>
            <span className="text-[21px] text-[#1d1d1f] font-semibold">iPhone</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-[#86868b] uppercase tracking-wider mb-1">Format</span>
            <span className="text-[21px] text-[#1d1d1f] font-semibold">Voice Memo</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-[#86868b] uppercase tracking-wider mb-1">Quality</span>
            <span className="text-[21px] text-[#1d1d1f] font-semibold">Authentic</span>
          </div>
        </div>
      </div>
    </div>
  )
}