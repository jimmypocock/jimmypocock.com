export default function MusicPage() {
  return (
    <div className="min-h-screen bg-[#090909] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">Music & Creativity</h1>
        <p className="text-xl text-gray-300 mb-12">
          Where technology meets artistry - my journey as an amateur musician.
        </p>
        
        {/* Music Introduction */}
        <div className="bg-gray-900 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">My Musical Journey</h2>
          <p className="text-gray-300 mb-4">
            Music has always been a creative outlet that complements my technical work. 
            I write my own songs and have invested in building a home studio with professional gear.
          </p>
          <p className="text-gray-300">
            The discipline of learning music theory, practicing vocals, and producing tracks 
            has surprising parallels to software architecture and system design.
          </p>
        </div>
        
        {/* Studio Setup */}
        <div className="bg-gray-900 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Studio & Gear</h2>
          <p className="text-gray-400">
            Details about my home studio setup and recording equipment coming soon.
          </p>
        </div>
        
        {/* Placeholder for future recordings */}
        <div className="bg-gray-900 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Original Music</h2>
          <p className="text-gray-400 mb-4">
            Original songs and recordings will be shared here soon.
          </p>
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center">
            <p className="text-gray-500">🎵 Music player coming soon</p>
          </div>
        </div>
        
        {/* Connection to tech */}
        <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4">How Music Enhances My Tech Work</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Pattern recognition from music theory applies to code architecture</li>
            <li>Creative problem-solving skills transfer between disciplines</li>
            <li>Performance mindset helps with technical presentations</li>
            <li>Continuous learning and practice discipline</li>
          </ul>
        </div>
      </div>
    </div>
  );
}