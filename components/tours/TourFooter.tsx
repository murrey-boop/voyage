import Link from 'next/link';
import Image from 'next/image';

export default function FooterTours() {
  const footerLinks = [
    { href: '/tours', label: 'Tours' },
    { href: '/tours/plan-holiday', label: 'Plan Holiday' },
    { href: '/contact', label: 'Contact' },
    { href: '/support', label: 'Support' },
  ];

  const socialMediaLinks = [
    { href: 'https://facebook.com', src: '/icons/facebook.svg', alt: 'Facebook' },
    { href: 'https://twitter.com', src: '/icons/twitter.svg', alt: 'Twitter' },
    { href: 'https://instagram.com', src: '/icons/instagram.svg', alt: 'Instagram' },
    { href: 'https://wa.me/+254743524370', src: '/icons/whatsapp.svg', alt: 'WhatsApp' }, // Mock number
  ];

  const paymentMethods = [
    { src: '/icons/mpesa.svg', alt: 'M-Pesa' },
    { src: '/icons/paypal.svg', alt: 'PayPal' },
    { src: '/icons/applepay.svg', alt: 'Apple Pay' },
    { src: '/icons/stripe.svg', alt: 'Stripe' },
  ];

  return (
    <footer className="bg-gradient-to-r from-teal-400 to-teal-700 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div className="md:col-span-2">
            <p className="font-lato text-sm sm:text-base mb-6">
              © 2025 Digital Voyaging. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row justify-center sm:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
              {footerLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="hover:text-teal-100 font-lato text-sm sm:text-base transition duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-center md:text-right">
            <h3 className="font-montserrat text-lg mb-4">Ways to Pay (Tours)</h3>
            <div className="grid grid-cols-2 gap-4 justify-center md:justify-end">
              {paymentMethods.map((method, index) => (
                <Image
                  key={index}
                  src={method.src}
                  alt={method.alt}
                  width={40}
                  height={40}
                  className="mx-auto md:mx-0"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          {socialMediaLinks.map((social, index) => (
            <Link key={index} href={social.href} target="_blank" rel="noopener noreferrer">
              <Image
                src={social.src}
                alt={social.alt}
                width={24}
                height={24}
                className="hover:brightness-125 transition duration-300"
                style={{ filter: 'invert(1) hue-rotate(180deg)' }}
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}