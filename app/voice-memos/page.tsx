'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function VoiceMemosPage() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState('9:41')

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

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f7] to-[#e8e8ed] flex flex-col justify-center items-center px-5 py-10">
      {/* Go Home Button */}
      <button 
        className="absolute top-4 left-4 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-sm text-black"
        onClick={() => router.push('/')}
      >
        Go Home
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-[56px] font-semibold bg-gradient-to-br from-black to-[#434343] bg-clip-text text-transparent mb-3 tracking-tight">
          Voice Memos
        </h1>
        <p className="text-lg md:text-[21px] text-[#6e6e73] font-normal">
          Captured moments. Unfiltered creativity.
        </p>
      </div>

      {/* iPhone - Using actual smaller dimensions instead of scale */}
      <div className="relative">
        <div className="w-[273px] h-[590px] sm:w-[312px] sm:h-[675px] md:w-[351px] md:h-[760px] lg:w-[400px] lg:h-[800px] bg-[#1c1c1e] rounded-[42px] sm:rounded-[48px] md:rounded-[54px] lg:rounded-[60px] p-2 lg:p-3 shadow-2xl">
          {/* Screen */}
          <div className="w-full h-full bg-black rounded-[34px] sm:rounded-[38px] md:rounded-[42px] lg:rounded-[48px] overflow-hidden relative">
            {/* Dynamic Island */}
            <div className="absolute top-2 sm:top-3 lg:top-4 left-1/2 -translate-x-1/2 w-[88px] sm:w-[100px] md:w-[113px] lg:w-[126px] h-[24px] sm:h-[28px] md:h-[31px] lg:h-[35px] bg-black rounded-full z-20" />
            
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-8 sm:h-9 lg:h-11 flex justify-between items-center px-6 sm:px-8 lg:px-10 pt-2 lg:pt-3 z-10">
              <div className="text-white text-xs sm:text-xs lg:text-sm font-semibold">{currentTime}</div>
              <div className="flex gap-1 items-center">
                <svg className="w-3 sm:w-3.5 lg:w-4 h-3 sm:h-3.5 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <svg className="w-3 sm:w-3.5 lg:w-4 h-3 sm:h-3.5 lg:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1v0a1 1 0 011 1v0a1 1 0 01-1 1v0a1 1 0 01-1-1v0z" clipRule="evenodd" />
                </svg>
                <div className="flex items-center gap-0.5">
                  <div className="w-5 lg:w-6 h-2.5 lg:h-3 border border-white/30 rounded-sm">
                    <div className="w-4 lg:w-5 h-1.5 lg:h-2 bg-white rounded-sm m-[1px]" />
                  </div>
                  <div className="w-0.5 lg:w-1 h-0.5 lg:h-1 bg-white/30 rounded-full" />
                </div>
              </div>
            </div>

            {/* SoundCloud Embed - Full Screen */}
            <div className="absolute inset-0 pt-8 sm:pt-9 lg:pt-11 bg-[#1c1c1e]">
              <iframe 
                width="100%" 
                height="100%" 
                scrolling="no" 
                frameBorder="no" 
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/2049446895&color=%23211717&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-[600px] mt-12 text-center">
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