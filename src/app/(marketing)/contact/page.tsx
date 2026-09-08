import { Metadata } from 'next';
import { constructMetadata } from '@/lib/metadata';
import { ContactForm } from '@/components/sections/contact-form';
import { siteConfig } from '@/config/site';
import { FadeIn } from '@/components/animations/fade-in';
import { Mail, MapPin, Phone, Clock, Sparkles } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: 'Contact Webloop Studio',
  description:
    'Start a project inquiry with Webloop Studio. Reach out to discuss timelines, pricing, or book an architectural discovery session.',
});

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="glow-ambient w-96 h-96 bg-purple-600/15 top-20 right-10" />
      <div className="glow-ambient w-96 h-96 bg-cyan-600/10 bottom-10 left-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <FadeIn>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
              Start a Conversation
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
              Let’s build something extraordinary together.
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Fill in your project details below and a senior engineering partner will respond within 24 business hours.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <FadeIn delay={0.3}>
              <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
                <h3 className="text-xl font-bold text-white">Direct Contact</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-semibold uppercase">Email Us</div>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="text-white hover:text-purple-300 font-medium text-sm transition-colors"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-semibold uppercase">Response Time</div>
                      <div className="text-white text-sm font-medium">Under 24 Business Hours</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-pink-400" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-semibold uppercase">Studio Location</div>
                      <div className="text-white text-sm font-medium">{siteConfig.contact.city}</div>
                      <div className="text-xs text-muted-foreground">Operating Worldwide / Remote</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="glass-panel p-8 rounded-3xl border border-purple-500/20 bg-purple-950/20 space-y-4">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                  <Sparkles className="h-4 w-4" />
                  <span>Our Promise</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  We treat every inquiry under strict NDA standards. We never outsource your project to junior third parties—every line of code is produced by our vetted senior in-house engineers.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.3}>
              <ContactForm />
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
