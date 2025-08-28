'use client';

import { useState, useEffect } from 'react';
import { X, ExternalLink, Calendar, Code } from 'lucide-react';
import Image from 'next/image';
import type { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectCard({ project, isOpen, onClose }: ProjectCardProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Mount the component first
      setIsMounted(true);
      // Then trigger animation after a frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { // Double RAF for better browser paint timing
          setIsAnimating(true);
        });
      });
      document.body.style.overflow = 'hidden';
      setImageLoaded(false); // Reset image state when opening
    } else {
      // Animate out first
      setIsAnimating(false);
      // Then unmount after animation
      const timeout = setTimeout(() => {
        setIsMounted(false);
      }, 300); // Match transition duration
      document.body.style.overflow = 'unset';
      
      return () => clearTimeout(timeout);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isMounted) return null;

  // Use theme colors or fallback to defaults
  const theme = project.theme || {
    background: 'var(--bg-secondary)',
    text: 'var(--text-primary)',
    textSecondary: 'var(--text-secondary)',
    accent: project.color
  };

  return (
    <>
      {/* Backdrop - fade in after card slides in */}
      <div
        className={`fixed inset-0 backdrop-blur-md z-40 transition-opacity ${
          isAnimating ? 'opacity-100 delay-300' : 'opacity-0 duration-300'
        }`}
        onClick={onClose}
        style={{ 
          transitionDuration: isAnimating ? '400ms' : '300ms',
          backgroundColor: 'rgba(10, 10, 11, 0.8)'
        }}
      />

      {/* Card - slower entrance, normal exit */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-[900px] z-50 overflow-y-auto transition-transform ${
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          transitionDuration: isAnimating ? '500ms' : '300ms',
          transitionTimingFunction: isAnimating ? 'cubic-bezier(0.4, 0, 0.2, 1)' : 'ease-out',
          backgroundColor: theme.background,
          boxShadow: isAnimating ? 'var(--shadow-xl)' : 'none'
        }}
      >
        {/* Hero Image Section */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden group">
          {/* Placeholder with gradient while loading */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${theme.accent}20 0%, ${theme.background} 100%)`
            }}
          />
          
          {/* Hero Image */}
          <div className={`relative w-full h-full ${!imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
            <Image
              src={project.images.hero}
              alt={`${project.title} screenshot`}
              fill
              className="object-cover filter saturate-50 hover:saturate-100 transition-all duration-700"
              onLoad={() => setImageLoaded(true)}
              priority={isOpen}
            />
          </div>

          {/* Overlay gradient with color tint */}
          <div className="absolute inset-0 opacity-80" style={{
            background: `linear-gradient(to top, ${theme.background} 0%, transparent 50%)`
          }} />
          <div 
            className="absolute inset-0 opacity-10 mix-blend-overlay"
            style={{ backgroundColor: theme.accent }}
          />

          {/* Floating metrics on image */}
          {project.metrics && (
            <div className="absolute bottom-8 left-8 right-8 flex gap-6">
              {project.metrics.slice(0, 3).map((metric, index) => (
                <div 
                  key={index} 
                  className="backdrop-blur-md px-4 py-3 rounded-lg border"
                  style={{ 
                    borderColor: theme.accent + '40',
                    backgroundColor: theme.background + 'ee',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <div className="text-2xl font-light mb-1" style={{ color: theme.text }}>{metric.value}</div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: theme.accent }}>{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 transition-all p-2 backdrop-blur-md rounded-full hover:scale-110"
            style={{ 
              backgroundColor: theme.background + 'dd',
              color: theme.text
            }}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Header with color accent */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-3xl md:text-4xl tracking-widest lowercase" style={{ color: theme.text }}>
                {project.title.toLowerCase()}
              </h2>
              <span 
                className={`px-3 py-1 text-xs uppercase tracking-wider rounded-full border`}
                style={{
                  borderColor: theme.accent + '40',
                  color: theme.accent,
                  backgroundColor: theme.accent + '10'
                }}
              >
                {project.status}
              </span>
            </div>
            <p className="text-lg" style={{ color: theme.textSecondary }}>{project.tagline}</p>
            
            {/* Quick Info Bar */}
            <div className="flex items-center gap-6 mt-4 text-sm" style={{ color: theme.textSecondary }}>
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
                className="flex items-center gap-2 transition-colors hover:opacity-80"
                style={{ color: theme.accent }}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Site</span>
              </a>
            </div>
          </div>

          {/* Tech Stack with subtle color */}
          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-widest mb-4" style={{ color: theme.textSecondary }}>Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm border rounded transition-all hover:scale-105"
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

          {/* Story Sections with better spacing */}
          <div className="space-y-10">
            <section>
              <h3 
                className="text-xs uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ color: theme.accent }}
              >
                <span className="block w-8 h-px" style={{ backgroundColor: theme.accent + '40' }} />
                The Problem
              </h3>
              <p className="leading-relaxed text-lg" style={{ color: theme.text }}>{project.problem}</p>
            </section>

            <section>
              <h3 
                className="text-xs uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ color: theme.accent }}
              >
                <span className="block w-8 h-px" style={{ backgroundColor: theme.accent + '40' }} />
                The Solution
              </h3>
              <p className="leading-relaxed text-lg" style={{ color: theme.text }}>{project.solution}</p>
            </section>

            <section>
              <h3 
                className="text-xs uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ color: theme.accent }}
              >
                <span className="block w-8 h-px" style={{ backgroundColor: theme.accent + '40' }} />
                The Impact
              </h3>
              <p className="leading-relaxed text-lg" style={{ color: theme.text }}>{project.impact}</p>
            </section>

            {/* Gallery if exists */}
            {project.images.gallery && project.images.gallery.length > 0 && (
              <section>
                <h3 
                  className="text-xs uppercase tracking-widest mb-4 flex items-center gap-2"
                  style={{ color: project.color + '99' }}
                >
                  <span className="block w-8 h-px" style={{ backgroundColor: project.color + '40' }} />
                  Screenshots
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.gallery.map((img, index) => (
                    <div 
                      key={index}
                      className="relative aspect-video overflow-hidden rounded-lg border-2 group cursor-pointer"
                      style={{ borderColor: theme.accent + '30' }}
                      onMouseEnter={() => setHoveredImage(index)}
                      onMouseLeave={() => setHoveredImage(null)}
                    >
                      <Image
                        src={img}
                        alt={`${project.title} screenshot ${index + 1}`}
                        fill
                        className={`object-cover transition-all duration-500 ${
                          hoveredImage === index ? 'scale-110 saturate-100' : 'saturate-50'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h3 
                className="text-xs uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ color: theme.accent }}
              >
                <span className="block w-8 h-px" style={{ backgroundColor: theme.accent + '40' }} />
                What I Learned
              </h3>
              <p className="leading-relaxed text-lg" style={{ color: theme.text }}>{project.learned}</p>
            </section>
          </div>

          {/* CTA with color accent */}
          <div className="mt-12 pt-8 border-t" style={{ borderColor: theme.accent + '20' }}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-white font-medium tracking-wider transition-all duration-300 hover:gap-3 hover:scale-105"
              style={{ 
                backgroundColor: theme.accent,
                boxShadow: '0 4px 14px ' + theme.accent + '40'
              }}
            >
              Visit {project.title}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}