export default function Home() {
  return (
    <div className="min-h-screen relative flex items-end">
      {/* Background image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/thinker.png)',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundColor: '#000'
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full pb-6 md:pb-12">
        <div className="w-full max-w-3xl mx-auto px-4">
          <h1 className="text-white text-3xl md:text-6xl mb-6 tracking-widest lowercase">
            jimmy pocock
          </h1>
          <p className="text-white text-base md:text-xl mb-2 tracking-wider">
            <a
              href="https://www.github.com/jimmypocock"
              title="github"
              className="text-[#ff6100] uppercase tracking-widest hover:underline"
            >
              developer
            </a>
            {' '}in austin, tx.
          </p>
          <p className="text-white text-base md:text-xl mb-2 tracking-wider">
            i help build{' '}
            <a
              href="https://www.roverpass.com"
              title="roverpass.com"
              className="text-[#ff6100] uppercase tracking-widest hover:underline"
            >
              roverpass
            </a>
            .
          </p>
          <p className="text-white text-base md:text-xl mb-2 tracking-wider">
            let&apos;s{' '}
            <a
              href="https://www.linkedin.com/in/jimmypocock"
              title="email"
              className="text-[#ff6100] uppercase tracking-widest hover:underline"
            >
              talk
            </a>
            {' '}about code.
          </p>
        </div>
      </div>
    </div>
  );
}