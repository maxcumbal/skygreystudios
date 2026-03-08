import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram } from 'lucide-react';


gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'Erich Joshua Cisneros',
    role: 'Founder · Creative Director',
image: '/images/erich.jpeg',
    bio: 'Erich liebt gute Bilder und ehrliche Geschichten. Wenn er nicht gerade hinter der Kamera steht, denkt er schon über die nächste Idee nach.',
    imagePosition: 'center',
    instagram: 'https://www.instagram.com/rickyonset',
  },
  {
    name: 'Lina Rk',
    role: 'Social Media Managerin',
    image: '/images/lina.jpeg',
    bio: 'Lina versteht Algorithmen fast so gut wie Menschen. Sie weiß, wann ein Post funktioniert und wann man ihn besser in den Entwürfen lässt.',
    imagePosition: 'center',
    instagram: 'https://www.instagram.com/lilinaaea',
  },
  {
    name: 'Dardan Cisneros',
    role: 'Cutter',
    image: '/images/dardan.jpeg',
    bio: 'Dardan sieht, was andere übersehen – und in einem Augenblick entsteht Kunst.',
    imagePosition: 'center 20%',
    instagram: 'https://www.instagram.com/dardan.tmr',
  },
  {
    name: 'Jennifer Ast',
    role: 'Sales Assistentin',
    image: '/images/jennifer.jpeg',
    bio: 'Jennifer ist das Organisationstalent im Team. Während andere noch nach der letzten Mail suchen, hat sie schon drei Antworten vorbereitet.',
    imagePosition: 'center 20%',
    instagram: 'https://www.instagram.com/jenniferaaaa',
  },
];

export function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 100, rotateY: 20 },
            {
              opacity: 1,
              y: 0,
              rotateY: 0,
              duration: 0.8,
              delay: index * 0.2,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
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
      id="team"
      ref={sectionRef}
      className="min-h-screen py-20 px-6"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="container mx-auto max-w-7xl">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl tracking-wider mb-20 text-center"
          style={{ color: 'var(--gold)' }}
        >
          TEAM
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group"
              style={{ perspective: '1000px' }}
            >
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ objectPosition: member.imagePosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                
                {/* Social Links - Appear on Hover */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-gold/20 transition-colors"
                    style={{ borderColor: 'var(--gold)' }}
                  >
                    <Instagram size={18} style={{ color: 'var(--gold)' }} />
                  </a>
                </div>
              </div>

              <h3 className="text-xl text-white mb-2">{member.name}</h3>
              <p className="text-sm uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>
                {member.role}
              </p>
              <p className="text-sm text-white/60 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}