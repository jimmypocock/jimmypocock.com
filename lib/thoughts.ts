import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Thought {
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  wordCount?: number;
  readingTime?: number;
  position?: { x?: number; y?: number };
  views?: number;
  publishedOn?: string;  // Date string - if not set, thought is unpublished
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
        content,
        excerpt: data.excerpt || content.slice(0, 150) + '...',
        tags: data.tags || [],
        wordCount,
        readingTime: calculateReadingTime(content),
        position: data.position,
        views: data.views || 0,
        publishedOn: data.published_on,  // Only support published_on from frontmatter
      };
    });

  // Sort thoughts by publishedOn date (newest first)
  return allThoughts.sort((a, b) => {
    if (!a.publishedOn && !b.publishedOn) return 0;
    if (!a.publishedOn) return 1;
    if (!b.publishedOn) return -1;
    return new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime();
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
    content,
    excerpt: data.excerpt || content.slice(0, 150) + '...',
    tags: data.tags || [],
    wordCount,
    readingTime: calculateReadingTime(content),
    position: data.position,
    views: data.views || 0,
    publishedOn: data.published_on,  // Only support published_on from frontmatter
  };
}

