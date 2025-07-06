'use client';
import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { visaFAQs } from '@/components/visa/visaData';
import { gsap } from 'gsap';
import {
  HiOutlineQuestionMarkCircle,
  HiOutlineDocumentText,
  HiOutlineBolt,
  HiOutlineXCircle,
  HiOutlineGlobeAlt,
  HiOutlinePhone, 
} from 'react-icons/hi2';
import Image from 'next/image';

const extraFAQs = [
  {
    question: "Can I apply for a visa online?",
    answer: "Yes, you can complete your visa application online through our secure platform. Most countries now support electronic submissions for travel visas.",
    icon: <HiOutlineGlobeAlt className="w-6 h-6 text-purple-600" key="online" />,
  },
  {
    question: "How can I contact support?",
    answer: "You can reach our support team via live chat, email, or phone. Visit our contact page for all available options.",
    icon: <HiOutlinePhone className="w-6 h-6 text-teal-600" key="phone" />,
  }
];

// Compose all FAQ data and icons
const allFAQs = [
  ...visaFAQs,
  ...extraFAQs,
];

const faqIcons = [
  <HiOutlineQuestionMarkCircle className="w-6 h-6 text-blue-600" key="q1" />,     // How long...
  <HiOutlineDocumentText className="w-6 h-6 text-green-600" key="q2" />,          // What documents...
  <HiOutlineBolt className="w-6 h-6 text-yellow-500" key="q3" />,                 // Expedite...
  <HiOutlineXCircle className="w-6 h-6 text-red-600" key="q4" />,                 // Rejected...
  <HiOutlineGlobeAlt className="w-6 h-6 text-purple-600" key="online" />,         // Online...
  <HiOutlinePhone className="w-6 h-6 text-teal-600" key="phone" />,               // Support...
];

export default function FAQ() {
  useEffect(() => {
    gsap.fromTo(
      '.visa-faq',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
    gsap.fromTo(
      '.faq-card',
      { opacity: 0, scale: 0.98, y: 16 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.13, ease: 'power2.out', delay: 0.2 }
    );
  }, []);

  return (
    <section className="container mx-auto px-4 py-16 bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-col items-center">
        <div className="flex items-center mb-4 gap-2">
          <HiOutlineQuestionMarkCircle className="w-8 h-8 text-blue-500" />
          <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
        </div>
        <p className="text-lg text-gray-500 dark:text-gray-300 mb-10 text-center max-w-xl">
          Got questions about your visa application? Find answers to the most common queries below, or <a href="/contact" className="text-blue-600 hover:underline">contact our support team</a>.
        </p>
      </div>
      <Accordion type="single" collapsible className="visa-faq flex flex-col gap-4 max-w-3xl mx-auto">
        {allFAQs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className={`
              faq-card
              bg-white dark:bg-gray-900
              rounded-2xl shadow-xl
              border border-gray-100 dark:border-gray-700
              transition-all
              group
              overflow-hidden
              hover:shadow-2xl
            `}
          >
            <AccordionTrigger
              className="
                flex items-center gap-3 px-6 py-4
                font-semibold text-left text-lg
                focus:outline-none
                group-open:bg-blue-50 group-open:dark:bg-blue-950
                transition-colors
                no-underline
              "
            >
              <span className="flex-shrink-0">
                {faqIcons[index] || <HiOutlineQuestionMarkCircle className="w-6 h-6 text-blue-400" />}
              </span>
              <span>{index + 1 < 10 ? `0${index + 1}` : index + 1}.</span>
              
              <span className="flex-1">
                <span className="transition hover:underline  decoration-2">
                  {faq.question}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent
              className="
                px-6 pb-5 pt-1 text-gray-700 dark:text-slate-200 bg-white/90 dark:bg-gray-900/90 text-base
                leading-relaxed
              "
            >
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-10 flex justify-center">
        <Image
          src="/icons/FAQs-amico.svg"
          alt="FAQ Illustration"
          className="w-40 h-40 object-contain opacity-80"
          loading="lazy"
          width={100}
          height={100}
        />
      </div>
    </section>
  );
}