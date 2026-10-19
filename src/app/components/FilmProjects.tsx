import { useEffect, useRef, useState } from 'react';
import type { MouseEvent, TouchEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const cdnHostname = 'vz-419afa6e-6ca.b-cdn.net';
const propertyVideos: Video[] = [
  { title: 'IMMOBILIENFILM 01', id: '8684715e-10a0-41a9-bf3f-4a86f9b8f6a2' },
  { title: 'IMMOBILIENFILM 07', id: '767b934d-abc8-45be-86af-cce43b964d34' },
  { title: 'IMMOBILIENFILM 02', id: '0271194a-0c8b-46bf-8c34-9a8a74bd2bd1' },
  { title: 'IMMOBILIENFILM 03', id: '270bbb52-c93c-4858-9b78-a48e375a380a' },
  { title: 'IMMOBILIENFILM 04', id: '5ad12704-505d-432c-ba90-f2f4a971a069' },
  { title: 'IMMOBILIENFILM 05', id: 'cb5004fe-d2ce-4faf-a4aa-633d2768e05f' },
  { title: 'IMMOBILIENFILM 06', id: '61475db4-98b1-4d46-9e55-f66937d687b2' },
];

const groups = [
  { title: 'SOCIAL MEDIA', videos: [
    { title: 'Social Media 01', id: '5c798a40-4289-440f-a336-4c3e97b650db' },
    { title: 'Social Media 02', id: '29bfc64d-ba05-4022-ad63-aedabe2eb504' },
  ] },
  { title: 'EVENTS', videos: [
    { title: 'Event 01', id: '545ed20a-11e3-44f3-85d9-bc005969fa66' },
    { title: 'Event 02', id: 'ee37bb79-dacb-492c-a161-3deb1d113abd' },
  ] },
  { title: 'BEHIND THE SCENES', videos: [
    { title: 'Behind the Scenes 01', id: '60abf3f8-0a23-4d09-9ace-380a23f25db8' },
    { title: 'Behind the Scenes 02', id: '2531e4ad-e225-4d13-bac5-acb860ca4bee' },
  ] },
];

const landscapeVideos: Video[] = [
  { title: 'Weitere Projekte 01', id: 'acf90f1c-5826-44b8-9f7a-a7d3d025687d' },
  { title: 'Weitere Projekte 02', id: '1e5a10c8-f7eb-4b70-88d5-50d4eed0374d' },
  { title: 'Weitere Projekte 03', id: 'd55028e6-dff8-4db7-a1ec-80cb237770a6' },
  { title: 'Weitere Projekte 04', id: '26391f32-e8be-4713-8882-8a8ce262f635' },
];

type Video = { title: string; id: string; portrait?: boolean };
function DragSlider({ videos, format = "portrait" }: { videos: Video[]; format?: "portrait" | "landscape" }) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, x: 0, scroll: 0, moved: false });
  const frame = useRef<number | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settling = useRef(false);
  const [position, setPosition] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // One subtle, text-free swipe cue per browsing session, on the first gallery reached.
  useEffect(() => {
    const node = track.current;
    if (!node || typeof window === 'undefined' || !window.matchMedia('(max-width: 639px)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      try {
        if (window.sessionStorage.getItem('skygrey-swipe-hint-shown')) return;
        window.sessionStorage.setItem('skygrey-swipe-hint-shown', '1');
      } catch { /* Hint still works if browser storage is unavailable. */ }
      hintTimer.current = setTimeout(() => {
        setShowSwipeHint(true);
        hintTimer.current = setTimeout(() => setShowSwipeHint(false), 1300);
      }, 550);
    }, { threshold: 0.45 });
    observer.observe(node);
    return () => { observer.disconnect(); if (hintTimer.current) clearTimeout(hintTimer.current); };
  }, []);
  // Three identical sets make the gallery circular, including categories with one film.
  const items = [...videos, ...videos, ...videos];
  const measure = () => {
    const node = track.current;
    if (!node) return 0;
    const first = node.children[0] as HTMLElement | undefined;
    const repeated = node.children[videos.length] as HTMLElement | undefined;
    return first && repeated ? repeated.offsetLeft - first.offsetLeft : node.scrollWidth / 3;
  };
  useEffect(() => {
    const node = track.current;
    if (!node) return;
    const center = () => {
      const first = node.children[videos.length] as HTMLElement | undefined;
      node.scrollLeft = first ? first.offsetLeft + first.offsetWidth / 2 - node.clientWidth / 2 : 0;
      updatePosition();
    };
    center();
    const observer = new ResizeObserver(center);
    observer.observe(node);
    return () => { observer.disconnect(); if (frame.current !== null) cancelAnimationFrame(frame.current); if (settleTimer.current) clearTimeout(settleTimer.current); };
  }, [videos]);
  const updatePosition = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (track.current) {
        const node = track.current;
        const center = node.scrollLeft + node.clientWidth / 2;
        setPosition(center);
        let nearest = 0;
        let smallestDistance = Infinity;
        Array.from(node.children).forEach((child, i) => {
          const item = child as HTMLElement;
          const distance = Math.abs(item.offsetLeft + item.offsetWidth / 2 - center);
          if (distance < smallestDistance) { smallestDistance = distance; nearest = i; }
        });
        setActiveIndex(nearest % videos.length);
      }
    });
  };
  const wrapScroll = () => {
    const node = track.current;
    if (!node) return;
    const span = measure();
    if (!span) return;
    if (node.scrollLeft < span * .5) node.scrollLeft += span;
    else if (node.scrollLeft > span * 1.5) node.scrollLeft -= span;
    updatePosition();
  };
  const snapToClosest = () => {
    const node = track.current;
    if (!node || drag.current.active) return;
    const center = node.scrollLeft + node.clientWidth / 2;
    let closest: HTMLElement | null = null;
    let smallest = Infinity;
    for (const child of Array.from(node.children) as HTMLElement[]) {
      const distance = Math.abs(child.offsetLeft + child.offsetWidth / 2 - center);
      if (distance < smallest) { smallest = distance; closest = child; }
    }
    if (!closest) return;
    settling.current = true;
    node.scrollTo({ left: closest.offsetLeft + closest.offsetWidth / 2 - node.clientWidth / 2, behavior: 'smooth' });
    // Scroll events fired by the snap animation must not start another snap.
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => { settling.current = false; wrapScroll(); }, 650);
  };
  const scheduleSnap = () => {
    if (drag.current.active || settling.current) return;
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(snapToClosest, 130);
  };
  const onDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0 || !track.current) return;
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settling.current = false;
    drag.current = { active: true, x: event.clientX, scroll: track.current.scrollLeft, moved: false };
    event.preventDefault();
  };
  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!drag.current.active || !track.current) return;
    const distance = event.clientX - drag.current.x;
    if (Math.abs(distance) > 4) drag.current.moved = true;
    track.current.scrollLeft = drag.current.scroll - distance;
    wrapScroll();
    drag.current.scroll = track.current.scrollLeft + distance;
  };
  const stop = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    snapToClosest();
  };
  const onTouchStart = (_event: TouchEvent<HTMLDivElement>) => {
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settling.current = false;
  };
  return <div className={`relative mx-auto w-full max-w-none overflow-hidden ${showSwipeHint ? "skygrey-swipe-hint" : ""}`}>
    <div ref={track} onMouseDown={onDown} onMouseMove={onMove} onMouseUp={stop} onMouseLeave={stop} onTouchStart={onTouchStart} onTouchEnd={scheduleSnap} onScroll={() => { wrapScroll(); scheduleSnap(); }}
      style={{ perspective: '1100px', perspectiveOrigin: '50% 45%', overscrollBehaviorX: 'contain' }}
      className="flex cursor-grab select-none items-center gap-5 sm:gap-[clamp(100px,15vw,300px)] overflow-x-auto px-[calc(50%-34vw)] pb-6 active:cursor-grabbing sm:px-[calc(50%-17vw)] lg:px-[calc(50%-160px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Magnetisches Endlos-Videokarussell – ziehen oder wischen, Videos rasten mittig ein">
      {items.map((video, i) => {
        const node = track.current?.children[i] as HTMLElement | undefined;
        const step = node && track.current ? node.offsetWidth + parseFloat(getComputedStyle(track.current).columnGap || "0") : 1;
        const delta = node ? (node.offsetLeft + node.offsetWidth / 2 - position) / Math.max(step, 1) : 0;
        const angle = Math.max(-20, Math.min(20, -delta * 20));
        const depth = Math.min(Math.abs(delta), 1.5);
        const isCenter = Math.abs(delta) < 0.5;
        const inView = Math.abs(delta) < 1.5;
        return <div key={`${video.id}-${i}`} aria-hidden={i < videos.length || i >= videos.length * 2}
          className={format === "portrait" ? "w-[68vw] max-w-[320px] shrink-0 sm:w-[34vw] lg:w-[320px]" : "w-[84vw] max-w-[880px] shrink-0 sm:w-[65vw] lg:w-[52vw]"}
          style={{ opacity: inView ? 1 : 0, pointerEvents: inView ? "auto" : "none", transform: `rotateY(${angle}deg) translateZ(${-depth * 30}px)`, transformStyle: 'preserve-3d', transition: drag.current.active ? 'none' : 'transform 220ms ease-out', willChange: 'transform' }}><VideoCard video={video} format={format} shouldLoad={isCenter && inView} /></div>;
      })}
    </div>
    {format === "landscape" && videos.length > 1 && (
      <div className="mt-2 flex items-center justify-center gap-2.5 sm:hidden" aria-label={`Video ${activeIndex + 1} von ${videos.length}`}>
        {videos.map((video, index) => (
          <span
            key={video.id}
            aria-hidden="true"
            className={`block h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/35'}`}
          />
        ))}
      </div>
    )}
  </div>;
}

