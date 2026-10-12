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
      <div className="min-h-screen bg-black px-6 pt-32 pb-16 text-white md:pt-40">
        <div className="mx-auto max-w-4xl">
          <button
            onClick={handleBackToHome}
            className="mb-12 inline-flex cursor-pointer items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft size={20} />
            Zurück zur Startseite
          </button>

          <h1 className="mb-8 text-5xl font-semibold tracking-[-0.055em] text-white sm:text-7xl md:text-8xl">
            IMPRESSUM
          </h1>

          <div className="legal-content max-w-3xl space-y-10 border-t border-white/20 pt-12 text-base leading-relaxed text-white/65">
            <section>
              <h2 className="mb-4 text-2xl font-medium tracking-tight text-white md:text-3xl">Angaben gemäß § 5 TMG</h2>
              <p>
                SKYGREY Studios<br />
                Kreuzritterstraße 18<br />
                53227 Bonn<br />
                Deutschland
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">Kontakt</h3>
              <p>
                Telefon: +49 176 805 733 42<br />
                E-Mail: info@skygreystudios.de
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">Umsatzsteuer-ID</h3>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                DE206/5048/3891
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">EU-Streitschlichtung</h3>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                <br />
                <a 
                  href="https://ec.europa.eu/consumers/odr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-4 hover:text-white/70"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
                <br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h3>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">Haftung für Inhalte</h3>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">Haftung für Links</h3>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
                verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">Urheberrecht</h3>
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
        <div className="mx-auto mt-24 max-w-4xl border-t border-white/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-5 text-sm text-white/45 md:flex-row">
            <p>© 2026 SKYGREY Studios. Alle Rechte vorbehalten.</p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <Link to="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
              <Link to="/impressum" className="hover:text-white transition-colors">Impressum</Link>
              <Link to="/agb" className="hover:text-white transition-colors">AGB</Link>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a
              href="https://www.maxmedia.de"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm group"
            >
              <span>Webdesign by:</span>
              <span className="font-semibold text-white/60 group-hover:text-white transition-colors">
                MAXMEDIA
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}