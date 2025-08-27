'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Github, 
  Linkedin, 
  // BellRing,
  // Tent, 
  // Mic, 
  // Play, 
  // Bot,
  // Dumbbell, 
  Music, 
  Dog, 
  Brain,
  type LucideIcon
} from 'lucide-react';

interface LinkItem {
  icon: LucideIcon;
  prefix?: string;
  text: string;
  href: string;
  title?: string;
  suffix?: string;
  external?: boolean;
}

export default function Home() {
  // const portfolioItems: LinkItem[] = [
  //   { icon: Tent, prefix: 'i built', text: 'roverpass', href: 'https://www.roverpass.com', title: 'roverpass.com', external: true },
  //   { icon: Mic, prefix: 'i built', text: 'vocal technique translator', href: 'https://www.vocaltechniquetranslator.com', title: 'vocaltechniquetranslator.com', external: true },
  //   { icon: Play, prefix: 'i built', text: 'songsnips', href: 'https://www.songsnips.com', title: 'songsnips.com', external: true },
  //   { icon: BellRing, prefix: 'i built', text: 'aws delta cost usage notification', href: 'https://github.com/jimmypocock/AWSDeltaCostUsage', title: 'AWSDeltaCostUsage', external: true },
  //   { icon: Bot, prefix: 'currently building', text: 'greg', href: 'https://github.com/jimmypocock/Greg', title: 'greg', external: true },
  //   { icon: Dumbbell, prefix: 'currently building', text: 'famefit', href: 'https://www.famefitapp.com', title: 'famefitapp.com', external: true },
  // ];

  const personalItems: LinkItem[] = [
    { icon: Music, prefix: 'hear my', text: 'music', href: '/voice-memos' },
    { icon: Dog, prefix: 'see my', text: 'dog', href: '/rae' },
    { icon: Brain, prefix: 'read my', text: 'thoughts', href: '/thoughts' },
  ];
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
          <p className="text-white text-base md:text-xl mb-2 tracking-wider flex items-center gap-3">
            <Github className="w-4 h-4 md:w-5 md:h-5 text-white flex-shrink-0" />
            <span>
              <a 
                href="https://www.github.com/jimmypocock" 
                title="github"
                className="text-white font-semibold tracking-widest hover:opacity-70 transition-opacity duration-300"
                target="_blank"
              >
                engineer
              </a>
              <span className="text-gray-300">{' '}in austin, tx</span>
            </span>
          </p>
          <p className="text-gray-300 text-base md:text-xl mb-8 tracking-wider flex items-center gap-3">
            <Linkedin className="w-4 h-4 md:w-5 md:h-5 text-white flex-shrink-0" />
            <span>
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
            </span>
          </p>
          
          {/* Divider */}
          <div className="w-16 h-px bg-gray-400 my-6" />
          
          {/* Personal Section */}
          {personalItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <p key={index} className="text-gray-300 text-sm md:text-lg mb-2 tracking-wider flex items-center gap-3">
                <Icon className="w-4 h-4 text-white flex-shrink-0" />
                <span>
                  {item.prefix}{' '}
                  <Link 
                    href={item.href} 
                    className="text-white font-medium tracking-widest hover:opacity-70 transition-opacity duration-300"
                  >
                    {item.text}
                  </Link>
                  {item.suffix}
                </span>
              </p>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
}