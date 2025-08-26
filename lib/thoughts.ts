import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Connection {
  type: 'builds-upon' | 'questions' | 'answers' | 'contradicts' | 'references';
  target: string;
  strength?: number;
}

export interface Thought {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  parent?: string;
  connections?: Connection[];
  tags?: string[];
  wordCount?: number;
  readingTime?: number;
  position?: { x?: number; y?: number };
  views?: number;
}

const thoughtsDirectory = path.join(process.cwd(), 'content/thoughts');

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function getAllThoughts(): Thought[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(thoughtsDirectory)) {
    fs.mkdirSync(thoughtsDirectory, { recursive: true });
    return [];
  }

  const fileNames = fs.readdirSync(thoughtsDirectory);
  const allThoughts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(thoughtsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      const wordCount = content.split(/\s+/).length;

      return {
        slug,
        title: data.title || slug.replace(/-/g, ' '),
        date: data.date || new Date().toISOString(),
        content,
        excerpt: data.excerpt || content.slice(0, 150) + '...',
        parent: data.parent,
        connections: data.connections || [],
        tags: data.tags || [],
        wordCount,
        readingTime: calculateReadingTime(content),
        position: data.position,
        views: data.views || 0,
      };
    });

  // Sort thoughts by date (newest first)
  return allThoughts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getThoughtBySlug(slug: string): Thought | null {
  const fullPath = path.join(thoughtsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const wordCount = content.split(/\s+/).length;

  return {
    slug,
    title: data.title || slug.replace(/-/g, ' '),
    date: data.date || new Date().toISOString(),
    content,
    excerpt: data.excerpt || content.slice(0, 150) + '...',
    parent: data.parent,
    connections: data.connections || [],
    tags: data.tags || [],
    wordCount,
    readingTime: calculateReadingTime(content),
    position: data.position,
    views: data.views || 0,
  };
}

// Get all connections between thoughts
export function getThoughtConnections(): Map<string, Connection[]> {
  const thoughts = getAllThoughts();
  const connections = new Map<string, Connection[]>();
  
  thoughts.forEach(thought => {
    if (thought.connections && thought.connections.length > 0) {
      connections.set(thought.slug, thought.connections);
    }
    
    // Also add parent as a connection
    if (thought.parent) {
      const existing = connections.get(thought.slug) || [];
      existing.push({ type: 'builds-upon', target: thought.parent, strength: 1 });
      connections.set(thought.slug, existing);
    }
  });
  
  return connections;
}

// Get thought hierarchy for tree visualization
interface ThoughtNode extends Thought {
  children: ThoughtNode[];
}

export function getThoughtHierarchy(): ThoughtNode[] {
  const thoughts = getAllThoughts();
  const rootThoughts = thoughts.filter(t => !t.parent);
  
  function buildTree(parentSlug?: string): ThoughtNode[] {
    const children = thoughts.filter(t => t.parent === parentSlug);
    return children.map(child => ({
      ...child,
      children: buildTree(child.slug)
    }));
  }
  
  return rootThoughts.map(root => ({
    ...root,
    children: buildTree(root.slug)
  }));
}