import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';


gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    company: 'ImmoScout24',
    quote:
      'Erich Joshua Cisneros überzeugte durch Fachkompetenz, Kreativität und Zuverlässigkeit – jede Produktion ein Erfolg.',
    name: 'ImmoScout24 · Marketingabteilung',
    logo: '/images/immoscout24.png',
  },
  {
    company: 'Universitätsklinikum Bonn',
    quote:
      'Zuverlässig, professionell und menschlich – jedes Projekt wurde mit höchster Präzision umgesetzt.',
    name: 'Universitätsklinikum Bonn · Kommunikationsabteilung',
    logo: '/images/ukb.png',
  },
  {
    company: 'Kardena GmbH',
    quote:
      'Strukturiert, engagiert und mit Liebe zum Detail – unsere Projekte übertrafen alle Erwartungen.',
    name: 'Kardena GmbH · Geschäftsführung',
    logo: '/images/kardena.png',
  },
  {
    company: 'Salsa Cubana Düsseldorf',
    quote:
      'Ein verlässlicher Partner mit beeindruckender Kreativität und Gespür für Atmosphäre.',
    name: 'Torsten Zapka · Salsa Cubana Düsseldorf',
    logo: '/images/innomove.png',
  },
  {
    company: 'ZEvents & Vibes',
    quote:
      'Jede Produktion bringt Energie, Emotion und Stil – seine Arbeit spricht für sich.',
    name: 'Sara Yi · ZEvents & Vibes',
    logo: '/images/eventsvibes.png',
  },
  {
    company: 'United-4-Kenya e.V.',
    quote:
      'Mit Empathie, Präzision und künstlerischem Verständnis – seine Arbeit bewegt und inspiriert.',
    name: 'United-4-Kenya e.V. · Entwicklungszusammenarbeit',
    logo: '/images/united4kenya.png',
  },
  {
    company: 'Deutsche Vermögensberatung',
    quote:
      'Hohe Kompetenz, kreative Umsetzung und stets professionelles Auftreten – absolute Empfehlung.',
    name: 'Davide Preite · Agentur für Finanzplanung',
    logo: '/images/dvag.jpeg',
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Stagger Cards Animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.15,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[150px]"
          style={{
            background:
              'radial-gradient(circle, rgba(183, 148, 92, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Modern Title */}
        <div className="text-center mb-24">
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl tracking-wider mb-6"
            style={{ color: 'var(--gold)' }}
          >
            KUNDENSTIMMEN
          </h2>
          <div className="w-24 h-1 mx-auto" style={{ backgroundColor: 'var(--gold)' }} />
        </div>

        {/* Modern Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <ModernTestimonialCard
                testimonial={testimonial}
                index={index}
                isActive={activeIndex === index}
                onHover={() => setActiveIndex(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: typeof testimonials[0];
  index: number;
  isActive: boolean;
  onHover: () => void;
}

function ModernTestimonialCard({
  testimonial,
  index,
  isActive,
  onHover,
}: TestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        onHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full cursor-pointer"
    >
      {/* Minimalist Card */}
      <div
        className="relative h-full p-8 rounded-lg transition-all duration-700 flex flex-col"
        style={{
          background: isHovered
            ? 'linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(30, 30, 30, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(15, 15, 15, 0.8) 0%, rgba(20, 20, 20, 0.8) 100%)',
          border: isHovered
            ? '1px solid rgba(183, 148, 92, 0.4)'
            : '1px solid rgba(255, 255, 255, 0.05)',
          transform: isHovered ? 'translateY(-12px)' : 'translateY(0)',
          boxShadow: isHovered
            ? '0 24px 48px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(183, 148, 92, 0.1)'
            : '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Top Accent Line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-700"
          style={{
            background: isHovered
              ? 'linear-gradient(90deg, transparent, var(--gold), transparent)'
              : 'transparent',
          }}
        />

        {/* Logo */}
        <div className="flex items-center justify-center mb-6 h-16">
          <img
            src={testimonial.logo}
            alt={testimonial.company}
            className="h-full w-auto object-contain transition-all duration-500"
            style={{
              filter: isHovered
                ? 'brightness(1.2) drop-shadow(0 4px 16px rgba(183, 148, 92, 0.3))'
                : 'brightness(0.95) grayscale(0.2)',
              opacity: isHovered ? 1 : 0.8,
            }}
          />
        </div>

        {/* Stars */}
        <div className="flex items-center justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className="transition-all duration-300"
              style={{
                fill: isHovered ? 'var(--gold)' : 'rgba(183, 148, 92, 0.6)',
                color: isHovered ? 'var(--gold)' : 'rgba(183, 148, 92, 0.6)',
              }}
            />
          ))}
        </div>

        {/* Quote */}
        <p
          className="text-sm leading-relaxed mb-6 flex-grow transition-colors duration-500"
          style={{
            color: isHovered ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)',
          }}
        >
          „{testimonial.quote}"
        </p>

        {/* Divider */}
        <div
          className="w-full h-[1px] mb-4 transition-all duration-500"
          style={{
            background: isHovered
              ? 'linear-gradient(90deg, transparent, rgba(183, 148, 92, 0.3), transparent)'
              : 'rgba(255, 255, 255, 0.05)',
          }}
        />

        {/* Author */}
        <p
          className="text-xs tracking-wider transition-colors duration-500"
          style={{
            color: isHovered ? 'var(--gold)' : 'rgba(183, 148, 92, 0.7)',
          }}
        >
          {testimonial.name}
        </p>
      </div>
    </div>
  );
}