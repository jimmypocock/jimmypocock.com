import { getAllThoughts } from '@/lib/thoughts';
import ThoughtsMindMap from './ThoughtsMindMap';

export const metadata = {
  title: 'Thoughts | Jimmy Pocock',
  description: 'A living network of interconnected thoughts and ideas',
};

export default function ThoughtsPage() {
  const thoughts = getAllThoughts();
  
  // Only show thoughts that have a published_on date
  const publishedThoughts = thoughts.filter(t => t.publishedOn);
  
  return <ThoughtsMindMap thoughts={publishedThoughts} />;
}