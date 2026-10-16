import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

const links = [
  { id: 'immobilienvideos', label: 'Immobilienvideos' },
  { id: 'weitere-projekte', label: 'Projekte' },
  { id: 'contact', label: 'Kontakt' },
];
export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow; document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = old; window.removeEventListener('keydown', onKey); };
  }, [open]);
  const go = (id: string) => {
    setOpen(false);
    if (id.startsWith('/')) { navigate(id); return; }
    const scrollToSection = () => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    if (location.pathname !== '/') { navigate('/'); setTimeout(scrollToSection, 180); }
    else scrollToSection();
  };
  return <>
    <header className={`sky-nav fixed top-0 inset-x-0 z-[60] text-white transition-colors duration-500 ${scrolled || open ? 'bg-[#101010]/95 backdrop-blur-xl' : 'bg-transparent'}`}>
      <nav className="h-[68px] sm:h-[84px] px-5 sm:px-10 lg:px-16 flex items-center justify-between gap-5" aria-label="Hauptnavigation">
        <button onClick={() => go('hero')} aria-label="SKYGREY Studios – Startseite" className="relative z-[70] flex items-center"><img src="/images/skygreylogo.png" alt="SKYGREY Studios" className="h-7 sm:h-9 w-auto object-contain" /></button>
        <div className="hidden lg:flex items-center gap-9">{links.slice(0,3).map(item => <button key={item.id} onClick={() => go(item.id)} className="sky-nav-link text-xs font-semibold uppercase tracking-[.18em]">{item.label}</button>)}</div>
        <div className="flex items-center gap-3">
          <button onClick={() => go('contact')} className="hidden sm:flex sky-nav-contact items-center gap-3 rounded-full border border-white/50 px-5 py-3 text-xs font-bold uppercase tracking-[.12em] hover:bg-white hover:text-black transition-colors">PROJEKT ANFRAGEN <ArrowUpRight size={16}/></button>
          <button onClick={() => setOpen(v => !v)} aria-expanded={open} aria-controls="sky-full-menu" aria-label={open ? 'Menü schließen' : 'Menü öffnen'} className="relative z-[70] rounded-full border border-white/40 h-11 w-11 flex items-center justify-center hover:bg-white hover:text-black transition-colors">{open ? <X size={23}/> : <Menu size={23}/>}</button>
        </div>
      </nav>
    </header>
    <div id="sky-full-menu" aria-hidden={!open} className={`sky-menu fixed inset-0 z-[55] bg-[#111] text-white transition-all duration-500 ${open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      <div className="h-full flex flex-col justify-center overflow-y-auto px-5 sm:px-16 lg:px-24 pt-24 pb-10">
        <span className="text-xs uppercase tracking-[.3em] text-white/50 mb-8">Explore SKYGREY</span>
        {links.map((item, i) => <button key={item.id} tabIndex={open ? 0 : -1} onClick={() => go(item.id)} className="group w-full break-words text-left uppercase font-black tracking-[-.06em] leading-[1.1] text-[clamp(1.85rem,7vw,7rem)] hover:text-white/45 transition-colors"><span className="inline-block align-top text-xs tracking-normal font-medium text-white/50 mr-3 sm:mr-5 mt-2 sm:mt-4">0{i+1}</span>{item.label}<ArrowUpRight className="inline-block ml-4 opacity-0 group-hover:opacity-100 transition-opacity" size={30}/></button>)}
        <p className="mt-12 text-white/40 text-sm">Independent film & creative studio</p>
      </div>
    </div>
  </>;
}
