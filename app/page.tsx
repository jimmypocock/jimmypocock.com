'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';

interface LinkItem {
  prefix?: string;
  text: string;
  href: string;
  title?: string;
  suffix?: string;
  external?: boolean;
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const personalItems: LinkItem[] = [
    { prefix: 'hear my', text: 'music', href: '/voice-memos' },
    { prefix: 'see my', text: 'dog', href: '/rae' },
    // { prefix: 'read my', text: 'thoughts', href: '/thoughts' },
  ];
  return (
    <div className="fixed inset-0 overflow-visible" style={{ backgroundColor: 'var(--bg-primary)' }}>
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
        <div className="w-full lg:w-1/2 h-full overflow-y-auto flex px-4 sm:px-8 relative">
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(94, 92, 230, 0.03) 0%, transparent 40%)'
        }} />
        <div className="py-8 relative z-10">
          <h1 className="text-3xl md:text-6xl mb-6 tracking-widest lowercase" style={{ color: 'var(--text-primary)' }}>
            jimmy pocock
          </h1>
          <div className="mb-8 space-y-3">
            <p className="text-base md:text-lg tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              engineer in austin, tx
            </p>
            <div className="flex gap-6">
              <a 
                href="https://www.github.com/jimmypocock" 
                title="GitHub"
                className="text-base md:text-lg tracking-wider text-[var(--text-primary)] transition-all duration-300 hover:tracking-[0.15em]"
                target="_blank"
                rel="noopener noreferrer"
              >
                github
              </a>
              <a 
                href="https://www.linkedin.com/in/jimmypocock" 
                title="LinkedIn"
                className="text-base md:text-lg tracking-wider text-[var(--text-primary)] transition-all duration-300 hover:tracking-[0.15em]"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin
              </a>
              <a 
                href="mailto:hello@jimmypocock.com" 
                title="Email"
                className="text-base md:text-lg tracking-wider text-[var(--text-primary)] transition-all duration-300 hover:tracking-[0.15em]"
              >
                email
              </a>
            </div>
          </div>
          
          {/* Divider */}
          <div className="w-16 h-px my-6" style={{ backgroundColor: 'var(--border-color)' }} />
          
          {/* Portfolio Section */}
          <div className="space-y-2">
            {projects.map((project) => {
              const prefix = project.status === 'built' ? 'i built' : 'currently building';
              return (
                <div key={project.slug} className="group relative">
                  <button
                    onClick={() => setSelectedProject(project.slug)}
                    className="w-full text-left py-1 -mx-2 px-2 rounded-lg transition-all duration-200 hover:bg-white/[0.02]"
                  >
                    <div className="flex items-baseline">
                      <span className="text-base md:text-lg tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                        {prefix}{' '}
                        <span 
                          className="transition-all duration-200 group-hover:tracking-[0.15em]"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {project.title.toLowerCase()}
                        </span>
                      </span>
                      <span 
                        className="ml-auto text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ color: 'var(--text-accent)' }}
                      >
                        →
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
          
          {/* Divider */}
          <div className="w-16 h-px my-6" style={{ backgroundColor: 'var(--border-color)' }} />
          
          {/* Personal Section */}
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
      
      {/* Project Cards */}
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          isOpen={selectedProject === project.slug}
          onClose={() => setSelectedProject(null)}
        />
      ))}
    </div>
  );
}