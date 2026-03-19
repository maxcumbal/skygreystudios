import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [buttonText, setButtonText] = useState('SHOWREEL ANSEHEN');

  const scramble = useCallback(() => {
    const original = 'SHOWREEL ANSEHEN';
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setButtonText(
        original.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iteration) return original[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      iteration += 0.5;
      if (iteration >= original.length) {
        clearInterval(intervalRef.current!);
        setButtonText(original);
      }
    }, 35);
  }, []);

  const stopScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setButtonText('SHOWREEL ANSEHEN');
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline von unten
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out', delay: 0.3 }
      );
      // Subline
      gsap.fromTo(sublineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.8 }
      );
      // Button
      gsap.fromTo(buttonRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.1 }
      );
      // Arrow
      gsap.fromTo(arrowRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.5 }
      );
      gsap.to(arrowRef.current, {
        y: 6, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2,
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [showModal]);

  useEffect(() => {
    const timer = setTimeout(() => setBgLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="hero" className="relative h-screen w-full overflow-hidden bg-black">
        

        {/* Hintergrund Video */}
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-1000"
          style={{ opacity: bgLoaded ? 1 : 0, zIndex: 0 }}
        >
          <iframe
            src="https://iframe.mediadelivery.net/embed/608059/075b5937-0526-4080-8246-28042e0b669e?autoplay=true&loop=true&muted=true&preload=true&responsive=true&controls=false&background=1"
            style={{
              border: 'none', pointerEvents: 'none', position: 'absolute',
              top: '50%', left: '50%',
              width: '177.78vh', height: '56.25vw',
              minWidth: '100%', minHeight: '100%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#000',
            }}
            allow="autoplay" allowFullScreen={false} loading="eager" title="Background Video"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.15) 100%)' }} />
        </div>

        {/* Content — zentriert */}
        <div className="relative flex flex-col items-center justify-center h-full px-4 text-center gap-5" style={{ zIndex: 10 }}>

          {/* Großer Headline Text */}
          <div ref={headlineRef}>
            <h1 style={{ margin: 0 }}>
              <span style={{
                display: 'block',
                fontSize: 'clamp(36px, 8.5vw, 120px)',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                color: 'white',
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
              }}>
                DEINE VISION.
              </span>
              <span style={{
                display: 'block',
                fontSize: 'clamp(34px, 8vw, 110px)',
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'white',
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                fontStyle: 'italic',
              }}>
                Unser Bild.
              </span>
            </h1>
          </div>

          {/* Showreel Button */}
          <div ref={buttonRef} style={{ marginTop: '8px' }}>
            <button
              onClick={() => setShowModal(true)}
              onMouseEnter={() => { setIsHovered(true); scramble(); }}
              onMouseLeave={() => { setIsHovered(false); stopScramble(); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
              }}
            >
              {/* Play Kreis */}
              <div style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                border: `1px solid ${isHovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.4s ease',
                background: isHovered ? 'rgba(255,255,255,0.07)' : 'transparent',
                flexShrink: 0,
              }}>
                <svg width="11" height="13" viewBox="0 0 12 14" fill="none" style={{ marginLeft: 2 }}>
                  <path
                    d="M1 1L11 7L1 13V1Z"
                    fill={isHovered ? 'white' : 'rgba(255,255,255,0.55)'}
                    stroke={isHovered ? 'white' : 'rgba(255,255,255,0.55)'}
                    strokeWidth="0.5"
                    style={{ transition: 'all 0.4s ease' }}
                  />
                </svg>
              </div>

              {/* Text + Underline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span style={{
                  color: isHovered ? 'white' : 'rgba(255,255,255,0.55)',
                  fontSize: 11,
                  letterSpacing: '0.38em',
                  fontFamily: 'monospace',
                  fontWeight: 400,
                  transition: 'color 0.3s ease',
                  whiteSpace: 'nowrap',
                }}>
                  {buttonText}
                </span>
                <div style={{
                  height: '1px',
                  background: 'rgba(255,255,255,0.3)',
                  width: isHovered ? '100%' : '0%',
                  transition: 'width 0.4s ease',
                }} />
              </div>
            </button>
          </div>

        </div>

        {/* Logo unten mittig statt Pfeil */}
<div
  ref={arrowRef}
  onClick={scrollToProjects}
  className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
  style={{ zIndex: 10 }}
>
  <img
    src="/images/sklogorund.png"
    alt="Logo"
    style={{
      width: 56,
      height: 56,
      objectFit: 'contain',
      opacity: 0.5,
      transition: 'opacity 0.3s ease',
    }}
    onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
    onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
  />
</div>

      </section>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 px-4"
          onWheel={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
        >
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
          >
            <X size={24} className="text-white" />
          </button>
          <div style={{
            position: 'relative', width: '95vw', maxWidth: '1000px',
            aspectRatio: '16 / 9', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden',
          }}>
            <iframe
              src="https://iframe.mediadelivery.net/embed/608059/d958a07a-1fe3-48b5-8762-ed955d836878?autoplay=true&loop=false&muted=false&preload=true&responsive=true"
              style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#000' }}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}