/** Lightweight native player: no iframe UI, and poster remains until the first decoded frame. */
function VideoCard({ video, format, shouldLoad }: { video: Video; format: "portrait" | "landscape"; shouldLoad: boolean }) {
  const element = useRef<HTMLVideoElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [playingFrame, setPlayingFrame] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduceMotion = Boolean(useReducedMotion());
  const videoBase = `https://${cdnHostname}/${video.id}`;
  const poster = `${videoBase}/thumbnail.jpg`;
  // Play only the centered card while its section is visible; neighboring cards display thumbnails.
  useEffect(() => {
    const node = container.current;
    if (!node || reduceMotion) return;
    const observer = new IntersectionObserver(([entry]) => setNearViewport(entry.isIntersecting), { rootMargin: '650px 0px', threshold: 0.01 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);
  const enabled = shouldLoad && nearViewport && !reduceMotion;
  useEffect(() => {
    if (!enabled) { setPlayingFrame(false); setFailed(false); }
  }, [enabled, video.id]);
  useEffect(() => {
    const player = element.current;
    if (!player) return;
    if (enabled) {
      const result = player.play();
      if (result) result.catch(() => { /* Autoplay may be restricted by browser preferences. */ });
    } else {
      player.pause();
    }
  }, [enabled]);
  return <article className="block w-full min-w-0 max-w-full overflow-hidden">
    <div ref={container} className={`relative block w-full max-w-full overflow-hidden border-0 bg-black ${format === "portrait" ? "aspect-[9/16]" : "aspect-video"}`}>
      <img src={poster} alt="" loading="lazy" draggable={false} className={`pointer-events-none absolute inset-0 block h-full w-full ${format === "landscape" ? "object-cover scale-[1.005]" : "object-cover"}`} />
      {enabled && !failed && <video
        ref={element} src={`${videoBase}/play_720p.mp4`} poster={poster}
        autoPlay muted loop playsInline preload="auto" controls={false} disablePictureInPicture
        onPlaying={() => setPlayingFrame(true)} onError={() => setFailed(true)}
        className={`pointer-events-none absolute inset-0 block h-full w-full border-0 transition-opacity duration-200 ${format === "landscape" ? "object-cover scale-[1.005]" : "object-cover"} ${playingFrame ? 'opacity-100' : 'opacity-0'}`}
        aria-label={video.title} />}
    </div>
  </article>;
}


/** Full-width 16:9 films in a vertical gallery; only a visible film plays. */
function LandscapeFilm({ video }: { video: Video }) {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.intersectionRatio >= 0.45);
    }, { threshold: [0, 0.25, 0.45, 0.6, 1] });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={container} className="relative block w-full min-w-0 max-w-full overflow-hidden">
    <VideoCard video={video} format="landscape" shouldLoad={visible} />
  </div>;
}

