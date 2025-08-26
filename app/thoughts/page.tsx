import { getAllThoughts } from '@/lib/thoughts';
import ThoughtsMindMap from './ThoughtsMindMap';

export const metadata = {
  title: 'Thoughts | Jimmy Pocock',
  description: 'A living network of interconnected thoughts and ideas',
};

export default function ThoughtsPage() {
  const thoughts = getAllThoughts();
  
  return <ThoughtsMindMap thoughts={thoughts} />;
}