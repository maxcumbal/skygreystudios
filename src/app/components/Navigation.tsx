import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Filmprojekte' },
  { id: 'services', label: 'Leistungen' },
  { id: 'about', label: 'Über mich' },
  { id: 'team', label: 'Team' },
  { id: 'testimonials', label: 'Kundenstimmen' },
  { id: 'contact', label: 'Kontakt' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-3' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => scrollToSection('hero')} className="flex items-center">
            <img
              src="/images/skygreylogo.png"
              alt="SKYGREY Studios"
              style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`uppercase tracking-wider text-sm transition-colors ${activeSection === item.id ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                style={{ color: activeSection === item.id ? 'var(--gold)' : 'white' }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile: 2 Striche */}
          <button
            className="md:hidden flex flex-col justify-center gap-[6px] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menü"
          >
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                backgroundColor: 'white',
                transition: 'all 0.3s ease',
                transform: isMobileMenuOpen ? 'translateY(3.75px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                backgroundColor: 'white',
                transition: 'all 0.3s ease',
                transform: isMobileMenuOpen ? 'translateY(-3.75px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-transform duration-400 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-2xl uppercase tracking-wider transition-colors"
              style={{ color: activeSection === item.id ? 'var(--gold)' : 'white' }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}