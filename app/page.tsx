'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen relative flex items-end">
      {/* Background image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/thinker.png)',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundColor: '#000'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 w-full pb-6 md:pb-12">
        <div className="w-full max-w-3xl mx-auto px-4">
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
  );
}