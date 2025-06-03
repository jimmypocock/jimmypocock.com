export default function LeadershipPage() {
  return (
    <div className="min-h-screen bg-[#090909] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">Leadership & Impact</h1>
        <p className="text-xl text-gray-300 mb-12">
          How I scaled RoverPass to $5.2M revenue and the lessons learned along the way.
        </p>
        
        {/* Placeholder for RoverPass case study */}
        <div className="bg-gray-900 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">RoverPass Case Study</h2>
          <p className="text-gray-400">Coming soon: A comprehensive look at scaling RoverPass from startup to $5.2M revenue.</p>
        </div>
        
        {/* Leadership principles */}
        <div className="bg-gray-900 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Leadership Philosophy</h2>
          <p className="text-gray-400">Content about leadership approach and team building coming soon.</p>
        </div>
      </div>
    </div>
  );
}