export default function ProjectsPage() {
  const projects = [
    {
      title: 'RoverPass',
      description: 'Leading campground reservation platform scaling to $5.2M revenue',
      url: 'https://www.roverpass.com',
      role: 'Co-founder & CTO',
      highlights: ['$5.2M Revenue', 'Millions of users', 'Full-stack architecture'],
    },
    {
      title: 'Vocal Technique Translator',
      description: 'Bridging the gap between different vocal teaching methodologies',
      url: 'https://www.vocaltechniquetranslator.com',
      role: 'Creator',
      highlights: ['Educational platform', 'Music technology', 'Content management'],
    },
    {
      title: 'SongSnips',
      description: 'Platform for sharing and discovering music snippets',
      url: 'https://www.songsnips.com',
      role: 'Founder',
      highlights: ['Music sharing', 'Social features', 'Audio processing'],
    },
  ];

  return (
    <div className="min-h-screen bg-[#090909] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">Technical Projects</h1>
        <p className="text-xl text-gray-300 mb-12">
          Building products that solve real problems and create value.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors">
              <h2 className="text-2xl font-bold mb-2 text-[#ff6100]">{project.title}</h2>
              <p className="text-sm text-gray-400 mb-4">{project.role}</p>
              <p className="text-gray-300 mb-4">{project.description}</p>
              
              <div className="mb-4">
                {project.highlights.map((highlight) => (
                  <span key={highlight} className="inline-block bg-gray-800 text-xs px-2 py-1 rounded mr-2 mb-2">
                    {highlight}
                  </span>
                ))}
              </div>
              
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff6100] hover:underline"
              >
                Visit Project →
              </a>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">Want to see more technical details?</p>
          <a 
            href="https://github.com/jimmypocock" 
            className="inline-flex items-center px-6 py-3 bg-[#ff6100] text-white font-semibold rounded-lg hover:bg-[#e55500] transition-colors"
          >
            View GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
}