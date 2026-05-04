import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'UNSERE PRIORITÄT? UNSERE KUNDEN.',
    category: 'SKYGREY SHOWREEL',
    description: (
      <>
        Wir verstehen uns nicht als klassische Produktionsfirma, sondern als verlässlicher Partner. Vom ersten Gespräch bis zur finalen Umsetzung arbeiten wir klar, direkt und transparent. Wir sagen offen, was sinnvoll ist – und genauso offen, wenn etwas keinen echten Mehrwert bringt.
        <br /><br />
        Als junges Team bringen wir frische Ideen, Erfahrung und ein gutes Gespür für Menschen und Marken mit. Für uns zählt nicht nur die Ästhetik, sondern die Wirkung. Ein gutes Video soll nicht nur gut aussehen – es soll etwas auslösen.
        <br /><br />
        Ob Imagefilm, Social Media oder Recruiting – wir denken mit, übernehmen Verantwortung und setzen Projekte strukturiert und professionell um.
      </>
    ),
    video: 'https://iframe.mediadelivery.net/embed/608059/5c798a40-4289-440f-a336-4c3e97b650db?autoplay=true&loop=true&muted=true&preload=true&responsive=true&controls=false&background=1',
  },
  {
    id: 2,
    title: 'WENN REALITÄT ZUR GESCHICHTE WIRD',
    category: 'DOKUMENTARFILM',
    description: (
      <>
        Ein Dokumentarfilm bedeutet für uns, nicht zu inszenieren, sondern genau hinzusehen.
        <br /><br />
        Mit Skygrey Studios arbeiten wir nah am Geschehen. Wir beobachten, stellen die richtigen Fragen und geben Menschen den Raum, ihre Geschichte selbst zu erzählen.
      </>
    ),
    video: 'https://iframe.mediadelivery.net/embed/608059/60abf3f8-0a23-4d09-9ace-380a23f25db8?autoplay=true&loop=true&muted=true&preload=true&responsive=true&controls=false&background=1',
  },
  {
    id: 3,
    title: 'WENN DEIN CONTENT NICHT ÜBERSEHEN WIRD',
    category: 'SOCIAL MEDIA',
    description: (
      <>
        Auf Social Media entscheidet der erste Moment. Entweder man bleibt hängen – oder man scrollt weiter.
        <br /><br />
        Mit Skygrey Studios produzieren wir Videos, die genau dafür gemacht sind: klar, modern und auf den Punkt. Wir achten auf starke Einstiege, saubere Bildsprache und einen Rhythmus, der zur Plattform passt.
      </>
    ),
    video: 'https://iframe.mediadelivery.net/embed/608059/42b6950c-e73a-4f4b-a968-da6726099d42?autoplay=true&loop=true&muted=true&preload=true&responsive=true&controls=false&background=1',
  },
  {
    id: 4,
    title: 'DER ERSTE EINDRUCK, DER BLEIBT',
    category: 'DEIN IMAGEFILM',
    description: (
      <>
        Ein Imagefilm ist die Möglichkeit, dein Unternehmen so zu zeigen, wie es wirklich ist.
        <br /><br />
        Mit Skygrey Studios entsteht ein Film, der nicht nur gut aussieht, sondern deine Marke spürbar macht.
      </>
    ),
    video: 'https://iframe.mediadelivery.net/embed/608059/29bfc64d-ba05-4022-ad63-aedabe2eb504?autoplay=true&loop=true&muted=true&preload=true&responsive=true&controls=false&background=1',
  },
  {
    id: 5,
    title: 'MOMENTE, DIE BLEIBEN',
    category: 'MESSE- & EVENTVIDEOS',
    description: (
      <>
        Ein Event dauert vielleicht nur einen Tag – die Wirkung kann deutlich länger bleiben.
        <br /><br />
        Mit Skygrey Studios begleiten wir deine Messe oder Veranstaltung vom ersten Eindruck bis zum letzten Applaus und halten die Atmosphäre, die Begegnungen und die wichtigsten Highlights in starken Bildern fest.
      </>
    ),
    video: 'https://iframe.mediadelivery.net/embed/608059/ee37bb79-dacb-492c-a161-3deb1d113abd?autoplay=true&loop=true&muted=true&preload=true&responsive=true&controls=false&background=1',
  },
];

