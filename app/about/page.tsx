export default function About() {
  return (
    <div className="min-h-screen bg-[#090909] text-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Jimmy Pocock</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Technical leader, entrepreneur, and lifelong learner passionate about building 
            products that make a difference.
          </p>
        </div>

        {/* Story Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#ff6100]">My Journey</h2>
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-300 mb-6 leading-relaxed">
              I&apos;m Jimmy Pocock, a technical leader based in Austin, Texas. As the Co-founder and CTO of RoverPass, 
              I&apos;ve had the privilege of scaling a startup from inception to $5.2M in revenue, transforming how 
              millions of Americans discover and book their outdoor adventures.
            </p>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              My journey in technology began over 15 years ago, driven by a simple belief: technology should 
              solve real problems and improve people&apos;s lives. This philosophy has guided me through various 
              roles, from hands-on development to strategic leadership positions.
            </p>

            <p className="text-gray-300 mb-6 leading-relaxed">
              At RoverPass, I led the technical transformation of the campground industry, building scalable 
              systems that handle millions of bookings while maintaining the personal touch that outdoor 
              enthusiasts value. This experience taught me that successful technology leadership isn&apos;t just 
              about code—it&apos;s about understanding business needs, empowering teams, and creating sustainable growth.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#ff6100]">What Drives Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Innovation Through Simplicity</h3>
              <p className="text-gray-300">
                I believe the best solutions are often the simplest ones. Complex problems don&apos;t always 
                require complex solutions—they require thoughtful, elegant approaches.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">People-First Leadership</h3>
              <p className="text-gray-300">
                Great products are built by great teams. I focus on creating environments where talented 
                individuals can do their best work and grow both professionally and personally.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Continuous Learning</h3>
              <p className="text-gray-300">
                Technology evolves rapidly, and so must we. I&apos;m constantly learning—whether it&apos;s new 
                programming paradigms, business strategies, or even music theory in my spare time.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Impact at Scale</h3>
              <p className="text-gray-300">
                I&apos;m drawn to challenges that affect millions of users. The opportunity to improve lives 
                at scale is what gets me excited about technology leadership.
              </p>
            </div>
          </div>
        </section>

        {/* Beyond Tech Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#ff6100]">Beyond the Code</h2>
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-8">
            <p className="text-gray-300 mb-4 leading-relaxed">
              While technology is my profession, music is my passion. I&apos;m an amateur musician who writes 
              original songs and has invested in building a home studio. This creative outlet provides a 
              perfect balance to the analytical nature of software development.
            </p>
            
            <p className="text-gray-300 mb-4 leading-relaxed">
              I&apos;ve found surprising parallels between music and code—both require pattern recognition, 
              creative problem-solving, and the discipline to practice continuously. My musical journey has 
              made me a better technologist, teaching me patience, persistence, and the value of iterative improvement.
            </p>
            
            <p className="text-gray-300 leading-relaxed">
              I also enjoy sharing my thoughts on technology, leadership, and life through writing. You can 
              find my articles and musings in the Insights section, where I explore topics ranging from 
              technical architecture to philosophy and everything in between.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-6">Let&apos;s Build Something Amazing</h2>
          <p className="text-gray-300 mb-8">
            Whether you&apos;re looking for technical leadership, have an interesting project, 
            or just want to discuss ideas, I&apos;d love to connect.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="https://www.linkedin.com/in/jimmypocock" 
              className="inline-flex items-center px-6 py-3 bg-[#ff6100] text-white font-semibold rounded-lg hover:bg-[#e55500] transition-colors"
            >
              Connect on LinkedIn
            </a>
            <a 
              href="/projects" 
              className="inline-flex items-center px-6 py-3 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white hover:text-[#090909] transition-colors"
            >
              View My Work
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}