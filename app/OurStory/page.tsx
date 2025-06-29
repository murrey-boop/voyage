import Image from 'next/image';

export default function OurStory() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 font-inter text-gray-800 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-blue-700 dark:text-blue-300">Our Story</h1>
      <div className="mb-8">
        <Image
          src="/images/our-story-team.jpg"
          alt="Digital Voyage founders"
          width={900}
          height={400}
          className="rounded-lg shadow-lg object-cover w-full h-64"
        />
      </div>
      <section className="space-y-6 text-lg">
        <p>
          <span className="font-semibold text-blue-600">Digital Voyage</span> began with a simple belief: travel should be seamless, inspiring, and accessible to all. Our founders, avid explorers themselves, witnessed firsthand the hassles travelers face—disconnected services, endless paperwork, and lost opportunities for authentic experiences.
        </p>
        <p>
          In 2023, we set out to change this. With a passion for technology and a love for discovering the world, we built Digital Voyage to unite tours, flight bookings, visa support, and bespoke itineraries under one digital roof.
        </p>
        <p>
          Today, our platform connects thousands of adventurers with trusted guides and unique journeys. We partner only with the best, ensuring every trip is safe, memorable, and tailored to your dreams.
        </p>
        <p>
          <span className="italic text-blue-700">Thank you</span> for making us a part of your journeys. Your stories inspire us to innovate, improve, and keep the spirit of discovery alive.
        </p>
        <p>
          <span className="font-semibold">Let&apos;s make your next adventure unforgettable.</span>
        </p>
      </section>
    </main>
  );
}