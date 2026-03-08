import { motion } from 'motion/react';


interface Logo {
  name: string;
  src: string;
}

export function LogoMarquee() {
  // Beispiel-Logos von bekannten Unternehmen
  const logos: Logo[] = [
  { name: 'ImmobilienScout24', src: '/images/immoscout24.png' },
  { name: 'Innomove', src: '/images/innomove.png' },
  { name: 'Universitätsklinikum Bonn', src: '/images/ukb.png' },
  { name: 'Deutsche Vermögensberatung', src: '/images/dvag.jpeg' },
  { name: 'Kardena', src: '/images/kardena.png' },
  { name: 'Events and Vibes', src: '/images/eventsvibes.png' },
  { name: 'United-4-Kenya', src: '/images/united4kenya.png' },
];

  return (
    <div className="relative w-full py-8 overflow-hidden bg-black">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

      {/* Infinite Marquee */}
      <div className="overflow-hidden relative">
        <motion.div
          className="flex gap-16 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16">
              {logos.map((logo, index) => (
                <div
                  key={`${i}-${logo.name}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <img 
                    src={logo.src} 
                    alt={logo.name}
                    className="h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}