'use client';

import React from 'react';
import Image from 'next/image';
import { testimonialsData } from '@/data/testimonials';
import { FadeIn, FadeInStagger } from '@/components/animations/fade-in';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-secondary/30 border-y border-white/5 relative overflow-hidden" id="testimonials">
      <div className="glow-ambient w-96 h-96 bg-purple-600/10 -top-20 -left-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Client Testimonials
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Trusted by industry leaders worldwide.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base sm:text-lg text-muted-foreground">
              Here is what founders, CTOs, and product leaders have to say about partnering with Webloop Studio.
            </p>
          </FadeIn>
        </div>

        <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((review) => (
            <div
              key={review.id}
              className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6 hover:border-purple-500/30 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {/* 5-star rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {review.highlight && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {review.highlight}
                    </span>
                  )}
                </div>

                <p className="text-base text-zinc-200 leading-relaxed italic">
                  "{review.content}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <div className="relative h-12 w-12 rounded-full overflow-hidden border border-white/20">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{review.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {review.role} • <span className="text-purple-300">{review.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
