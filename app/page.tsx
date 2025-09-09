'use client';

import Link from 'next/link';
import Image from 'next/image';

interface LinkItem {
  prefix?: string;
  text: string;
  href: string;
  title?: string;
  suffix?: string;
  external?: boolean;
}

export default function Home() {
  const professionalItems: LinkItem[] = [
    // Add your professional website links here
    // Example: { prefix: 'built', text: 'example.com', href: 'https://example.com', external: true },
    { prefix: 'i built', text: 'roverpass', href: 'https://www.roverpass.com/', external: true },
    { prefix: 'i built', text: 'vocal technique translator', href: 'https://www.vocaltechniquetranslator.com/', external: true },
    { prefix: 'i built', text: 'songsnips', href: 'https://www.songsnips.com/', external: true },
    { prefix: 'i built', text: 'aws cost delta monitor', href: 'https://github.com/jimmypocock/AWSDeltaCostUsage', external: true },
  ];

  const personalItems: LinkItem[] = [
    { prefix: 'hear my', text: 'music', href: '/voice-memos' },
    { prefix: 'see my', text: 'dog', href: '/rae' },
    // { prefix: 'read my', text: 'thoughts', href: '/thoughts' },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
        {/* The Thinker Image */}
        <div className="absolute top-[65%] left-[50%] lg:left-[22%] -translate-x-1/2 -translate-y-1/2 w-[300vw] h-[140vh] pointer-events-none">
          <Image
            src="/thinker.png"
            alt="The Thinker"
            fill
            sizes="300vw"
            className="object-contain"
            priority
          />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row">
          <div className="hidden lg:block lg:w-1/2"></div>
          
          <div className="w-full lg:w-1/2 min-h-screen flex items-start lg:items-end px-4 sm:px-8 relative">
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(circle at 80% 20%, rgba(94, 92, 230, 0.03) 0%, transparent 40%)'
            }} />
            <div className="py-16 pt-8 relative z-10">
              <h1 className="text-3xl md:text-6xl mb-6 tracking-widest lowercase" style={{ color: 'var(--text-primary)', textShadow: '0 3px 12px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.8)' }}>
                jimmy pocock
              </h1>
              <div className="mb-8 space-y-3">
                <p className="text-base md:text-lg tracking-wider" style={{ color: 'var(--text-secondary)', textShadow: '0 2px 10px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8)' }}>
                  engineer in austin, tx
                </p>
                <div className="flex gap-6">
                  <a 
                    href="https://www.github.com/jimmypocock" 
                    title="GitHub"
                    className="text-base md:text-lg tracking-wider text-[var(--text-primary)] transition-all duration-300 hover:tracking-[0.15em]"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8)' }}
                  >
                    github
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/jimmypocock" 
                    title="LinkedIn"
                    className="text-base md:text-lg tracking-wider text-[var(--text-primary)] transition-all duration-300 hover:tracking-[0.15em]"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8)' }}
                  >
                    linkedin
                  </a>
                  <a 
                    href="mailto:hello@jimmypocock.com" 
                    title="Email"
                    className="text-base md:text-lg tracking-wider text-[var(--text-primary)] transition-all duration-300 hover:tracking-[0.15em]"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8)' }}
                  >
                    email
                  </a>
                </div>
              </div>

              <div className="w-16 h-px my-6" style={{ backgroundColor: 'var(--border-color)' }} />

              {/* Professional Links */}
              {professionalItems.length > 0 && (
                <div className="mt-6 space-y-2">
                  {professionalItems.map((item, index) => {
                    return (
                      <div key={index} className="group relative">
                        {item.external ? (
                          <a 
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block py-1 -mx-2 px-2 rounded-lg transition-all duration-200 hover:bg-white/[0.02]"
                            style={{ textDecoration: 'none' }}
                          >
                            <div className="flex items-baseline">
                              <span className="text-base md:text-lg tracking-wider" style={{ color: 'var(--text-secondary)', textShadow: '0 2px 10px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8)' }}>
                                {item.prefix}{' '}
                                <span 
                                  className="transition-all duration-200 group-hover:tracking-[0.15em]"
                                  style={{ color: 'var(--text-primary)', textShadow: '0 2px 10px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8)' }}
                                >
                                  {item.text}
                                </span>
                              </span>
                            </div>
                          </a>
                        ) : (
                          <Link 
                            href={item.href}
                            className="block py-1 -mx-2 px-2 rounded-lg transition-all duration-200 hover:bg-white/[0.02]"
                            style={{ textDecoration: 'none' }}
                          >
                            <div className="flex items-baseline">
                              <span className="text-base md:text-lg tracking-wider" style={{ color: 'var(--text-secondary)', textShadow: '0 2px 10px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8)' }}>
                                {item.prefix}{' '}
                                <span 
                                  className="transition-all duration-200 group-hover:tracking-[0.15em]"
                                  style={{ color: 'var(--text-primary)', textShadow: '0 2px 10px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8)' }}
                                >
                                  {item.text}
                                </span>
                              </span>
                            </div>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              
              <div className="w-16 h-px my-6" style={{ backgroundColor: 'var(--border-color)' }} />
              
              {/* Personal Links */}
              <div className="space-y-2">
                {personalItems.map((item, index) => {
                  return (
                    <div key={index} className="group relative">
                      <Link 
                        href={item.href}
                        className="block py-1 -mx-2 px-2 rounded-lg transition-all duration-200 hover:bg-white/[0.02]"
                        style={{ textDecoration: 'none' }}
                      >
                        <div className="flex items-baseline">
                          <span className="text-base md:text-lg tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                            {item.prefix}{' '}
                            <span 
                              className="transition-all duration-200 group-hover:tracking-[0.15em]"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              {item.text}
                            </span>
                          </span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}