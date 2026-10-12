import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Kundenstimmen aus der bisherigen Testimonials.tsx, unverändert übernommen.
const testimonials = [
  { company: 'ImmoScout24', quote: 'Erich Joshua Cisneros überzeugte durch Fachkompetenz, Kreativität und Zuverlässigkeit. Jede Produktion ein Erfolg.', name: 'ImmoScout24 · Marketingabteilung', logo: '/images/immoscout24.png' },
  { company: 'Universitätsklinikum Bonn', quote: 'Zuverlässig, professionell und menschlich. Jedes Projekt wurde mit höchster Präzision umgesetzt.', name: 'Universitätsklinikum Bonn · Kommunikationsabteilung', logo: '/images/ukb.png' },
  { company: 'Kardena GmbH', quote: 'Strukturiert, engagiert und mit Liebe zum Detail. Unsere Projekte übertrafen alle Erwartungen.', name: 'Kardena GmbH · Geschäftsführung', logo: '/images/kardena.png' },
  { company: 'Salsa Cubana Düsseldorf', quote: 'Ein verlässlicher Partner mit beeindruckender Kreativität und Gespür für Atmosphäre.', name: 'Torsten Zapka · Salsa Cubana Düsseldorf', logo: null },
  { company: 'ZEvents & Vibes', quote: 'Jede Produktion bringt Energie, Emotion und Stil. Seine Arbeit spricht für sich.', name: 'Sara Yi · ZEvents & Vibes', logo: '/images/eventsvibes.png' },
  { company: 'United-4-Kenya e.V.', quote: 'Mit Empathie, Präzision und künstlerischem Verständnis. Seine Arbeit bewegt und inspiriert.', name: 'United-4-Kenya e.V. · Entwicklungszusammenarbeit', logo: '/images/united4kenya.png' },
  { company: 'Deutsche Vermögensberatung', quote: 'Hohe Kompetenz, kreative Umsetzung und stets professionelles Auftreten. Absolute Empfehlung.', name: 'Davide Preite · Agentur für Finanzplanung', logo: '/images/dvag.jpeg' },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const goTo = (step: number) => setActiveIndex((index) => (index + step + testimonials.length) % testimonials.length);
  const current = testimonials[activeIndex];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const section = document.getElementById('testimonials');
      if (!section?.contains(document.activeElement)) return;
      if (event.key === 'ArrowLeft') { event.preventDefault(); goTo(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); goTo(1); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section id="testimonials" aria-label="Kundenstimmen" className="w-full bg-black px-6 py-24 text-white sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-[clamp(3.5rem,10vw,9rem)] font-bold uppercase leading-[0.85] tracking-[-0.07em]">REVIEWS<span className="text-white/35">.</span></h2>
          <span className="pb-1 text-xs font-medium tracking-[0.2em] text-white/45 tabular-nums" aria-label={`Rezension ${activeIndex + 1} von ${testimonials.length}`}>
            {String(activeIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </span>
        </div>
        <div className="mt-10 h-px w-full bg-white/20 sm:mt-14" />
        <div className="flex min-h-[350px] flex-col justify-between gap-14 py-12 sm:min-h-[420px] sm:py-16" aria-live="polite" aria-atomic="true">
          <blockquote key={activeIndex} className="max-w-5xl text-[clamp(1.55rem,3.6vw,3.75rem)] font-medium leading-[1.18] tracking-[-0.035em] text-white">
            <span aria-hidden="true" className="text-white/35">“</span>{current.quote}<span aria-hidden="true" className="text-white/35">”</span>
          </blockquote>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="flex min-w-0 items-center gap-5 sm:gap-7">
              {current.logo && (
                <div className="flex h-16 w-28 shrink-0 items-center justify-center sm:h-20 sm:w-36">
                  <img
                    key={current.logo}
                    src={current.logo}
                    alt={`${current.company} Logo`}
                    loading="lazy"
                    className="max-h-14 max-w-full object-contain opacity-100 transition-transform duration-500 ease-out sm:max-h-16"
                  />
                </div>
              )}
              <div className="min-w-0 space-y-2">
                <p className="text-sm font-semibold text-white">{current.company}</p>
                <p className="text-sm text-white/50">{current.name}</p>
              </div>
            </div>
            <div className="flex gap-3" aria-label="Rezensionen durchblättern">
              <button type="button" onClick={() => goTo(-1)} aria-label="Vorherige Rezension" className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                <ArrowLeft size={19} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => goTo(1)} aria-label="Nächste Rezension" className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                <ArrowRight size={19} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-white/20" />
      </div>
    </section>
  );
}
