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

export default function FAQ() {
  useEffect(() => {
    gsap.fromTo(
      '.visa-faq',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  return (
    <section className="container mx-auto px-4 py-16 bg-gray-100 dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="visa-faq">
        {visaFAQs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}