import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Link } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.fromTo(formRef.current, { opacity: 0, x: -50 }, {
        opacity: 1, x: 0, duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      gsap.fromTo(infoRef.current, { opacity: 0, x: 50 }, {
        opacity: 1, x: 0, duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validierung der Pflichtfelder
    const newErrors = {
      name: formData.name.trim() === '',
      email: formData.email.trim() === '',
      message: formData.message.trim() === '',
    };

    setErrors(newErrors);

    // Wenn Fehler vorhanden sind, nicht absenden
    if (newErrors.name || newErrors.email || newErrors.message) {
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/mvzwonld', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({ name: false, email: false, message: false });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Fehler entfernen, sobald der Nutzer etwas eingibt
    if (name === 'name' || name === 'email' || name === 'message') {
      setErrors({ ...errors, [name]: false });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen py-20 px-4 md:px-6"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="container mx-auto max-w-7xl">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-7xl tracking-wider mb-12 md:mb-20 text-center"
          style={{ color: 'var(--gold)' }}
        >
          KONTAKT
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Formular */}
          <div ref={formRef}>
            <h3 className="text-2xl md:text-3xl text-white mb-8">Lassen Sie uns sprechen</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white/70 mb-2 text-sm md:text-base">Name *</label>
                <input
                  type="text" id="name" name="name"
                  value={formData.name} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border rounded-lg text-white focus:outline-none transition-colors text-sm md:text-base"
                  style={{ borderColor: errors.name ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">Name ist erforderlich</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-white/70 mb-2 text-sm md:text-base">E-Mail *</label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border rounded-lg text-white focus:outline-none transition-colors text-sm md:text-base"
                  style={{ borderColor: errors.email ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">E-Mail ist erforderlich</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-white/70 mb-2 text-sm md:text-base">Telefon</label>
                <input
                  type="tel" id="phone" name="phone"
                  value={formData.phone} onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none transition-colors text-sm md:text-base"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white/70 mb-2 text-sm md:text-base">Nachricht *</label>
                <textarea
                  id="message" name="message"
                  value={formData.message} onChange={handleChange} rows={6}
                  className="w-full px-4 py-3 bg-white/5 border rounded-lg text-white focus:outline-none transition-colors resize-none text-sm md:text-base"
                  style={{ borderColor: errors.message ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">Nachricht ist erforderlich</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-8 py-4 rounded-lg border-2 flex items-center justify-center gap-2 transition-all hover:bg-gold/10 disabled:opacity-50"
                style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
              >
                <span>{status === 'sending' ? 'Wird gesendet...' : 'Nachricht senden'}</span>
                <Send size={20} />
              </button>

              {/* Erfolgsmeldung */}
              {status === 'success' && (
                <div className="p-4 rounded-lg text-center text-sm" style={{ background: 'rgba(183,148,92,0.1)', border: '1px solid rgba(183,148,92,0.3)', color: 'var(--gold)' }}>
                  ✓ Nachricht erfolgreich gesendet! Wir melden uns bald.
                </div>
              )}

              {/* Fehlermeldung */}
              {status === 'error' && (
                <div className="p-4 rounded-lg text-center text-sm bg-red-500/10 border border-red-500/30 text-red-400">
                  ✗ Fehler beim Senden. Bitte versuche es erneut.
                </div>
              )}
            </form>
          </div>

          {/* Kontakt Info */}
          <div ref={infoRef} className="space-y-8 md:space-y-12">
            <div>
              <h3 className="text-2xl md:text-3xl text-white mb-6 md:mb-8">Kontaktinformationen</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(201,169,97,0.1)' }}>
                    <Mail size={20} style={{ color: 'var(--gold)' }} />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm mb-1">E-Mail</p>
                    <p className="text-white text-sm md:text-base">info@skygreystudios.de</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(201,169,97,0.1)' }}>
                    <Phone size={20} style={{ color: 'var(--gold)' }} />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm mb-1">Telefon</p>
                    <p className="text-white text-sm md:text-base">+49 176 805 733 42</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(201,169,97,0.1)' }}>
                    <MapPin size={20} style={{ color: 'var(--gold)' }} />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm mb-1">Adresse</p>
                    <p className="text-white text-sm md:text-base">
                      Kreuzritterstraße 18<br />
                      53227 Bonn, Deutschland
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Geschäftszeiten */}
            <div className="p-6 rounded-lg border border-white/10 bg-white/5">
              <h4 className="text-lg md:text-xl text-white mb-4">Geschäftszeiten</h4>
              <div className="space-y-2 text-white/70 text-sm md:text-base">
                <div className="flex justify-between">
                  <span>Montag - Freitag</span>
                  <span>09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samstag</span>
                  <span>10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sonntag</span>
                  <span>Geschlossen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto max-w-7xl mt-16 md:mt-20 pt-10 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-sm">
          <p>© 2026 SKYGREY Studios. Alle Rechte vorbehalten.</p>
          <div className="flex gap-4 md:gap-6 items-center">
            <Link to="/datenschutz" className="hover:text-gold transition-colors">Datenschutz</Link>
            <Link to="/impressum" className="hover:text-gold transition-colors">Impressum</Link>
            <Link to="/agb" className="hover:text-gold transition-colors">AGB</Link>
          </div>
        </div>
        <div className="mt-6 text-center">
          <a href="https://www.maxmediavision.de" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/40 hover:text-gold transition-colors text-sm group">
            <span>Webdesign by:</span>
            <span className="font-semibold text-white/60 group-hover:text-gold transition-colors">MAXMEDIA</span>
          </a>
        </div>
      </div>
    </section>
  );
}