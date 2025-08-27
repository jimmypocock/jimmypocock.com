import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllThoughts, getThoughtBySlug } from '@/lib/thoughts';

export async function generateStaticParams() {
  const thoughts = getAllThoughts();
  return thoughts.map((thought) => ({
    slug: thought.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const thought = getThoughtBySlug(slug);
  
  if (!thought) {
    return {};
  }

  return {
    title: `${thought.title} | Jimmy Pocock`,
    description: thought.excerpt,
  };
}

export default async function ThoughtPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const thought = getThoughtBySlug(slug);

  if (!thought) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link 
            href="/thoughts" 
            className="text-[#ff6100] uppercase tracking-widest hover:underline text-sm"
          >
            ← Back to Thoughts
          </Link>
        </div>
        
        <article>
          <h1 className="text-3xl md:text-4xl mb-4 tracking-widest lowercase">
            {thought.title}
          </h1>
          
          {thought.publishedOn && (
            <time className="text-sm text-gray-400">
              {new Date(thought.publishedOn).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          
          <div className="mt-8 prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
              {thought.content}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}