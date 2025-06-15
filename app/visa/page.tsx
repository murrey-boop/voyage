import VisaNavbar from '@/components/visa/VisaNavbar';
import VisaHero from '@/components/visa/VisaHero';
import VisaServices from '@/components/visa/VisaServices';
import VisaDestinations from '@/components/visa/VisaDestinations';
import HowItWorks from '@/components/visa/HowItWorks';
import FAQ from '@/components/visa/FAQs';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export default function VisaPage() {
  return (
    <main>
      <VisaNavbar />
      <VisaHero />
      <VisaServices />
      <VisaDestinations />
      <HowItWorks />
      <FAQ />
      <CallToAction />
      <Footer />

    </main>
  );
}