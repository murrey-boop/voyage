export interface VisaService {
    title: string;
    description: string;
    icon: string; // Placeholder for icon names (e.g., to use with an icon library)
  }
  
  export interface VisaDestination {
    country: string;
    flag: string; // Path to flag image
    processingTime: string;
    requirements: string;
  }
  
  export interface VisaStep {
    step: string;
    description: string;
  }
  
  export interface FAQItem {
    question: string;
    answer: string;
  }
  
  export const visaServices: VisaService[] = [
    {
      title: 'Application Assistance',
      description: 'We guide you through every step of the visa application process.',
      icon: 'FileText',
    },
    {
      title: 'Document Checklist',
      description: 'Ensure you have all required documents with our comprehensive checklist.',
      icon: 'CheckSquare',
    },
    {
      title: 'Fast Processing',
      description: 'Expedited options available for urgent travel needs.',
      icon: 'Clock',
    },
  ];
  
  export const visaDestinations: VisaDestination[] = [
    {
      country: 'Middle East',
      flag: '/flags/qatar.jpg',
      processingTime: '3-5 weeks',
      requirements: 'Passport, photos, travel itinerary',
    },
    {
      country: 'Australia',
      flag: '/flags/australia.jpg',
      processingTime: '20-30 days',
      requirements: 'Online application, health check',
    },
    {
      country: 'Spain',
      flag: '/flags/spain.jpg',
      processingTime: '2-4 weeks',
      requirements: 'Passport, proof of accommodation',
    },
    {
      country: 'Oman',
      flag: '/flags/placeholder.jpg',
      processingTime: '3-7 days',
      requirements: 'Passport, hotel booking, return ticket',
    },
    {
      country: 'Nairobi',
      flag: '/flags/kenya.jpg',
      processingTime: '1-2 weeks',
      requirements: 'Passport, travel purpose letter',
    },
    {
      country: 'USA',
      flag: '/flags/usa.jpg',
      processingTime: '4-6 weeks',
      requirements: 'DS-160 form, interview',
    },
    {
      country: 'Europe',
      flag: '/flags/germany.jpg',
      processingTime: '15-30 days',
      requirements: 'Schengen visa application, travel insurance',
    },
    {
      country: 'India',
      flag: '/flags/india.jpg',
      processingTime: '2-3 weeks',
      requirements: 'Passport, proof of funds',
    },
  ];
  
  export const visaSteps: VisaStep[] = [
    {
      step: 'Submit Documents',
      description: 'Upload your documents securely through our online portal.',
    },
    {
      step: 'We Process',
      description: 'Our team reviews and submits your application to the relevant embassy.',
    },
    {
      step: 'Receive Visa',
      description: 'Get your visa approval and travel worry-free.',
    },
  ];
  
  export const visaFAQs: FAQItem[] = [
    {
      question: 'How long does a visa application take?',
      answer: 'It varies by country, typically 2-6 weeks. Expedited options are available.',
    },
    {
      question: 'What documents are required for a visa?',
      answer: 'Common requirements include a valid passport, photos, and proof of travel plans.',
    },
    {
      question: 'Can you expedite my visa application?',
      answer: 'Yes, we offer expedited processing for select destinations.',
    },
    {
      question: 'What if my visa application is rejected?',
      answer: 'We’ll assist you in understanding the rejection and guide you on the next steps.',
    },
  ];