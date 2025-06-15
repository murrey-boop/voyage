import Link from 'next/link';

export default function FlightFooter() {
  const footerLinks = [
    { href: '/flights/economy', label: 'Economy' },
    { href: '/flights/round-trip', label: 'Round Trip' },
    { href: '/flights/class', label: 'Class' },
    { href: '/contact', label: 'Contact' },
    { href: '/support', label: 'Support' },
  ];

  return (
    <footer className="bg-gradient-to-r from-teal-400 to-teal-700 border-2 border-teal-300 py-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-white font-lato text-sm sm:text-base mb-6">
          © 2025 Digital Voyaging. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6">
          {footerLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-white hover:text-teal-100 font-lato text-sm sm:text-base transition duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}