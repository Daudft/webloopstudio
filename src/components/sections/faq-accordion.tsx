'use client';

import React, { useState } from 'react';
import { faqsData } from '@/data/faqs';
import { FadeIn } from '@/components/animations/fade-in';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 relative" id="faq">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Got Questions?
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base sm:text-lg text-muted-foreground">
              Everything you need to know about our collaboration model, timelines, and guarantees.
            </p>
          </FadeIn>
        </div>

        <div className="space-y-4">
          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <FadeIn key={faq.question} delay={index * 0.05}>
                <div
                  className={cn(
                    'glass-panel rounded-2xl border transition-all overflow-hidden',
                    isOpen ? 'border-purple-500/40 bg-card/80' : 'border-white/5 hover:border-white/20'
                  )}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-bold text-base sm:text-lg text-white">
                      {faq.question}
                    </span>
                    <div
                      className={cn(
                        'h-8 w-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-300',
                        isOpen && 'rotate-180 bg-purple-600/30 text-purple-300'
                      )}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-sm sm:text-base text-muted-foreground leading-relaxed animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
