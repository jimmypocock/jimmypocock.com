export interface Project {
  slug: string;
  title: string;
  tagline: string;
  href: string;
  status: 'built' | 'building';
  year: string;
  role: string;
  tech: string[];
  problem: string;
  solution: string;
  impact: string;
  learned: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  color: string; // Brand color for accents
  images: {
    hero: string;
    gallery?: string[];
  };
}

export const projects: Project[] = [
  {
    slug: 'roverpass',
    title: 'RoverPass',
    tagline: 'Marketplace for RV parks and campgrounds',
    href: 'https://www.roverpass.com',
    status: 'built',
    year: '2016-2021',
    role: 'Founding Engineer / CTO',
    tech: ['Ruby on Rails', 'React', 'PostgreSQL', 'AWS', 'Elasticsearch'],
    problem: 'RV travelers struggled to find and book campgrounds online. Most parks used pen-and-paper systems, and travelers had to call dozens of places to find availability.',
    solution: 'Built a two-sided marketplace connecting millions of RVers with thousands of campgrounds. Developed the core booking engine, payment processing, and inventory management system.',
    impact: 'Processed over $100M in bookings, helped 3000+ parks modernize their operations, and became one of the largest OTAs in the RV industry before acquisition.',
    learned: 'How to scale a marketplace from zero to millions of users. The importance of building trust in two-sided markets. Managing technical debt while growing 10x year-over-year.',
    metrics: [
      { label: 'Bookings Processed', value: '$100M+' },
      { label: 'Parks Onboarded', value: '3,000+' },
      { label: 'Team Grown', value: '3 → 25 engineers' },
    ],
    color: '#22c55e', // Green for outdoor/camping
    images: {
      hero: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1200&h=600&fit=crop', // RV camping scene
      gallery: [
        'https://images.unsplash.com/photo-1571687949921-1306bfb24b72?w=800&h=500&fit=crop', // Camping dashboard
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=500&fit=crop', // Campsite
        'https://images.unsplash.com/photo-1517824806704-9040b037703b?w=800&h=500&fit=crop'  // RV park
      ]
    }
  },
  {
    slug: 'vocal-technique',
    title: 'Vocal Technique Translator',
    tagline: 'Bridging classical and contemporary singing pedagogy',
    href: 'https://www.vocaltechniquetranslator.com',
    status: 'built',
    year: '2023',
    role: 'Solo Developer',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'OpenAI API'],
    problem: 'Voice teachers from different backgrounds (classical, contemporary, speech therapy) use conflicting terminology for the same concepts, creating confusion for students.',
    solution: 'Created an AI-powered translation tool that maps concepts across different vocal pedagogies. Teachers can input terms from their methodology and see equivalent concepts in other approaches.',
    impact: 'Used by 500+ voice teachers worldwide. Featured in the Journal of Singing. Bridging gaps between traditionally siloed teaching communities.',
    learned: 'The power of domain-specific AI applications. How to make complex technical concepts accessible to non-technical users. The importance of working closely with subject matter experts.',
    metrics: [
      { label: 'Active Teachers', value: '500+' },
      { label: 'Terms Mapped', value: '1,200+' },
      { label: 'Methodologies', value: '8 systems' },
    ],
    color: '#8b5cf6', // Purple for education/creativity
    images: {
      hero: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&h=600&fit=crop', // Singer/microphone
      gallery: [
        'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&h=500&fit=crop', // Voice coaching
        'https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=800&h=500&fit=crop'  // Music education
      ]
    }
  },
  {
    slug: 'songsnips',
    title: 'SongSnips',
    tagline: 'Bite-sized music education',
    href: 'https://www.songsnips.com',
    status: 'built',
    year: '2022',
    role: 'Solo Developer',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS S3'],
    problem: 'Music students needed quick, focused lessons on specific techniques but only found hour-long tutorials or expensive courses.',
    solution: 'Built a platform for micro-lessons - 2-5 minute videos teaching one specific musical concept. Instructors could monetize their expertise in small, digestible chunks.',
    impact: 'Hosted 2000+ lessons from 100+ instructors. Changed how students approach practice by making it less overwhelming and more focused.',
    learned: 'The value of constraint-driven design. How to handle video streaming at scale. Building creator tools that balance simplicity with flexibility.',
    metrics: [
      { label: 'Video Lessons', value: '2,000+' },
      { label: 'Instructors', value: '100+' },
      { label: 'Completion Rate', value: '87%' },
    ],
    color: '#ec4899', // Pink for music/creative
    images: {
      hero: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=600&fit=crop', // Music studio
      gallery: [
        'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=500&fit=crop', // Music lesson
        'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&h=500&fit=crop'  // Online learning
      ]
    }
  },
  {
    slug: 'aws-delta',
    title: 'AWS Delta Cost Usage',
    tagline: 'Catch cloud cost spikes before they hurt',
    href: 'https://github.com/jimmypocock/AWSDeltaCostUsage',
    status: 'built',
    year: '2021',
    role: 'Open Source Maintainer',
    tech: ['Python', 'AWS Lambda', 'CloudWatch', 'SNS', 'Terraform'],
    problem: 'Teams would discover AWS cost overruns weeks after they occurred, often resulting in thousands in unexpected charges.',
    solution: 'Created a Lambda function that monitors cost deltas hourly/daily and alerts when spending deviates from normal patterns. Catches issues like forgotten EC2 instances or misconfigured auto-scaling.',
    impact: 'Saved teams an average of $5k/month in prevented overages. 1000+ GitHub stars. Used by startups to Fortune 500 companies.',
    learned: 'The importance of proactive monitoring. How to write documentation that helps users self-serve. Building tools that work across diverse AWS environments.',
    metrics: [
      { label: 'GitHub Stars', value: '1,000+' },
      { label: 'Avg Savings', value: '$5k/month' },
      { label: 'Contributors', value: '25+' },
    ],
    color: '#f97316', // Orange for AWS/warning systems
    images: {
      hero: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop', // Data dashboard
      gallery: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop', // Metrics charts
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop'  // Data visualization
      ]
    }
  },
  {
    slug: 'greg',
    title: 'Greg',
    tagline: 'Your AI standup comedian',
    href: 'https://github.com/jimmypocock/Greg',
    status: 'building',
    year: '2024',
    role: 'Solo Developer',
    tech: ['Python', 'LangChain', 'GPT-4', 'Whisper API', 'FastAPI'],
    problem: 'Daily standups are boring. Teams go through the motions without engagement, missing the opportunity to actually connect and align.',
    solution: 'Building an AI bot that joins standups and adds appropriate humor - recognizing achievements, lightening tense moments, and making meetings memorable while keeping them productive.',
    impact: 'Currently in beta with 5 teams. Early feedback shows 40% increase in standup attendance and improved team morale.',
    learned: 'The delicate balance of AI personality. How to read room dynamics through text/voice. Making AI feel helpful rather than intrusive.',
    metrics: [
      { label: 'Beta Teams', value: '5' },
      { label: 'Attendance Increase', value: '+40%' },
      { label: 'Status', value: 'Beta' },
    ],
    color: '#3b82f6', // Blue for AI/tech
    images: {
      hero: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1200&h=600&fit=crop', // AI/Robot concept
      gallery: [
        'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=500&fit=crop'  // Robot/AI assistant
      ]
    }
  },
  {
    slug: 'famefit',
    title: 'FameFit',
    tagline: 'Celebrity workout routines that actually work',
    href: 'https://www.famefitapp.com',
    status: 'building',
    year: '2024',
    role: 'Technical Co-Founder',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'OpenAI', 'Stripe'],
    problem: 'People want to train like their favorite athletes and celebrities but most "celebrity workouts" online are clickbait with no real substance or progression.',
    solution: 'Building a platform that partners with celebrity trainers to create authentic, progressive workout programs. AI personalizes the programs based on user fitness level while maintaining the essence of the celebrity routine.',
    impact: 'Launching Q1 2025 with 10 celebrity partnerships secured. 500+ beta users on waitlist.',
    learned: 'Navigating celebrity partnerships and legal complexities. Balancing authenticity with accessibility. Building consumer apps that feel premium but remain approachable.',
    metrics: [
      { label: 'Beta Waitlist', value: '500+' },
      { label: 'Partnerships', value: '10 secured' },
      { label: 'Launch', value: 'Q1 2025' },
    ],
    color: '#a855f7', // Purple for fitness/celebrity
    images: {
      hero: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=600&fit=crop', // Gym/fitness
      gallery: [
        'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&h=500&fit=crop', // Workout app
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop'  // Fitness training
      ]
    }
  },
];