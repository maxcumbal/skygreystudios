import { Navigation } from '../components/Navigation';
import { SocialSidebar } from '../components/SocialSidebar';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export function Impressum() {
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
            IMPRESSUM
          </h1>

          <div className="prose prose-invert max-w-none space-y-8 text-white/80">
            <section>
              <h2 className="text-3xl text-white mb-4">Angaben gemäß § 5 TMG</h2>
              <p>
                SKYGREY Studios<br />
                Kreuzritterstraße 18<br />
                53227 Bonn<br />
                Deutschland
              </p>
            </section>

            <section>
              <h3 className="text-2xl text-white mb-3">Kontakt</h3>
              <p>
                Telefon: +49 176 805 733 42<br />
                E-Mail: info@skygreystudios.de
              </p>
            </section>

            <section>
              <h3 className="text-2xl text-white mb-3">Umsatzsteuer-ID</h3>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                DE206/5048/3891
              </p>
            </section>

            <section>
              <h3 className="text-2xl text-white mb-3">EU-Streitschlichtung</h3>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                <br />
                <a 
                  href="https://ec.europa.eu/consumers/odr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold hover:underline"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                <br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            <section>
              <h3 className="text-2xl text-white mb-3">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h3>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h3 className="text-2xl text-white mb-3">Haftung für Inhalte</h3>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </section>

            <section>
              <h3 className="text-2xl text-white mb-3">Haftung für Links</h3>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </section>

            <section>
              <h3 className="text-2xl text-white mb-3">Urheberrecht</h3>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
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