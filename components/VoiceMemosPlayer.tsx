'use client'

import { useState, useRef, useEffect } from 'react'

interface VoiceMemo {
  id: string
  title: string
  date: string
  duration: string
  audioUrl: string
}

const voiceMemos: VoiceMemo[] = [
  {
    id: '1',
    title: 'Love Song',
    date: 'July 7, 2025',
    duration: '2:32',
    audioUrl: '/audio/love_song.m4a'
  },
  {
    id: '2',
    title: 'The Other Man',
    date: 'July 7, 2025',
    duration: '4:00',
    audioUrl: '/audio/the_other_man.m4a'
  },
  {
    id: '3',
    title: "That's Alright",
    date: 'July 7, 2025',
    duration: '4:20',
    audioUrl: '/audio/thats_alright.m4a'
  },
  {
    id: '4',
    title: 'Just Another Night',
    date: 'July 7, 2025',
    duration: '3:29',
    audioUrl: '/audio/just_another_night.m4a'
  },
  {
    id: '5',
    title: 'On Christmas Day',
    date: 'July 7, 2025',
    duration: '3:25',
    audioUrl: '/audio/on_christmas_day.m4a'
  },
  {
    id: '6',
    title: 'To Be Again',
    date: 'July 7, 2025',
    duration: '4:31',
    audioUrl: '/audio/to_be_again.m4a'
  }
]

export default function VoiceMemosPlayer() {
  const [currentMemo, setCurrentMemo] = useState<VoiceMemo | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [shouldPlay, setShouldPlay] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
    }

    const setAudioTime = () => setCurrentTime(audio.currentTime)

    audio.addEventListener('loadeddata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)

    return () => {
      audio.removeEventListener('loadeddata', setAudioData)
      audio.removeEventListener('timeupdate', setAudioTime)
    }
  }, [currentMemo])

  useEffect(() => {
    if (shouldPlay && audioRef.current && currentMemo) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
          setShouldPlay(false)
        })
        .catch(() => {
          setIsPlaying(false)
          setShouldPlay(false)
        })
    }
  }, [currentMemo, shouldPlay])

  const togglePlayPause = (memo: VoiceMemo) => {
    if (currentMemo?.id === memo.id) {
      const audio = audioRef.current
      if (audio) {
        if (isPlaying) {
          audio.pause()
          setIsPlaying(false)
        } else {
          audio.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false))
        }
      }
    } else {
      setCurrentMemo(memo)
      setShouldPlay(true)
      setIsPlaying(false)
    }
  }

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const time = Number(e.target.value)
    audio.currentTime = time
    setCurrentTime(time)
  }

  return (
    <div className="h-full flex flex-col bg-black">
      <div className="px-4 pt-12 pb-3 border-b border-gray-800">
        <h1 className="text-white text-3xl font-bold">Voice Memos</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {voiceMemos.map((memo) => (
          <div
            key={memo.id}
            className={`px-4 py-3 border-b border-gray-800 cursor-pointer transition-colors ${
              currentMemo?.id === memo.id ? 'bg-gray-900' : 'hover:bg-gray-950'
            }`}
            onClick={() => togglePlayPause(memo)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    currentMemo?.id === memo.id && isPlaying
                      ? 'bg-red-600'
                      : 'bg-gray-700'
                  }`}
                >
                  {currentMemo?.id === memo.id && isPlaying ? (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <div>
                  <div className="text-white text-sm font-medium">{memo.title}</div>
                  <div className="text-gray-400 text-xs">{memo.date}</div>
                </div>
              </div>
              <div className="text-gray-400 text-sm">{memo.duration}</div>
            </div>
            
            {currentMemo?.id === memo.id && (
              <div className="mt-3 px-10">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-xs w-10">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <span className="text-gray-400 text-xs w-10 text-right">{formatTime(duration)}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="px-4 py-4 border-t border-gray-800 bg-black">
        <div className="flex justify-center">
          <button className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full" />
          </button>
        </div>
        <p className="text-center text-gray-500 text-xs mt-2">Tap to record</p>
      </div>

      {currentMemo && (
        <audio
          ref={audioRef}
          src={currentMemo.audioUrl}
          onEnded={() => setIsPlaying(false)}
          onError={() => {
            setIsPlaying(false)
          }}
          preload="auto"
        />
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          background: white;
          cursor: pointer;
          border-radius: 50%;
        }

        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: white;
          cursor: pointer;
          border-radius: 50%;
          border: none;
        }
      `}</style>
    </div>
  )
}