'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Calendar, Code, ChevronDown } from 'lucide-react';
import { projects } from '@/lib/projects';

interface LinkItem {
  prefix?: string;
  text: string;
  href: string;
  title?: string;
  suffix?: string;
  external?: boolean;
}

export default function Home() {
  const [hoveredImage, setHoveredImage] = useState<{project: string, index: number} | null>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);

  const personalItems: LinkItem[] = [
    { prefix: 'hear my', text: 'music', href: '/voice-memos' },
    { prefix: 'see my', text: 'dog', href: '/rae' },
    // { prefix: 'read my', text: 'thoughts', href: '/thoughts' },
  ];

  const scrollToPortfolio = () => {
    portfolioRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
        {/* The Thinker Image */}
        <div className="absolute top-[65%] left-[22%] -translate-x-1/2 -translate-y-1/2 w-[300vw] h-[140vh] pointer-events-none">
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
          
          <div className="w-full lg:w-1/2 min-h-screen flex items-end px-4 sm:px-8 relative">
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(circle at 80% 20%, rgba(94, 92, 230, 0.03) 0%, transparent 40%)'
            }} />
            <div className="pb-16 pt-8 relative z-10">
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

              <div className="mt-8">
                <button
                  onClick={scrollToPortfolio}
                  className="text-base md:text-lg tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-300 flex items-center gap-2"
                >
                  scroll down for portfolio
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Sections */}
      <div ref={portfolioRef}>
        {projects.map((project) => {
          const theme = project.theme || {
            background: 'var(--bg-secondary)',
            text: 'var(--text-primary)',
            textSecondary: 'var(--text-secondary)',
            accent: project.color
          };

          return (
            <section
              key={project.slug}
              id={`project-${project.slug}`}
              className="min-h-screen"
              style={{ backgroundColor: theme.background }}
            >
              {/* Hero Image - Full Width */}
              <div className="relative h-[60vh] w-full overflow-hidden">
                <Image
                  src={project.images.hero}
                  alt={`${project.title} hero`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />

                <div className="absolute inset-0" style={{
                  background: `linear-gradient(to bottom, transparent 0%, ${theme.background} 100%)`
                }} />

                {/* Metrics Overlay */}
                {project.metrics && (
                  <div className="absolute bottom-12 w-full px-8">
                    <div className="max-w-7xl mx-auto flex gap-6 flex-wrap justify-center md:justify-start">
                      {project.metrics.map((metric, idx) => (
                        <div 
                          key={idx} 
                          className="backdrop-blur-md px-6 py-4 rounded-lg border"
                          style={{ 
                            borderColor: theme.accent + '40',
                            backgroundColor: theme.background + 'ee'
                          }}
                        >
                          <div className="text-3xl font-light" style={{ color: theme.text }}>
                            {metric.value}
                          </div>
                          <div className="text-xs uppercase tracking-widest" style={{ color: theme.accent }}>
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="max-w-5xl mx-auto px-8 py-16 space-y-12">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <h2 className="text-4xl md:text-5xl tracking-widest lowercase" style={{ color: theme.text }}>
                      {project.title.toLowerCase()}
                    </h2>
                    <span 
                      className="px-3 py-1 text-xs uppercase tracking-wider rounded-full border"
                      style={{
                        borderColor: theme.accent + '40',
                        color: theme.accent,
                        backgroundColor: theme.accent + '10'
                      }}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xl mb-6" style={{ color: theme.textSecondary }}>
                    {project.tagline}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm flex-wrap" style={{ color: theme.textSecondary }}>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{project.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      <span>{project.role}</span>
                    </div>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                      style={{ color: theme.accent }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Visit Site</span>
                    </a>
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-xs uppercase tracking-widest mb-4" style={{ color: theme.textSecondary }}>
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 text-sm border rounded-md"
                        style={{ 
                          borderColor: theme.accent + '30',
                          backgroundColor: theme.accent + '10',
                          color: theme.text
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Story Sections */}
                <div className="space-y-12">
                  <section>
                    <h3 className="text-sm uppercase tracking-widest mb-4 font-medium" style={{ color: theme.accent }}>
                      The Problem
                    </h3>
                    <p className="leading-relaxed text-lg" style={{ color: theme.text }}>
                      {project.problem}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-sm uppercase tracking-widest mb-4 font-medium" style={{ color: theme.accent }}>
                      The Solution
                    </h3>
                    <p className="leading-relaxed text-lg" style={{ color: theme.text }}>
                      {project.solution}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-sm uppercase tracking-widest mb-4 font-medium" style={{ color: theme.accent }}>
                      The Impact
                    </h3>
                    <p className="leading-relaxed text-lg" style={{ color: theme.text }}>
                      {project.impact}
                    </p>
                  </section>

                  {/* Gallery */}
                  {project.images.gallery && project.images.gallery.length > 0 && (
                    <section>
                      <h3 className="text-sm uppercase tracking-widest mb-4 font-medium" style={{ color: theme.accent }}>
                        Screenshots
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.images.gallery.map((img, idx) => (
                          <div 
                            key={idx}
                            className="relative aspect-video overflow-hidden rounded-lg border-2 cursor-pointer"
                            style={{ borderColor: theme.accent + '20' }}
                            onMouseEnter={() => setHoveredImage({project: project.slug, index: idx})}
                            onMouseLeave={() => setHoveredImage(null)}
                          >
                            <Image
                              src={img}
                              alt={`${project.title} screenshot ${idx + 1}`}
                              fill
                              className={`object-cover transition-transform duration-500 ${
                                hoveredImage?.project === project.slug && hoveredImage?.index === idx 
                                  ? 'scale-110' 
                                  : ''
                              }`}
                            />
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  <section>
                    <h3 className="text-sm uppercase tracking-widest mb-4 font-medium" style={{ color: theme.accent }}>
                      What I Learned
                    </h3>
                    <p className="leading-relaxed text-lg" style={{ color: theme.text }}>
                      {project.learned}
                    </p>
                  </section>
                </div>

                {/* CTA */}
                <div className="pt-8">
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium tracking-wider transition-transform hover:scale-105"
                    style={{ 
                      backgroundColor: theme.accent,
                      boxShadow: `0 4px 14px ${theme.accent}40`
                    }}
                  >
                    Visit {project.title}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}