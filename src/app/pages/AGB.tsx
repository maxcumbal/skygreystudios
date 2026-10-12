import { Navigation } from '../components/Navigation';
import { SocialSidebar } from '../components/SocialSidebar';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

export function AGB() {
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
            AGB
          </h1>

          <div className="legal-content max-w-3xl space-y-10 border-t border-white/20 pt-12 text-base leading-relaxed text-white/65">
            <section>
              <h2 className="mb-4 text-2xl font-medium tracking-tight text-white md:text-3xl">Allgemeine Geschäftsbedingungen</h2>
              <p>
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge über Video- und
                Filmproduktionen zwischen SKYGREY Studios und dem Auftraggeber.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">1. Geltungsbereich</h3>
              <p>
                Diese AGB gelten für alle Geschäftsbeziehungen zwischen SKYGREY Studios und unseren Kunden.
                Abweichende Bedingungen des Kunden werden nur dann Vertragsbestandteil, wenn wir dem
                ausdrücklich schriftlich zustimmen.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">2. Vertragsabschluss</h3>
              <p>
                Der Vertrag kommt durch Annahme des Angebots durch den Kunden zustande. Dies kann schriftlich,
                per E-Mail oder durch Auftragserteilung erfolgen. Änderungen und Ergänzungen bedürfen der
                Schriftform.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">3. Leistungsumfang</h3>
              <p>
                Der Umfang der zu erbringenden Leistungen ergibt sich aus dem jeweiligen Angebot bzw. der
                Auftragsbestätigung. Zusätzliche Leistungen werden gesondert berechnet.
              </p>
              <p className="mt-4">
                Unsere Leistungen umfassen:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Konzeption und Planung</li>
                <li>Dreharbeiten vor Ort</li>
                <li>Postproduktion (Schnitt, Farbkorrektur, Tonmischung)</li>
                <li>Lieferung des finalen Videos in vereinbarten Formaten</li>
              </ul>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">4. Preise und Zahlungsbedingungen</h3>
              <p>
                Alle Preise verstehen sich in Euro zzgl. der gesetzlichen Mehrwertsteuer. Es gelten die zum
                Zeitpunkt der Auftragserteilung gültigen Preise.
              </p>
              <p className="mt-4">
                Zahlungsbedingungen:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>50% Anzahlung bei Auftragserteilung</li>
                <li>50% bei Abnahme und Lieferung des fertigen Videos</li>
                <li>Zahlungsziel: 14 Tage netto nach Rechnungsstellung</li>
              </ul>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">5. Mitwirkungspflichten des Kunden</h3>
              <p>
                Der Kunde verpflichtet sich, alle für die Durchführung des Auftrags notwendigen Informationen
                und Materialien rechtzeitig zur Verfügung zu stellen. Verzögerungen durch fehlende oder
                verspätete Zulieferungen gehen zu Lasten des Kunden.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">6. Korrekturschleifen</h3>
              <p>
                Im vereinbarten Preis sind bis zu zwei Korrekturschleifen enthalten. Weitere Änderungswünsche
                werden nach Aufwand berechnet.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">7. Urheberrecht und Nutzungsrechte</h3>
              <p>
                Alle Rechte an den erstellten Werken verbleiben bei SKYGREY Studios. Der Kunde erhält ein
                einfaches, zeitlich und räumlich unbegrenztes Nutzungsrecht für den vereinbarten Zweck.
                Eine weitergehende Nutzung bedarf der schriftlichen Vereinbarung.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">8. Haftung</h3>
              <p>
                SKYGREY Studios haftet für Vorsatz und grobe Fahrlässigkeit. Die Haftung für leichte
                Fahrlässigkeit ist ausgeschlossen, es sei denn, es wurden wesentliche Vertragspflichten
                verletzt.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">9. Stornierung</h3>
              <p>
                Bei Stornierung durch den Kunden gelten folgende Regelungen:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Bis 14 Tage vor Drehbeginn: 50% der Auftragssumme</li>
                <li>Bis 7 Tage vor Drehbeginn: 75% der Auftragssumme</li>
                <li>Weniger als 7 Tage vor Drehbeginn: 100% der Auftragssumme</li>
              </ul>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">10. Datenschutz</h3>
              <p>
                Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer Datenschutzerklärung und den
                gesetzlichen Bestimmungen der DSGVO.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">11. Schlussbestimmungen</h3>
              <p>
                Es gilt das Recht der Bundesrepublik Deutschland. Erfüllungsort und Gerichtsstand ist Bonn,
                soweit der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder
                öffentlich-rechtliches Sondervermögen ist.
              </p>
            </section>

            <section>
              <h3 className="mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">12. Salvatorische Klausel</h3>
              <p>
                Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, berührt dies die
                Wirksamkeit der übrigen Bestimmungen nicht.
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