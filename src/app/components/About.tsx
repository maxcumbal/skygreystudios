import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Camera, Users2, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Camera, value: 300, label: 'Projekte', suffix: '+' },
  { icon: Users2, value: 40, label: 'Marken', suffix: '+' },
  { icon: Award, value: 25, label: 'Virale Hits', suffix: '+' },
  { icon: TrendingUp, value: 10, label: 'Jahre Erfahrung', suffix: '+' },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      statsRef.current.forEach((stat, index) => {
        if (stat) {
          gsap.fromTo(
            stat,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: 0.5 + index * 0.1,
              scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
              },
            }
          );

          // Counter Animation
          const numberElement = numberRefs.current[index];
          if (numberElement) {
            const targetValue = stats[index].value;
            const counter = { value: 0 };
            
            gsap.to(counter, {
              value: targetValue,
              duration: 2.5,
              delay: 0.7 + index * 0.1,
              ease: 'power2.out',
              onUpdate: () => {
                numberElement.textContent = Math.floor(counter.value).toString();
              },
              scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                once: true,
              },
            });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen py-20 px-6 bg-black"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
  src="/images/about.jpeg"
  alt="Professional Video Equipment"
  className="w-full h-full object-cover"
/>
            </div>
            <div
              className="absolute -bottom-6 -right-6 w-full h-full border-2 rounded-lg -z-10"
              style={{ borderColor: 'var(--gold)' }}
            />
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <h2
              className="text-5xl md:text-7xl tracking-wider mb-8"
              style={{ color: 'var(--gold)' }}
            >
              ÜBER MICH
            </h2>
            <div className="space-y-6 text-white/70 leading-relaxed">
              <p className="text-lg">
                Ich bin Erich Joshua, 
        Filmemacher und Gründer von SkyGrey Studios.
              </p>
              <p>
                Meine kreative Reise führte mich von Barcelona bis nach Köln, 
        wo ich an der MMC Studios Köln studierte. 
              </p>
              <p>
                Dort entdeckte ich, wie kraftvoll visuelle Geschichten Emotionen wecken und Menschen verbinden können.
              </p>
              <p>
                Heute arbeite ich mit Unternehmen und Marken, die durch authentische, emotionale Bilder wachsen möchten. 
        Ich konzipiere und produziere Videos, die berühren, im Gedächtnis bleiben und Geschichten erzählen, die wirken.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                ref={(el) => (statsRef.current[index] = el)}
                className="text-center p-6 rounded-lg border border-white/10 bg-white/5"
              >
                <div className="flex justify-center mb-4">
                  <Icon size={32} style={{ color: 'var(--gold)' }} />
                </div>
                <div className="text-4xl mb-2" style={{ color: 'var(--gold)' }}>
                  <div
                    ref={(el) => (numberRefs.current[index] = el)}
                    className="inline-block"
                  >
                    0
                  </div>
                  {stat.suffix}
                </div>
                <div className="text-white/60 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}