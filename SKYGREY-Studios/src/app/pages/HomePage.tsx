import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { LogoMarquee } from '../components/LogoMarquee';
import { FilmProjects } from '../components/FilmProjects';
import { Services } from '../components/Services';
import { About } from '../components/About';
import { Team } from '../components/Team';
import { Testimonials } from '../components/Testimonials';
import { Contact } from '../components/Contact';
import { SocialSidebar } from '../components/SocialSidebar';

export function HomePage() {
  useEffect(() => {
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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
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
      <Services />
      <About />
      <Team />
      <Testimonials />
      <Contact />
    </>
  );
}