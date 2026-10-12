import { useEffect, useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import { gsap } from 'gsap';
import { useReducedMotion } from 'motion/react';

const videoUrl = 'https://iframe.mediadelivery.net/embed/608059/30de703a-9099-4a77-ab17-9697159c2340?autoplay=true&loop=true&muted=true&preload=true&responsive=true';
const showreelUrl = 'https://iframe.mediadelivery.net/embed/608059/16aa075a-360d-4bf4-a1aa-504b3525955b?autoplay=true&loop=false&muted=false&preload=true&responsive=true';

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showReel, setShowReel] = useState(false);
  const reduceMotion = useReducedMotion();
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
    <section id="hero" className="sky-hero relative min-h-[600px] h-[100svh] overflow-hidden bg-[#101010] text-white">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {!reduceMotion && <iframe src={videoUrl} title="SKYGREY Filmshowreel Hintergrund" tabIndex={-1} loading="eager" allow="autoplay" className="sky-hero-video absolute border-0" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/45" />
      </div>
      <div ref={contentRef} className="relative z-10 h-full flex flex-col justify-end px-6 sm:px-10 lg:px-16 pb-12 lg:pb-16">
        <div className="sky-hero-reveal flex items-center gap-3 mb-7 text-[11px] uppercase tracking-[.28em] font-medium"><span className="h-[1px] w-10 bg-white"/> Independent film & creative studio</div>
        <h1 className="sky-hero-reveal sky-display max-w-[1250px] uppercase font-black tracking-[-.075em] leading-[.82] text-[clamp(3.35rem,12.8vw,13.8rem)]">WE MAKE<br/><span className="sky-outline">IT MATTER.</span></h1>
        <div className="sky-hero-reveal mt-10 flex items-center border-t border-white/25 pt-7">
          <button
            type="button"
            onClick={() => setShowReel(true)}
            className="sky-showreel group inline-flex items-center gap-4 text-white"
            aria-label="Showreel abspielen"
          >
            <span className="sky-showreel-play flex h-14 w-14 items-center justify-center rounded-full border border-white/65 transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-105">
              <Play size={19} fill="currentColor" strokeWidth={1.5} className="ml-0.5" />
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-[.17em] uppercase transition-opacity duration-300 group-hover:opacity-70">Showreel <span className="font-normal text-white/60">/ Play film</span></span>
          </button>
        </div>
      </div>
      <span className="absolute z-10 top-28 right-6 lg:right-16 text-[10px] tracking-[.2em] uppercase text-white/60 [writing-mode:vertical-rl]">STORIES IN MOTION — 2026</span>
    </section>
    {showReel && <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-12" role="dialog" aria-modal="true" aria-label="Showreel">
      <button onClick={() => setShowReel(false)} aria-label="Showreel schließen" className="absolute right-5 top-5 text-white p-3 rounded-full border border-white/30 hover:bg-white/20"><X size={24}/></button>
      <div className="w-full max-w-6xl aspect-video"><iframe src={showreelUrl} title="SKYGREY Showreel" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="w-full h-full border-0" /></div>
    </div>}
  </>;
}
