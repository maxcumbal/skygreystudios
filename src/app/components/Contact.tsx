import { useState, type FormEvent, type ChangeEvent } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

type FormData = { name: string; email: string; phone: string; message: string };
const emptyForm: FormData = { name: '', email: '', phone: '', message: '' };

export function Contact() {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState({ name: false, email: false, message: false });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as keyof FormData;
    setFormData((previous) => ({ ...previous, [field]: event.target.value }));
    setStatus('idle');
    if (field === 'name' || field === 'email' || field === 'message') {
      setErrors((previous) => ({ ...previous, [field]: false }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = {
      name: !formData.name.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()),
      message: !formData.message.trim(),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;
    setStatus('sending');
    try {
      const response = await fetch('https://formspree.io/f/mvzwonld', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
      setFormData(emptyForm);
    } catch {
      setStatus('error');
    }
  };

  const inputClass = 'w-full rounded-none border-0 border-b border-white/20 bg-transparent px-0 py-4 text-base text-white placeholder:text-white/30 outline-none transition-colors focus:border-white focus:ring-0';

  return (
    <section id="contact" className="bg-black px-6 pt-24 text-white sm:px-10 sm:pt-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 md:mb-24">
          <h2 className="text-[clamp(4rem,12vw,11rem)] font-semibold uppercase leading-[0.85] tracking-[-0.075em]">LET'S TALK<span className="text-white/35">.</span></h2>
        </div>

        <div className="grid gap-16 pb-28 lg:grid-cols-[minmax(0,1.5fr)_minmax(240px,0.7fr)] lg:gap-24">
          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="text-xs uppercase tracking-[0.18em] text-white/55">Name *</label>
                <input id="contact-name" name="name" autoComplete="name" value={formData.name} onChange={handleChange} placeholder="Dein Name" className={inputClass} aria-invalid={errors.name} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
                {errors.name && <p id="contact-name-error" className="mt-2 text-sm text-red-300">Bitte Namen eingeben.</p>}
              </div>
              <div>
                <label htmlFor="contact-email" className="text-xs uppercase tracking-[0.18em] text-white/55">E-Mail *</label>
                <input id="contact-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} placeholder="deine@email.de" className={inputClass} aria-invalid={errors.email} aria-describedby={errors.email ? 'contact-email-error' : undefined} />
                {errors.email && <p id="contact-email-error" className="mt-2 text-sm text-red-300">Bitte gültige E-Mail eingeben.</p>}
              </div>
            </div>
            <div>
              <label htmlFor="contact-phone" className="text-xs uppercase tracking-[0.18em] text-white/55">Telefon <span className="normal-case tracking-normal">(optional)</span></label>
              <input id="contact-phone" type="tel" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} placeholder="Deine Telefonnummer" className={inputClass} />
            </div>
            <div>
              <label htmlFor="contact-message" className="text-xs uppercase tracking-[0.18em] text-white/55">Dein Projekt *</label>
              <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Erzähl uns von deiner Idee ..." className={`${inputClass} resize-y`} aria-invalid={errors.message} aria-describedby={errors.message ? 'contact-message-error' : undefined} />
              {errors.message && <p id="contact-message-error" className="mt-2 text-sm text-red-300">Bitte Nachricht eingeben.</p>}
            </div>
            <button type="submit" disabled={status === 'sending'} className="group inline-flex cursor-pointer items-center gap-6 border border-white px-7 py-4 text-sm font-medium uppercase tracking-[0.12em] transition-colors hover:bg-white hover:text-black disabled:cursor-wait disabled:opacity-50">
              {status === 'sending' ? 'Wird gesendet ...' : 'Anfrage senden'}
              <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
            </button>
            <div aria-live="polite" role="status" className="text-sm">
              {status === 'success' && <p className="text-white/80">Deine Nachricht wurde gesendet. Vielen Dank!</p>}
              {status === 'error' && <p className="text-red-300">Senden fehlgeschlagen. Bitte versuche es erneut oder schreibe uns direkt per E-Mail.</p>}
            </div>
          </form>

          <aside className="space-y-10 lg:pt-1">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">E-Mail</p>
              <a href="mailto:info@skygreystudios.de" className="inline-flex cursor-pointer items-center gap-2 break-all text-lg text-white transition-opacity hover:opacity-60">info@skygreystudios.de <ArrowUpRight size={17} className="shrink-0" /></a>
            </div>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">Telefon</p>
              <a href="tel:+4917680573342" className="inline-flex cursor-pointer items-center gap-2 text-lg text-white transition-opacity hover:opacity-60">+49 176 805 733 42 <ArrowUpRight size={17} /></a>
            </div>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">Projekt starten</p>
              <p className="max-w-xs text-sm leading-relaxed text-white/60">Du hast eine Idee? Wir freuen uns auf deine Anfrage.</p>
            </div>
          </aside>
        </div>

        <footer className="border-t border-white/15 py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <Link to="/" className="w-fit cursor-pointer text-lg font-bold uppercase tracking-[-0.04em] text-white">SKYGREY<span className="text-white/45">.</span></Link>
            <nav aria-label="Rechtliches" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/55">
              <Link to="/impressum" className="cursor-pointer transition-colors hover:text-white">Impressum</Link>
              <Link to="/datenschutz" className="cursor-pointer transition-colors hover:text-white">Datenschutz</Link>
              <Link to="/agb" className="cursor-pointer transition-colors hover:text-white">AGB</Link>
            </nav>
          </div>
          <div className="mt-8 flex flex-col gap-3 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} SKYGREY Studios</span>
            <a href="https://www.maxmediavision.de" target="_blank" rel="noopener noreferrer" className="w-fit cursor-pointer transition-colors hover:text-white">Webdesign by MAXMEDIA <ArrowRight size={12} className="inline" /></a>
          </div>
        </footer>
      </div>
    </section>
  );
}
