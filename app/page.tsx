'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="fixed inset-0 bg-black overflow-visible">
      {/* Image - scaled 300% width, 140% height */}
      <div className="fixed top-[65%] left-[22%] -translate-x-1/2 -translate-y-1/2 w-[300vw] h-[140vh] pointer-events-none z-0">
        <Image
          src="/thinker.png"
          alt="The Thinker"
          fill
          sizes="300vw"
          className="object-contain"
          priority
        />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row">
        {/* Spacer for image area on desktop */}
        <div className="hidden lg:block lg:w-1/2"></div>
        
        {/* Text content on the right */}
        <div className="w-full lg:w-1/2 h-full overflow-y-auto flex px-4 sm:px-8">
        <div className="py-8">
          <h1 className="text-white text-3xl md:text-6xl mb-6 tracking-widest lowercase">
            jimmy pocock
          </h1>
          <p className="text-white text-base md:text-xl mb-2 tracking-wider">
            <a 
              href="https://www.github.com/jimmypocock" 
              title="github"
              className="text-white font-semibold tracking-widest hover:opacity-70 transition-opacity duration-300"
              target="_blank"
            >
              engineer
            </a>
            <span className="text-gray-300">{' '}in austin, tx</span>
          </p>
          <p className="text-gray-300 text-base md:text-xl mb-6 tracking-wider">
            let&apos;s{' '}
            <a 
              href="https://www.linkedin.com/in/jimmypocock" 
              title="email"
              className="text-white font-semibold tracking-widest hover:opacity-70 transition-opacity duration-300"
              target="_blank"
            >
              talk
            </a>
            {' '}about code
          </p>
          <p className="text-gray-300 text-base md:text-xl mb-2 tracking-wider">
            i built{' '}
            <a 
              href="https://www.roverpass.com" 
              title="roverpass.com"
              className="text-white font-semibold tracking-widest hover:opacity-70 transition-opacity duration-300"
              target="_blank"
            >
              roverpass
            </a>
          </p>
          <p className="text-gray-300 text-base md:text-xl mb-2 tracking-wider">
            i built{' '}
            <a 
              href="https://www.vocaltechniquetranslator.com" 
              title="vocaltechniquetranslator.com"
              className="text-white font-semibold tracking-widest hover:opacity-70 transition-opacity duration-300"
              target="_blank"
            >
              vocal technique translator
            </a>
          </p>
          <p className="text-gray-300 text-base md:text-xl mb-2 tracking-wider">
            i built{' '}
            <a 
              href="https://www.songsnips.com" 
              title="songsnips.com"
              className="text-white font-semibold tracking-widest hover:opacity-70 transition-opacity duration-300"
              target="_blank"
            >
              songsnips
            </a>
          </p>
          <p className="text-gray-300 text-base md:text-xl mb-2 tracking-wider">
            currently building{' '}
            <a 
              href="https://www.famefitapp.com" 
              title="famefitapp.com"
              className="text-white font-semibold tracking-widest hover:opacity-70 transition-opacity duration-300"
              target="_blank"
            >
              famefit
            </a>
          </p>
          <p className="text-gray-300 text-base md:text-xl mb-2 tracking-wider">
            hear my{' '}
            <Link 
              href="/voice-memos" 
              className="text-white font-semibold tracking-widest hover:opacity-70 transition-opacity duration-300"
            >
              music
            </Link>
          </p>
          <p className="text-gray-300 text-base md:text-xl mb-2 tracking-wider">
            see my{' '}
            <Link 
              href="/rae" 
              className="text-white font-semibold tracking-widest hover:opacity-70 transition-opacity duration-300"
            >
              dog
            </Link>
          </p>
          <p className="text-gray-300 text-base md:text-xl mb-2 tracking-wider">
            read my{' '}
            <Link 
              href="/thoughts" 
              className="text-white font-semibold tracking-widest hover:opacity-70 transition-opacity duration-300"
            >
              thoughts
            </Link>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}