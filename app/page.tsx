'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="fixed inset-0 bg-black overflow-visible">
      {/* Image - scaled 300% width, 140% height */}
      <div className="fixed top-[65%] left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300vw] h-[140vh] pointer-events-none z-0">
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
              className="text-[#ff6100] uppercase tracking-widest hover:underline text-bold"
              target="_blank"
            >
              engineer
            </a>
            {' '}in austin, tx
          </p>
          <p className="text-white text-base md:text-xl mb-2 tracking-wider">
            i built{' '}
            <a 
              href="https://www.roverpass.com" 
              title="roverpass.com"
              className="text-[#ff6100] uppercase tracking-widest hover:underline"
              target="_blank"
            >
              roverpass
            </a>
          </p>
          <p className="text-white text-base md:text-xl mb-2 tracking-wider">
            i built{' '}
            <a 
              href="https://www.vocaltechniquetranslator.com" 
              title="vocaltechniquetranslator.com"
              className="text-[#ff6100] uppercase tracking-widest hover:underline"
              target="_blank"
            >
              vocal technique translator
            </a>
          </p>
          <p className="text-white text-base md:text-xl mb-2 tracking-wider">
            i built{' '}
            <a 
              href="https://www.songsnips.com" 
              title="songsnips.com"
              className="text-[#ff6100] uppercase tracking-widest hover:underline"
              target="_blank"
            >
              songsnips
            </a>
          </p>
          <p className="text-white text-base md:text-xl mb-2 tracking-wider">
            currently building{' '}
            <a 
              href="https://www.famefitapp.com" 
              title="famefitapp.com"
              className="text-[#ff6100] uppercase tracking-widest hover:underline"
              target="_blank"
            >
              famefit
            </a>
          </p>
          <p className="text-white text-base md:text-xl mb-6 tracking-wider">
            let&apos;s{' '}
            <a 
              href="https://www.linkedin.com/in/jimmypocock" 
              title="email"
              className="text-[#ff6100] uppercase tracking-widest hover:underline"
              target="_blank"
            >
              talk
            </a>
            {' '}about code
          </p>
          <p className="text-white text-base md:text-xl mb-2 tracking-wider">
            hear my{' '}
            <Link 
              href="/voice-memos" 
              className="text-[#ff6100] uppercase tracking-widest hover:underline"
            >
              music
            </Link>
          </p>
          <p className="text-white text-base md:text-xl mb-2 tracking-wider">
            see my{' '}
            <Link 
              href="/rae" 
              className="text-[#ff6100] uppercase tracking-widest hover:underline"
            >
              dog
            </Link>
          </p>
          <p className="text-white text-base md:text-xl mb-2 tracking-wider">
            read my{' '}
            <Link 
              href="/thoughts" 
              className="text-[#ff6100] uppercase tracking-widest hover:underline"
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