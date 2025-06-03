export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-[#090909] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">Let&apos;s Connect</h1>
        <p className="text-xl text-gray-300 mb-12">
          Whether you&apos;re interested in collaboration, have questions about my work, 
          or just want to chat about code and music, I&apos;d love to hear from you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Professional Connections */}
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#ff6100]">Professional</h2>
            
            <div className="space-y-4">
              <a 
                href="https://www.linkedin.com/in/jimmypocock" 
                className="flex items-center gap-3 text-gray-300 hover:text-[#ff6100] transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
              
              <a 
                href="https://github.com/jimmypocock" 
                className="flex items-center gap-3 text-gray-300 hover:text-[#ff6100] transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              
              <a 
                href="mailto:jimmy@jimmypocock.com" 
                className="flex items-center gap-3 text-gray-300 hover:text-[#ff6100] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </a>
            </div>
          </div>
          
          {/* Location & Availability */}
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-[#ff6100]">Location & Availability</h2>
            
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Austin, Texas</span>
              </div>
              
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>CST (UTC-6)</span>
              </div>
              
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Open to opportunities</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* What I'm interested in */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">I&apos;m Interested In...</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
            <div>
              <h3 className="font-semibold text-[#ff6100] mb-2">Technical Leadership</h3>
              <ul className="space-y-1 text-sm">
                <li>• CTO/VP Engineering roles</li>
                <li>• Scaling startups</li>
                <li>• Team building</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#ff6100] mb-2">Collaboration</h3>
              <ul className="space-y-1 text-sm">
                <li>• Advisory positions</li>
                <li>• Technical consulting</li>
                <li>• Open source projects</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#ff6100] mb-2">Speaking & Sharing</h3>
              <ul className="space-y-1 text-sm">
                <li>• Conference talks</li>
                <li>• Podcast appearances</li>
                <li>• Mentorship</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}