const horizontalVideos = [
  { id: 1, src: "https://iframe.mediadelivery.net/embed/608059/acf90f1c-5826-44b8-9f7a-a7d3d025687d?autoplay=true&loop=true&muted=true&preload=true&responsive=true&controls=false&background=1" },
  { id: 2, src: "https://iframe.mediadelivery.net/embed/608059/68bacd39-8d4e-4e10-b0a7-1cefc05bb037?autoplay=true&loop=true&muted=true&preload=true&responsive=true" },
  { id: 3, src: "https://iframe.mediadelivery.net/embed/608059/1e5a10c8-f7eb-4b70-88d5-50d4eed0374d?autoplay=true&loop=true&muted=true&preload=true&responsive=true&controls=false&background=1" },
  { id: 4, src: "https://iframe.mediadelivery.net/embed/608059/26391f32-e8be-4713-8882-8a8ce262f635?autoplay=true&loop=true&muted=true&preload=true&responsive=true&controls=false&background=1" },
  { id: 5, src: "https://iframe.mediadelivery.net/embed/608059/81ea8caf-48f1-41f1-9fab-7f3e2da82b5f?autoplay=true&loop=true&muted=true&preload=true&responsive=true&controls=false&background=1" },
];

export function FilmProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoOpacity, setVideoOpacity] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );
      projectRefs.current.forEach((project, index) => {
        if (project) {
          ScrollTrigger.create({
            trigger: project,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    setVideoOpacity(prev => ({ ...prev, [activeIndex]: 0 }));
    if (videoContainerRef.current) {
      const t = setTimeout(() => setVideoOpacity(prev => ({ ...prev, [activeIndex]: 1 })), 400);
      return () => clearTimeout(t);
    }
  }, [activeIndex]);

  return (
    <section id="projects" ref={sectionRef} className="relative bg-black">

      {/* ===== TEIL 1: Vertikale Videos ===== */}
      <div className="py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl mb-12 md:mb-20">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-7xl tracking-wider text-center"
            style={{ color: 'var(--gold)' }}
          >
            FILMPROJEKTE
          </h2>
        </div>

        <div className="container mx-auto max-w-7xl">

          {/* DESKTOP */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
            <div className="lg:sticky lg:top-24 flex justify-center">
              <div className="relative overflow-hidden w-full"
                style={{ borderRadius: '16px', backgroundColor: '#000', maxWidth: '350px', aspectRatio: '9 / 16' }}>
                <div ref={videoContainerRef} className="w-full h-full relative" style={{ backgroundColor: '#000' }}>
                  <iframe
                    key={activeIndex}
                    ref={iframeRef}
                    src={projects[activeIndex].video}
                    style={{
                      position: 'absolute', top: 0, left: 0,
                      width: '100%', height: '100%',
                      border: 'none', pointerEvents: 'none', backgroundColor: '#000',
                      opacity: videoOpacity[activeIndex] !== undefined ? videoOpacity[activeIndex] : 0,
                      transition: 'opacity 0.8s ease-in-out',
                    }}
                    allow="autoplay" allowFullScreen={false} tabIndex={-1}
                  />
                </div>
                <div className="absolute inset-0 pointer-events-none z-10" />
                <div className="absolute top-6 left-6 z-20">
                  <div className="px-4 py-2 rounded-full text-xs tracking-widest backdrop-blur-md"
                    style={{ background: 'rgba(15,15,15,0.7)', border: '1px solid rgba(183,148,92,0.3)', color: 'var(--gold)' }}>
                    {projects[activeIndex].category}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-48">
              {projects.map((project, index) => (
                <div key={project.id} ref={(el) => (projectRefs.current[index] = el)}
                  className="min-h-[70vh] flex flex-col justify-center">
                  <div className={`transition-all duration-700 ${activeIndex === index ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-8'}`}>
                    <span className="text-xs tracking-[0.3em] uppercase mb-6 block" style={{ color: 'var(--gold)' }}>{project.category}</span>
                    <h3 className="text-5xl lg:text-6xl mb-8 leading-tight"
                      style={{ color: activeIndex === index ? 'white' : 'rgba(255,255,255,0.5)' }}>{project.title}</h3>
                    <p className="text-lg leading-relaxed mb-10 max-w-xl"
                      style={{ color: activeIndex === index ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)' }}>{project.description}</p>
                    <button
  onClick={() => window.open('https://calendly.com/maximilian-cumbal/30min', '_blank')}
  className="px-8 py-4 rounded-full border transition-all duration-300 hover:scale-105 cursor-pointer"
  style={{ borderColor: 'var(--gold)', color: 'var(--gold)', background: activeIndex === index ? 'rgba(183,148,92,0.1)' : 'transparent' }}
>
  <span className="tracking-wider text-sm uppercase">LETS TALK!</span>
</button>
                    <div className="mt-12 h-[1px] transition-all duration-700"
                      style={{ background: activeIndex === index ? 'var(--gold)' : 'rgba(183,148,92,0.2)', width: activeIndex === index ? '200px' : '100px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MOBIL */}
          <div className="lg:hidden space-y-16">
            {projects.map((project) => (
              <div key={project.id} className="flex flex-col items-center">
                <div className="relative overflow-hidden mb-6"
                  style={{ borderRadius: '16px', backgroundColor: '#000', width: '70%', maxWidth: '260px', aspectRatio: '9 / 16' }}>
                  <iframe
                    src={project.video}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', pointerEvents: 'none', backgroundColor: '#000' }}
                    allow="autoplay" allowFullScreen={false} tabIndex={-1}
                  />
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1 rounded-full text-xs tracking-widest backdrop-blur-md"
                      style={{ background: 'rgba(15,15,15,0.7)', border: '1px solid rgba(183,148,92,0.3)', color: 'var(--gold)' }}>
                      {project.category}
                    </div>
                  </div>
                </div>
                <div className="w-full text-center px-2">
                  <span className="text-xs tracking-[0.3em] uppercase mb-3 block" style={{ color: 'var(--gold)' }}>{project.category}</span>
                  <h3 className="text-2xl sm:text-3xl mb-4 leading-tight text-white">{project.title}</h3>
                  <p className="text-sm sm:text-base leading-relaxed mb-6 text-white/70 max-w-sm mx-auto">{project.description}</p>
                  <button
  onClick={() => window.open('https://calendly.com/maximilian-cumbal/30min', '_blank')}
  className="px-6 py-3 rounded-full border text-sm transition-all cursor-pointer"
  style={{ borderColor: 'var(--gold)', color: 'var(--gold)', background: 'rgba(183,148,92,0.1)' }}
>
  <span className="tracking-wider uppercase">LETS TALK!</span>
</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== ÜBERSCHRIFT ===== */}
      <div className="py-16 md:py-24 px-4 text-center bg-black">
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-light tracking-widest text-white leading-tight">
          DEINE VISION. <span style={{ color: 'var(--gold)' }}>UNSER BILD.</span>
        </h2>
        <div className="w-16 md:w-24 h-[1px] mx-auto mt-6" style={{ backgroundColor: 'var(--gold)' }} />
      </div>

      {/* ===== HORIZONTALE VIDEOS ===== */}
      {/* Desktop: jedes Video 100svh */}
      <div className="hidden md:flex md:flex-col md:gap-2">
        {horizontalVideos.map((video) => (
          <div key={video.id} className="relative w-full overflow-hidden" style={{ height: '100svh', marginTop: video.id === 5 ? '32px' : undefined }}>
            <iframe
              src={video.src}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                width: '177.78vh',
                height: '56.25vw',
                minWidth: '100%',
                minHeight: '100%',
                transform: 'translate(-50%, -50%)',
                border: 'none',
                pointerEvents: 'none',
                backgroundColor: '#000',
              }}
              allow="autoplay"
              allowFullScreen={false}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Mobil: Videos mit kleinem Abstand, 16:9 */}
      <div className="md:hidden flex flex-col gap-2">
        {horizontalVideos.map((video) => (
          <div
            key={video.id}
            className="relative w-full bg-black"
            style={{ aspectRatio: '16 / 9', marginTop: video.id === 5 ? '20px' : undefined }}
          >
            <iframe
              src={video.src}
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                pointerEvents: 'none',
                backgroundColor: '#000',
              }}
              allow="autoplay"
              allowFullScreen={false}
            />
          </div>
        ))}
      </div>

    </section>
  );
}