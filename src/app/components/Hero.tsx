import { useEffect, useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import { gsap } from 'gsap';
import { useReducedMotion } from 'motion/react';

const heroVideoBase = 'https://vz-419afa6e-6ca.b-cdn.net/30de703a-9099-4a77-ab17-9697159c2340';
const showreelUrl = 'https://iframe.mediadelivery.net/embed/608059/16aa075a-360d-4bf4-a1aa-504b3525955b?autoplay=true&loop=false&muted=false&preload=true&responsive=true';

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showReel, setShowReel] = useState(false);
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [backgroundFailed, setBackgroundFailed] = useState(false);
  const backgroundRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (reduceMotion || backgroundFailed) return;
    const video = backgroundRef.current;
    if (!video) return;
    const promise = video.play();
    if (promise) promise.catch(() => { /* Keep the poster visible when autoplay is blocked. */ });
  }, [reduceMotion, backgroundFailed]);
  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.sky-hero-reveal', { y: 65, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: 0.14, ease: 'power3.out', clearProps: 'transform' });
    }, contentRef);
    return () => ctx.revert();
  }, [reduceMotion]);
  useEffect(() => {
    if (!showReel) return;
    const previous = document.body.style.overflow;
    const previousHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.dispatchEvent(new Event('sky:lock-scroll'));
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setShowReel(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.documentElement.style.overflow = previousHtml;
      window.dispatchEvent(new Event('sky:unlock-scroll'));
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [showReel]);
  return <>
    <section id="hero" className="sky-hero relative min-h-[520px] h-[100svh] overflow-hidden bg-[#101010] text-white">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img src={`${heroVideoBase}/thumbnail.jpg`} alt="" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover" />
        {!reduceMotion && !backgroundFailed && <video
          ref={backgroundRef}
          src={`${heroVideoBase}/play_720p.mp4`}
          poster={`${heroVideoBase}/thumbnail.jpg`}
          autoPlay muted loop playsInline preload="auto"
          controls={false} disablePictureInPicture disableRemotePlayback
          aria-hidden="true" tabIndex={-1}
          onPlaying={() => setBackgroundReady(true)}
          onError={() => { setBackgroundFailed(true); setBackgroundReady(false); }}
          className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${backgroundReady ? 'opacity-100' : 'opacity-0'}`}
        />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/45" />
      </div>
      <div ref={contentRef} className="relative z-10 h-full flex flex-col justify-end px-5 sm:px-10 lg:px-16 pb-16 sm:pb-12 lg:pb-16">
        <h1 className="sky-hero-reveal sky-display max-w-[1450px] uppercase font-black tracking-[-.075em] leading-[.82] text-[clamp(2.55rem,11.7vw,13.8rem)]">
          <span className="block">WE MAKE</span>
          <span className="flex items-center gap-2.5 sm:gap-7 lg:gap-10">
            <span className="sky-outline whitespace-nowrap">IT MATTER.</span>
            <button
              type="button"
              onClick={() => setShowReel(true)}
              aria-label="Showreel abspielen"
              title="Showreel abspielen"
              className="group flex shrink-0 items-center justify-center w-[clamp(2.5rem,7vw,7.5rem)] h-[clamp(2.5rem,7vw,7.5rem)] rounded-full border border-white/65 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Play className="ml-[5%] w-[30%] h-[30%]" fill="currentColor" strokeWidth={1.4} />
            </button>
          </span>
        </h1>
      </div>
      <span className="absolute z-10 hidden sm:block top-28 right-6 lg:right-16 text-[10px] tracking-[.2em] uppercase text-white/60 [writing-mode:vertical-rl]">STORIES IN MOTION — 2026</span>
    </section>
    {showReel && <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-3 sm:p-12" role="dialog" aria-modal="true" aria-label="Showreel">
      <button onClick={() => setShowReel(false)} aria-label="Showreel schließen" className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-10 text-white p-3 rounded-full border border-white/30 hover:bg-white/20"><X size={24}/></button>
      <div className="w-full max-w-6xl aspect-video"><iframe src={showreelUrl} title="SKYGREY Showreel" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="w-full h-full border-0" /></div>
    </div>}
  </>;
}
