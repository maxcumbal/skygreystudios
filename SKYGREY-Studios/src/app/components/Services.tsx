import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Video, Film, Camera, Clapperboard, Users, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Video,
    title: 'Werbefilme & Unternehmensvideos',
    description: 'Unsere Imagefilm Produktion verbindet Storytelling und moderne Videoproduktion – von der Idee bis zur finalen Ausspielung erzählen wir die Geschichte deines Unternehmens.',
  },
  {
    icon: Film,
    title: 'Social Media Content',
    description: 'Ob für Instagram, TikTok oder YouTube – wir produzieren hochwertigen, authentischen und viralen Content, der deine Zielgruppe erreicht.',
  },
  {
    icon: Camera,
    title: 'Musik- & Kreativvideos',
    description: 'Wir realisieren künstlerische Visionen mit Leidenschaft, Dynamik und einzigartigem visuellen Stil – perfekt für Artists und Labels.',
  },
  {
    icon: Clapperboard,
    title: 'Events & Fotografie',
    description: 'Von Hochzeiten bis Festivals – wir fangen Emotionen, Atmosphäre und die wichtigsten Momente ein, mit Foto und Video.',
  },
  
  {
    icon: Sparkles,
    title: 'Employer Branding',
    description: 'Authentischer Recruiting-Content und moderne Videos, die Menschen und Unternehmenskultur sichtbar machen – für eine starke, ehrliche Arbeitgeberpositionierung, die die richtigen Talente erreicht.',
  },
  {
    icon: Users,
    title: 'Postproduktion & Editing',
    description: 'Schnitt, Color Grading und visuelle Effekte – wir geben deinen Aufnahmen den finalen Look mit professionellem Finish.',
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
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
            { opacity: 0, y: 50, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.12,
              ease: 'power3.out',
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardElement: HTMLDivElement) => {
    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    
    gsap.to(cardElement, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.5,
      ease: 'power2.out',
    });

    // Update gradient position
    const gradientX = (x / rect.width) * 100;
    const gradientY = (y / rect.height) * 100;
    
    const overlay = cardElement.querySelector('.gradient-overlay') as HTMLElement;
    if (overlay) {
      overlay.style.background = `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(201, 169, 97, 0.15) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = (cardElement: HTMLDivElement) => {
    gsap.to(cardElement, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="min-h-screen py-20 px-6"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="container mx-auto max-w-7xl">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl tracking-wider mb-20"
          style={{ color: 'var(--gold)' }}
        >
          LEISTUNGEN
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative overflow-hidden rounded-xl"
                style={{
                  transformStyle: 'preserve-3d',
                  minHeight: '340px',
                }}
                onMouseMove={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  handleMouseMove(e, target);
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  handleMouseLeave(target);
                }}
              >
                {/* Background with gradient border effect */}
                <div 
                  className="absolute inset-0 p-[1px] rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(201, 169, 97, 0.3), rgba(201, 169, 97, 0.05), rgba(201, 169, 97, 0.2))',
                  }}
                >
                  <div 
                    className="h-full w-full rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
                      backdropFilter: 'blur(20px)',
                    }}
                  />
                </div>

                {/* Interactive gradient overlay */}
                <div 
                  className="gradient-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(201, 169, 97, 0.15) 0%, transparent 60%)',
                  }}
                />

                {/* Shine effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
                    transform: 'translateX(-100%)',
                    animation: 'shine 3s infinite',
                  }}
                />

                {/* Content */}
                <div className="relative h-full p-8 flex flex-col z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className="inline-flex w-16 h-16 rounded-xl items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(201, 169, 97, 0.15) 0%, rgba(201, 169, 97, 0.05) 100%)',
                        boxShadow: '0 4px 24px rgba(201, 169, 97, 0.1)',
                      }}
                    >
                      <Icon 
                        size={28} 
                        strokeWidth={1.5}
                        style={{ color: 'var(--gold)' }}
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-2xl mb-4 transition-all duration-300 group-hover:translate-x-1"
                    style={{ color: '#ffffff' }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p 
                    className="text-base leading-relaxed mt-auto"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    {service.description}
                  </p>

                  {/* Bottom accent line */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-700"
                    style={{
                      background: 'linear-gradient(90deg, var(--gold) 0%, transparent 100%)',
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        #services .group:hover .group-hover\\:scale-x-100 {
          transform: scaleX(1);
        }
      `}</style>
    </section>
  );
}