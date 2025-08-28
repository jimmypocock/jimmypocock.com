'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Github, 
  Linkedin, 
  BellRing,
  Tent, 
  Mic, 
  Play, 
  Bot,
  Dumbbell, 
  Music, 
  Dog, 
  Brain,
  type LucideIcon
} from 'lucide-react';
import { projects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';

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
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projectIcons: Record<string, LucideIcon> = {
    'roverpass': Tent,
    'vocal-technique': Mic,
    'songsnips': Play,
    'aws-delta': BellRing,
    'greg': Bot,
    'famefit': Dumbbell,
  };

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
          
          {/* Portfolio Section */}
          {projects.map((project) => {
            const Icon = projectIcons[project.slug];
            const prefix = project.status === 'built' ? 'i built' : 'currently building';
            return (
              <p key={project.slug} className="text-gray-300 text-base md:text-xl mb-2 tracking-wider flex items-center gap-3 group">
                <Icon 
                  className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 transition-all duration-300 group-hover:scale-110" 
                  style={{ color: project.color }}
                />
                <span>
                  {prefix}{' '}
                  <button
                    onClick={() => setSelectedProject(project.slug)}
                    className="font-semibold tracking-widest transition-all duration-300 hover:tracking-[0.2em]"
                    style={{ 
                      color: project.status === 'built' ? '#ffffff' : project.color,
                    }}
                  >
                    {project.title.toLowerCase()}
                  </button>
                </span>
              </p>
            );
          })}
          
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