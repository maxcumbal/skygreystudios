import { Link } from 'react-router';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { Navigation } from '../components/Navigation';

const videos = [
  { title: 'SHOWREEL', category: 'SKYGREY STUDIOS', id: '5c798a40-4289-440f-a336-4c3e97b650db' },
  { title: 'DOKUMENTARFILM', category: 'STORYTELLING', id: '60abf3f8-0a23-4d09-9ace-380a23f25db8' },
  { title: 'SOCIAL MEDIA', category: 'CONTENT', id: '42b6950c-e73a-4f4b-a968-da6726099d42', portrait: true },
  { title: 'IMAGEFILM', category: 'BRAND', id: '29bfc64d-ba05-4022-ad63-aedabe2eb504' },
  { title: 'EVENTFILM', category: 'EVENT', id: 'ee37bb79-dacb-492c-a161-3deb1d113abd' },
];

function ProjectCard({ video, index, reducedMotion }: {
  video: typeof videos[number]; index: number; reducedMotion: boolean;
}) {
  const [paused, setPaused] = useState(false);

  const featured = index === 0;
  const portrait = 'portrait' in video && video.portrait === true;
  const playerUrl = `https://iframe.mediadelivery.net/embed/608059/${video.id}?autoplay=true&muted=true&loop=true&preload=true&responsive=true&controls=false`;

  // Unmounting the cross-origin iframe reliably stops playback.
  // Clicking again mounts a fresh player, which restarts from the beginning.
  function togglePlayback() {
    setPaused((current) => !current);
  }

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 35 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={featured ? 'md:col-span-2' : ''}
    >
      <div className="group relative aspect-video overflow-hidden bg-black">
        {!paused && (
          <>
            {portrait && (
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-black">
                {/* A second muted player creates a moving, cinematic blur behind portrait footage.
                    It is intentionally non-interactive. */}
                <iframe
                  title={`${video.title} – unscharfer Hintergrund`}
                  src={playerUrl}
                  allow="autoplay; encrypted-media"
                  tabIndex={-1}
                  loading="lazy"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-full w-[31.64%] origin-center -translate-x-1/2 -translate-y-1/2 scale-[4.2] border-0 blur-[18px] brightness-[0.38] saturate-75"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            )}
            <iframe
              title={video.title}
              src={playerUrl}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              tabIndex={-1}
              className={`pointer-events-none absolute top-0 h-full border-0 ${portrait ? 'left-1/2 w-[31.64%] -translate-x-1/2' : 'inset-0 w-full'}`}
            />
          </>
        )}
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={`${video.title}: ${paused ? 'Video erneut starten' : 'Video stoppen'}`}
          aria-pressed={paused}
          className="absolute inset-0 z-10 h-full w-full cursor-pointer bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
        />
      </div>
      <div className="flex items-end justify-between gap-4 pt-5 sm:pt-7">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/45">{String(index + 1).padStart(2, '0')} / {video.category}</p>
          <h2 className={`mt-2 font-semibold uppercase leading-[1.05] tracking-[-0.045em] ${featured ? 'text-[clamp(1.9rem,4.5vw,4.8rem)]' : 'text-[clamp(1.5rem,2.7vw,3rem)]'}`}>{video.title}</h2>
        </div>
        <ArrowUpRight aria-hidden="true" size={24} strokeWidth={1.3} className="mb-1 shrink-0 text-white/35" />
      </div>
    </motion.article>
  );
}

export function WeitereProjekte() {
  const reducedMotion = Boolean(useReducedMotion());
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main className="mx-auto max-w-[1920px] px-6 pb-28 pt-36 sm:px-12 sm:pt-44 lg:px-20">
        <Link to="/" className="inline-flex cursor-pointer items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
          <ArrowLeft size={16} /> ZUR STARTSEITE
        </Link>
        <div className="mb-12 mt-16 flex flex-col justify-between gap-6 sm:mb-16 sm:mt-20 lg:flex-row lg:items-end">
          <div>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.28em] text-white/45">SKYGREY / PORTFOLIO</p>
            <h1 className="text-[clamp(3.7rem,11vw,11rem)] font-black uppercase leading-[0.85] tracking-[-0.075em]">SELECTED<br />WORK<span className="text-white/30">.</span></h1>
          </div>
          <p className="pb-1 text-[11px] font-medium uppercase tracking-[0.24em] text-white/40">01 — 05 / FILMPRODUKTIONEN</p>
        </div>
        <div className="grid grid-cols-1 gap-x-7 gap-y-14 md:grid-cols-2 md:gap-y-20">
          {videos.map((video, index) => <ProjectCard key={video.id} video={video} index={index} reducedMotion={reducedMotion} />)}
        </div>
        <div className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-white/15 pt-9 sm:flex-row sm:items-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">MEHR ENTDECKEN</p>
          <Link to="/immobilienfilme" className="group inline-flex cursor-pointer items-center gap-4 text-lg font-semibold uppercase tracking-[-0.03em] transition-colors hover:text-white/60 sm:text-2xl">
            IMMOBILIENFILME <ArrowUpRight size={24} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </div>
      </main>
    </div>
  );
}
