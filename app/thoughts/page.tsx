import Link from 'next/link';
import { getAllThoughts } from '@/lib/thoughts';

export const metadata = {
  title: 'Thoughts | Jimmy Pocock',
  description: 'Thoughts and writings on technology, philosophy, and life',
};

export default function ThoughtsPage() {
  const thoughts = getAllThoughts();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-[#ff6100] uppercase tracking-widest hover:underline text-sm"
          >
            ← Back to Home
          </Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl mb-8 tracking-widest lowercase">thoughts</h1>
        
        {thoughts.length === 0 ? (
          <p className="text-gray-400">No thoughts yet. Check back soon.</p>
        ) : (
          <div className="space-y-8">
            {thoughts.map((thought) => (
              <article key={thought.slug} className="border-b border-gray-800 pb-8">
                <Link href={`/thoughts/${thought.slug}`}>
                  <h2 className="text-xl md:text-2xl mb-2 text-[#ff6100] hover:underline lowercase">
                    {thought.title}
                  </h2>
                </Link>
                <time className="text-sm text-gray-400">
                  {new Date(thought.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <p className="mt-3 text-gray-300">{thought.excerpt}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}