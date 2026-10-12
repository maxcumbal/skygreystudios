import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const services = [
  { title: 'WERBE- & UNTERNEHMENSFILME', detail: 'Imagefilme, Markenstories und Unternehmensvideos.' },
  { title: 'SOCIAL MEDIA CONTENT', detail: 'Bewegtbild für Instagram, TikTok und YouTube.' },
  { title: 'MUSIK- & KREATIVVIDEOS', detail: 'Visuelle Konzepte für Artists und kreative Projekte.' },
  { title: 'EVENTS & FOTOGRAFIE', detail: 'Momente und Atmosphäre in Film und Bild.' },
  { title: 'EMPLOYER BRANDING', detail: 'Authentische Einblicke in Menschen und Unternehmenskultur.' },
  { title: 'POSTPRODUKTION & EDITING', detail: 'Schnitt, Color Grading und visuelles Finishing.' },
];

export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" aria-labelledby="services-title" className="w-full bg-black px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5 sm:mb-16">
          <div>
            
            <h2 id="services-title" className="text-[clamp(3.5rem,11vw,10rem)] font-black uppercase leading-[0.82] tracking-[-0.075em]">SERVICES<span className="text-white/30">.</span></h2>
          </div>
          <span className="pb-1 text-[10px] uppercase tracking-[0.25em] text-white/40">01 — 06</span>
        </div>

        <div className="border-t border-white/20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.2) }}
              className="border-b border-white/20"
            >
              <button
                type="button"
                aria-expanded={active === index}
                aria-controls={`service-detail-${index}`}
                onClick={() => setActive(active === index ? null : index)}
                className="group flex w-full cursor-pointer items-center gap-4 py-7 text-left transition-colors duration-300 hover:bg-white/[0.045] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white sm:gap-8 sm:py-9"
              >
                <span className="w-8 shrink-0 text-xs font-medium tracking-widest text-white/40 sm:w-12">0{index + 1}</span>
                <span className="min-w-0 flex-1 text-[clamp(1.15rem,3.2vw,3.6rem)] font-bold uppercase leading-tight tracking-[-0.045em] transition-transform duration-300 group-hover:translate-x-2">
                  {service.title}
                </span>
                <ArrowUpRight aria-hidden="true" className={`h-6 w-6 shrink-0 transition-transform duration-300 sm:h-9 sm:w-9 ${active === index ? 'rotate-90' : 'group-hover:rotate-45'}`} strokeWidth={1.4} />
              </button>
              <div id={`service-detail-${index}`} hidden={active !== index} className="pb-8 pl-12 pr-8 sm:pl-20">
                <p className="max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">{service.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-7 text-xs tracking-wide text-white/35">Leistung auswählen, um mehr zu erfahren.</p>
      </div>
    </section>
  );
}
