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

  // Generate a subtle gradient from the project color
  const gradientStyle = {
    background: `linear-gradient(135deg, ${project.color}10 0%, transparent 50%)`,
  };

  return (
    <>
      {/* Backdrop - fade in after card slides in */}
      <div
        className={`fixed inset-0 bg-black/90 backdrop-blur-sm z-40 transition-opacity ${
          isAnimating ? 'opacity-100 delay-300' : 'opacity-0 duration-300'
        }`}
        onClick={onClose}
        style={{ transitionDuration: isAnimating ? '400ms' : '300ms' }}
      />

      {/* Card - slower entrance, normal exit */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-[900px] bg-black z-50 overflow-y-auto transition-transform ${
          isAnimating ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          transitionDuration: isAnimating ? '500ms' : '300ms',
          transitionTimingFunction: isAnimating ? 'cubic-bezier(0.4, 0, 0.2, 1)' : 'ease-out'
        }}
      >
        {/* Hero Image Section */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden group">
          {/* Placeholder with gradient while loading */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"
            style={gradientStyle}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
          <div 
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{ backgroundColor: project.color }}
          />

          {/* Floating metrics on image */}
          {project.metrics && (
            <div className="absolute bottom-8 left-8 right-8 flex gap-6">
              {project.metrics.slice(0, 3).map((metric, index) => (
                <div 
                  key={index} 
                  className="backdrop-blur-md bg-black/50 px-4 py-3 rounded border"
                  style={{ borderColor: project.color + '60' }}
                >
                  <div className="text-2xl font-light text-white mb-1">{metric.value}</div>
                  <div className="text-xs uppercase tracking-wider" style={{ color: project.color + 'dd' }}>{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors p-2 backdrop-blur-md bg-black/30 rounded-full"
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
              <h2 className="text-3xl md:text-4xl text-white tracking-widest lowercase">
                {project.title.toLowerCase()}
              </h2>
              <span 
                className={`px-3 py-1 text-xs uppercase tracking-wider rounded-full border`}
                style={{
                  borderColor: project.color + '40',
                  color: project.status === 'built' ? '#9ca3af' : project.color,
                  backgroundColor: project.status === 'building' ? project.color + '10' : 'transparent'
                }}
              >
                {project.status}
              </span>
            </div>
            <p className="text-gray-400 text-lg">{project.tagline}</p>
            
            {/* Quick Info Bar */}
            <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
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
                className="flex items-center gap-2 hover:text-white transition-colors"
                style={{ color: project.color + '99' }}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Site</span>
              </a>
            </div>
          </div>

          {/* Tech Stack with subtle color */}
          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm border rounded transition-all hover:scale-105"
                  style={{ 
                    borderColor: project.color + '40',
                    backgroundColor: project.color + '10',
                    color: project.color + 'ee'
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
                style={{ color: project.color + '99' }}
              >
                <span className="block w-8 h-px" style={{ backgroundColor: project.color + '40' }} />
                The Problem
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">{project.problem}</p>
            </section>

            <section>
              <h3 
                className="text-xs uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ color: project.color + '99' }}
              >
                <span className="block w-8 h-px" style={{ backgroundColor: project.color + '40' }} />
                The Solution
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">{project.solution}</p>
            </section>

            <section>
              <h3 
                className="text-xs uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ color: project.color + '99' }}
              >
                <span className="block w-8 h-px" style={{ backgroundColor: project.color + '40' }} />
                The Impact
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">{project.impact}</p>
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
                      style={{ borderColor: project.color + '40' }}
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
                style={{ color: project.color + '99' }}
              >
                <span className="block w-8 h-px" style={{ backgroundColor: project.color + '40' }} />
                What I Learned
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">{project.learned}</p>
            </section>
          </div>

          {/* CTA with color accent */}
          <div className="mt-12 pt-8 border-t" style={{ borderColor: project.color + '20' }}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-black font-medium tracking-wider transition-all duration-300 hover:gap-3 hover:brightness-110"
              style={{ 
                backgroundColor: project.color
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