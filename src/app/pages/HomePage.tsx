import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { LogoMarquee } from '../components/LogoMarquee';
import { FilmProjects } from '../components/FilmProjects';
import { About } from '../components/About';
import { Team } from '../components/Team';
import { Testimonials } from '../components/Testimonials';
import { Contact } from '../components/Contact';
import { SocialSidebar } from '../components/SocialSidebar';

export function HomePage() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);
    const lockScroll = () => lenis.stop();
    const unlockScroll = () => lenis.start();
    window.addEventListener('sky:lock-scroll', lockScroll);
    window.addEventListener('sky:unlock-scroll', unlockScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('sky:lock-scroll', lockScroll);
      window.removeEventListener('sky:unlock-scroll', unlockScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Navigation />
      <SocialSidebar />
      <Hero />
      <LogoMarquee />
      <FilmProjects />
      <About />
      <Team />
      <Testimonials />
      <Contact />
    </>
  );
}