import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  CalendarDays,
  Check,
  Clock3,
  ExternalLink,
  GraduationCap,
  Route,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { BranchProvider } from "@/components/branch-experience";
import { BranchPhoneButton } from "@/components/branch-phone-button";
import { ContactSection } from "@/components/contact-section";
import { CourseBrowser } from "@/components/course-browser";
import { FAQ } from "@/components/faq";
import { FacebookFeed } from "@/components/facebook-feed";
import { Footer } from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { MobileCta } from "@/components/mobile-cta";
import { Navigation } from "@/components/navigation";
import { FacebookIcon } from "@/components/social-icons";
import { branches, contact, courseSteps, faqs, news } from "@/data/site";

const reasons = [
  { icon: GraduationCap, number: "2003", title: "Uczymy od 2003 roku", text: "Ponad dwie dekady doświadczenia w szkoleniu kierowców i prowadzeniu kursów zawodowych." },
  { icon: Users, number: "2", title: "Dwa lokalne oddziały", text: "Biura w Nowym Sączu i Bobowej oraz szkolenie dopasowane do miejsca i kategorii." },
  { icon: Route, number: "AM–T", title: "Pełny zakres kategorii", text: "Od motoroweru i samochodu po ciężarówkę, autobus, ciągnik oraz kwalifikacje zawodowe." },
  { icon: ShieldCheck, number: "4,7/5", title: "Ocena potwierdzona w BUR", text: "Wynik oparty na ponad 1800 ocenach usług widocznych w oficjalnym profilu dostawcy." },
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fuks-nowy-sacz.vercel.app";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  name: "Małopolskie Centrum Szkoleń FUKS Krzysztof Groń",
  alternateName: "FUKS Krzysztof Groń",
  url: siteUrl,
  logo: `${siteUrl}/images/brand/logo-fuks.jpg`,
  image: `${siteUrl}/images/fleet/samochody-szkola-jazdy-fuks.jpg`,
  description: "Szkoła jazdy i centrum szkoleń zawodowych w Nowym Sączu i Bobowej.",
  foundingDate: "2003",
  telephone: "+48606647396",
  email: contact.email,
  sameAs: [contact.facebook, contact.bur],
  areaServed: [{ "@type": "City", name: "Nowy Sącz" }, { "@type": "City", name: "Bobowa" }],
  department: Object.values(branches).map((branch) => ({
    "@type": "LocalBusiness",
    name: `FUKS — ${branch.shortLabel}`,
    telephone: branch.phoneHref.replace("tel:", ""),
    email: branch.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      postalCode: branch.postalCode,
      addressLocality: branch.city,
      addressCountry: "PL",
    },
  })),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      <BranchProvider>
      <Navigation />
      <main id="main-content">
        <Hero />
        <CourseBrowser />

        <section className="why-section section" id="dlaczego-fuks" aria-labelledby="why-title">
          <div className="shell">
            <div className="section-heading section-heading--split section-heading--light">
              <div>
                <span className="section-number">02 / DLACZEGO FUKS</span>
                <h2 id="why-title">Pewność zaczyna się<br /><em>przed egzaminem.</em></h2>
              </div>
              <p>Nie uczymy skrótów. Budujemy nawyki, odpowiedzialność i kompetencje, które zostają z kierowcą na lata.</p>
            </div>
            <div className="why-layout">
              <div className="why-image">
                <Image src="/images/brand/lubimy-uczyc-jezdzic.jpg" alt="Hasło FUKS: Lubimy uczyć jeździć" fill sizes="(max-width: 900px) 100vw, 40vw" />
              </div>
              <div className="reasons-grid">
                {reasons.map((reason) => {
                  const Icon = reason.icon;
                  return (
                    <article className="reason-card" key={reason.title}>
                      <div><Icon aria-hidden="true" /><strong>{reason.number}</strong></div>
                      <h3>{reason.title}</h3>
                      <p>{reason.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="route-section section" id="trasa-kursu" aria-labelledby="route-title">
          <div className="shell">
            <div className="section-heading section-heading--split">
              <div>
                <span className="section-number">03 / TRASA KURSU</span>
                <h2 id="route-title">Od decyzji<br /><em>do egzaminu.</em></h2>
              </div>
              <p>Pięć czytelnych kroków. Po wybraniu kategorii otrzymasz dokładną listę formalności dla swojej ścieżki.</p>
            </div>
            <ol className="route-steps">
              {courseSteps.map((step) => <li key={step.number}><span>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}
            </ol>
            <div className="formalities-note">
              <BadgeCheck aria-hidden="true" />
              <p><strong>Badania bez pomyłek:</strong> badanie lekarskie jest częścią standardowej ścieżki kandydata. Badanie psychologiczne dotyczy określonych kategorii i szkoleń zawodowych. Szczegóły znajdziesz po kliknięciu kategorii.</p>
              <a href="#kategorie">Sprawdź dokumenty <ArrowRight aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <Gallery />

        <section className="funding-section section" id="dofinansowanie" aria-labelledby="funding-title">
          <div className="shell funding-layout">
            <div className="funding-copy">
              <span className="section-number">05 / DOFINANSOWANIE</span>
              <h2 id="funding-title">Rozwijaj kwalifikacje<br /><em>z pomocą BUR.</em></h2>
              <p>Baza Usług Rozwojowych pomaga znaleźć szkolenia, które mogą być objęte wsparciem. FUKS ma aktywny profil dostawcy i wieloletnią historię zrealizowanych usług.</p>
              <ul>
                <li><Check aria-hidden="true" /> sprawdź aktualne usługi FUKS w BUR</li>
                <li><Check aria-hidden="true" /> skontaktuj się z operatorem właściwego programu</li>
                <li><Check aria-hidden="true" /> potwierdź warunki przed rozpoczęciem kursu</li>
              </ul>
              <a className="button button--yellow" href={contact.bur} target="_blank" rel="noreferrer"><Banknote aria-hidden="true" /> Skorzystaj z dofinansowania BUR <ExternalLink aria-hidden="true" /></a>
              <small>Nie gwarantujemy wysokości ani przyznania wsparcia — decydują zasady konkretnego programu i operatora.</small>
            </div>
            <div className="bur-card">
              <span className="bur-card__label">Profil dostawcy · dane sprawdzone 17.08.2026</span>
              <div className="bur-card__score"><strong>4,7</strong><span>/ 5</span></div>
              <div className="bur-card__stars" aria-label="Ocena 4,7 na 5">{[1, 2, 3, 4, 5].map((star) => <Star key={star} fill="currentColor" aria-hidden="true" />)}</div>
              <dl>
                <div><dt>Oceny usług</dt><dd>1 839</dd></div>
                <div><dt>Zrealizowane usługi</dt><dd>2 200</dd></div>
                <div><dt>Aktywne usługi</dt><dd>4</dd></div>
              </dl>
              <p>Liczby w BUR zmieniają się wraz z kolejnymi usługami i ocenami.</p>
            </div>
          </div>
        </section>

        <section className="news-section section" id="aktualnosci" aria-labelledby="news-title">
          <div className="shell">
            <div className="section-heading section-heading--split">
              <div>
                <span className="section-number">06 / AKTUALNOŚCI</span>
                <h2 id="news-title">Co nowego<br /><em>w FUKS?</em></h2>
              </div>
              <div className="news-heading__aside">
                <p>Oś czasu pobiera najnowsze wpisy z oficjalnego profilu. Poniżej zostawiamy również wyróżnione aktualności jako szybki podgląd i bezpieczny fallback.</p>
                <a href={contact.facebook} target="_blank" rel="noreferrer"><FacebookIcon aria-hidden="true" /> Obserwuj profil <ExternalLink aria-hidden="true" /></a>
              </div>
            </div>
            <div className="news-live-layout">
              <FacebookFeed />
              <div className="news-curated">
                <span className="news-curated__label">Wyróżnione wpisy</span>
                <div className="news-grid news-grid--curated">
                  {news.map((item) => (
                    <article className="news-card" key={item.title}>
                      <a href={item.href} target="_blank" rel="noreferrer" aria-label={`${item.title} — otwórz na Facebooku`}>
                        <span className="news-card__image"><Image src={item.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 30vw, 210px" /></span>
                        <span className="news-card__content"><small>{item.label}</small><h3>{item.title}</h3><p>{item.text}</p><span>Czytaj na Facebooku <ExternalLink aria-hidden="true" /></span></span>
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="review-section section" id="opinie" aria-labelledby="review-title">
          <div className="shell review-layout">
            <div>
              <span className="section-number">07 / OPINIE W DANYCH</span>
              <h2 id="review-title">Zaufanie bez<br /><em>wymyślonych cytatów.</em></h2>
              <p>Pokazujemy wyłącznie mierzalne informacje z oficjalnych profili — bez fikcyjnych nazwisk i historii kursantów.</p>
            </div>
            <div className="review-metrics">
              <article><strong>4,7/5</strong><span>ocena usług w BUR</span><small>1 839 ocen</small></article>
              <article><strong>96%</strong><span>poleca na Facebooku</span><small>17 opinii</small></article>
              <article><strong>2,6 tys.</strong><span>obserwujących profil</span><small>stan 17.08.2026</small></article>
            </div>
          </div>
        </section>

        <section className="booking-section section" aria-labelledby="booking-title">
          <div className="shell booking-layout">
            <div className="calendar-card">
              <CalendarDays aria-hidden="true" />
              <span>W przygotowaniu</span>
              <h2 id="booking-title">Kalendarz zapisów online</h2>
              <p>Pracujemy nad wygodnym wyborem terminów. Na razie rezerwację potwierdzisz bezpośrednio z biurem.</p>
              <BranchPhoneButton className="button button--blue" label="Zarezerwuj telefonicznie" />
            </div>
            <div className="payment-card">
              <Clock3 aria-hidden="true" />
              <span>Elastyczna płatność</span>
              <h3>Możliwość płatności w ratach</h3>
              <p>Istnieje możliwość płatności w ratach. Ostatnia rata musi zostać opłacona najpóźniej w dniu ukończenia kursu.</p>
              <small>Szczegóły i harmonogram płatności ustal z biurem przed rozpoczęciem szkolenia.</small>
            </div>
          </div>
        </section>

        <FAQ />
        <ContactSection />
      </main>
      <Footer />
      <MobileCta />
      </BranchProvider>
    </>
  );
}
