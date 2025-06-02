import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Thought {
  slug: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
}

const thoughtsDirectory = path.join(process.cwd(), 'content/thoughts');

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

      return {
        slug,
        title: data.title || slug.replace(/-/g, ' '),
        date: data.date || new Date().toISOString(),
        content,
        excerpt: data.excerpt || content.slice(0, 150) + '...',
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

  return {
    slug,
    title: data.title || slug.replace(/-/g, ' '),
    date: data.date || new Date().toISOString(),
    content,
    excerpt: data.excerpt || content.slice(0, 150) + '...',
  };
}