import { motion, useReducedMotion } from 'motion/react';

interface Logo {
  name: string;
  src: string;
}

const logos: Logo[] = [
  { name: 'ImmobilienScout24', src: '/images/immoscout24.png' },
  { name: 'Innomove', src: '/images/innomove.png' },
  { name: 'Universitätsklinikum Bonn', src: '/images/ukb.png' },
  { name: 'Deutsche Vermögensberatung', src: '/images/dvag.jpeg' },
  { name: 'Kardena', src: '/images/kardena.png' },
  { name: 'Events and Vibes', src: '/images/eventsvibes.png' },
  { name: 'United-4-Kenya', src: '/images/united4kenya.png' },
];

export function LogoMarquee() {
  const reduceMotion = useReducedMotion();

  const logoItems = (copy: number) => logos.map((logo) => (
    <div
      key={`${copy}-${logo.name}`}
      className="group flex h-20 w-36 shrink-0 items-center justify-center sm:w-44"
    >
      <img
        src={logo.src}
        alt={copy === 0 ? logo.name : ''}
        aria-hidden={copy !== 0}
        loading="lazy"
        className="max-h-14 max-w-[132px] object-contain grayscale brightness-90 opacity-65 transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 group-hover:scale-105 sm:max-w-[152px]"
      />
    </div>
  ));

  return (
    <section aria-label="Unternehmen und Partner" className="relative w-full overflow-hidden bg-black py-6 sm:py-8">
      <div className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black to-transparent sm:w-28" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black to-transparent sm:w-28" />
        <motion.div
          className="flex w-max items-center"
          animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
          transition={reduceMotion ? undefined : { duration: 36, ease: 'linear', repeat: Infinity }}
        >
          <div className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">{logoItems(0)}</div>
          <div aria-hidden="true" className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">{logoItems(1)}</div>
        </motion.div>
      </div>
    </section>
  );
}
