import { Navigation } from '../components/Navigation';
import { SocialSidebar } from '../components/SocialSidebar';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export function Datenschutz() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <Navigation />
      <SocialSidebar />
      <div className="min-h-screen py-20 px-6" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="container mx-auto max-w-4xl">
          <button
            onClick={handleBackToHome}
            className="inline-flex items-center gap-2 text-white/60 hover:text-gold transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft size={20} />
            Zurück zur Startseite
          </button>

          <h1 className="text-5xl md:text-7xl tracking-wider mb-12" style={{ color: 'var(--gold)' }}>
            DATENSCHUTZ
          </h1>

          <div className="prose prose-invert max-w-none space-y-8 text-white/80">
            <section>
              <h2 className="text-3xl text-white mb-4">Datenschutzerklärung</h2>
              <p>
                Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher
                ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).
              </p>
            </section>

            <section>
              <h3 className="text-2xl text-white mb-3">1. Verantwortlicher</h3>
              <p>
                SKYGREY Studios<br />
                Kreuzritterstraße 18<br />
                53227 Bonn, Deutschland<br />
                E-Mail: info@skygreystudios.de<br />
                Telefon: +49 176 805 733 42
              </p>
            </section>

            <section>
              <h3 className="text-2xl text-white mb-3">2. Erhebung und Speicherung personenbezogener Daten</h3>
              <p>
                Beim Besuch unserer Website werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser
                automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden
                temporär in einem sog. Logfile gespeichert.
              </p>
              <p className="mt-4">
                Folgende Informationen werden dabei ohne Ihr Zutun erfasst und bis zur automatisierten Löschung
                gespeichert:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>IP-Adresse des anfragenden Rechners</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Name und URL der abgerufenen Datei</li>
                <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
                <li>Verwendeter Browser und ggf. das Betriebssystem Ihres Rechners</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl text-white mb-3">3. Kontaktformular</h3>
              <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
                Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
                Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              </p>
            </section>

            <section>
              <h3 className="text-2xl text-white mb-3">4. Cookies</h3>
              <p>
                Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät
                abgelegt werden und die Ihr Browser speichert. Sie dienen dazu, unser Angebot nutzerfreundlicher,
                effektiver und sicherer zu machen.
              </p>
            </section>

            <section>
              <h3 className="text-2xl text-white mb-3">5. Ihre Rechte</h3>
              <p>Sie haben jederzeit das Recht auf:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Auskunft über Ihre bei uns gespeicherten Daten</li>
                <li>Berichtigung unrichtiger personenbezogener Daten</li>
                <li>Löschung Ihrer bei uns gespeicherten Daten</li>
                <li>Einschränkung der Datenverarbeitung</li>
                <li>Datenübertragbarkeit</li>
                <li>Widerspruch gegen die Verarbeitung Ihrer Daten</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl text-white mb-3">6. Kontakt</h3>
              <p>
                Für Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte wenden Sie sich bitte an:<br />
                E-Mail: info@skygreystudios.de
              </p>
            </section>

            <p className="text-white/50 text-sm mt-12">
              Stand: Februar 2026
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="container mx-auto max-w-4xl mt-20 pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-sm">
            <p>© 2026 SKYGREY Studios. Alle Rechte vorbehalten.</p>
            <div className="flex gap-6 items-center">
              <Link to="/datenschutz" className="hover:text-gold transition-colors">Datenschutz</Link>
              <Link to="/impressum" className="hover:text-gold transition-colors">Impressum</Link>
              <Link to="/agb" className="hover:text-gold transition-colors">AGB</Link>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a
              href="https://www.maxmedia.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/40 hover:text-gold transition-colors text-sm group"
            >
              <span>Webdesign by:</span>
              <span className="font-semibold text-white/60 group-hover:text-gold transition-colors">
                MAXMEDIA
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}