export function FilmProjects() {
  const reduceMotion = Boolean(useReducedMotion());
  return <section id="projects" aria-label="Immobilienfilme und Projekte" className="scroll-mt-20 bg-black px-5 py-16 text-white sm:px-12 lg:px-20 md:py-36">
    <div className="mx-auto max-w-[1700px]">
      <div id="immobilienvideos" className="mb-16 scroll-mt-24 sm:mb-36">
        <h3 className="mb-6 text-[clamp(2rem,6vw,6rem)] font-black uppercase leading-[.95] tracking-[-.06em]">IMMOBILIENFILME<span className="text-white/30">.</span></h3>
        <DragSlider videos={propertyVideos} format="portrait" />
      </div>
      <div className="space-y-16 sm:space-y-36">
        {groups.map((group) => <motion.div key={group.title} initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: .6 }}>
          <div className="mb-8 flex flex-col justify-between gap-4 border-t border-white/20 pt-6 sm:mb-10 sm:flex-row sm:items-end">
            <div><h4 className="max-w-4xl text-[clamp(1.55rem,4.5vw,4.5rem)] font-bold uppercase leading-[1.02] tracking-[-.055em]">{group.title}</h4></div>
          </div>
          <DragSlider videos={group.videos} format="portrait" />
        </motion.div>)}

      </div>
      <div id="weitere-projekte" className="mt-20 w-full min-w-0 max-w-full scroll-mt-28 overflow-hidden border-t border-white/20 pt-10 sm:mt-36">
        <h3 className="mb-8 text-[clamp(2rem,6vw,6rem)] font-black uppercase leading-[.95] tracking-[-.06em]">WEITERE PROJEKTE<span className="text-white/30">.</span></h3>
        <div className="flex w-full min-w-0 flex-col gap-8 sm:gap-16 lg:gap-24">
          {landscapeVideos.map((video) => <LandscapeFilm key={video.id} video={video} />)}
        </div>
      </div>
    </div>
  </section>;
}
