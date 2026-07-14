import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  CalendarClock,
  Check,
  CircleGauge,
  Clock3,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Route,
  ShieldCheck,
  Sparkles,
  Star,
  UserRoundCheck,
} from "lucide-react";
import { BookingButton, type BookingCategory } from "@/components/booking-button";
import { BookingModal } from "@/components/booking-modal";
import { ContactForm } from "@/components/contact-form";
import { CourseFinder } from "@/components/course-finder";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { MobileCta } from "@/components/mobile-cta";
import { Navigation } from "@/components/navigation";
import { Reveal } from "@/components/reveal";
import { SiteExperience } from "@/components/site-experience";
import { contact, courses, courseSteps, verifiedHighlights } from "@/data/site";

const categoryForBooking: Record<string, BookingCategory> = {
  moto: "A",
  b: "B",
  be: "B+E",
  c: "C",
  ce: "C+E",
  d: "D",
  t: "T",
  kwalifikacje: "Kwalifikacje",
};

const reasons = [
  {
    icon: GraduationCap,
    title: "Od 2003 roku",
    text: "Dostawca deklaruje prowadzenie szkoleń kierowców od 2003 r. — to fakt zweryfikowany w publicznym profilu BUR.",
  },
  {
    icon: CalendarClock,
    title: "Terminy ustalane indywidualnie",
    text: "W opublikowanych kartach usług praktyka jest umawiana z uczestnikiem, a przy wybranych kursach możliwy jest również wybór prowadzącego.",
  },
  {
    icon: CircleGauge,
    title: "Ciągłość szkolenia",
    text: "W aktualnej ofercie kat. C ośrodek deklaruje egzamin na pojeździe, na którym odbywa się nauka.",
  },
  {
    icon: Banknote,
    title: "Ścieżki z dofinansowaniem",
    text: "W BUR widoczne są usługi w programach takich jak Małopolski Pociąg do Kariery i bony szkoleniowe — dostępność trzeba potwierdzić.",
  },
];

const packages = [
  {
    tag: "START",
    title: "Kategoria B",
    text: "Pełna ścieżka dla przyszłego kierowcy samochodu osobowego.",
    points: ["formalności i teoria", "zajęcia praktyczne", "egzamin wewnętrzny"],
    category: "B" as BookingCategory,
  },
  {
    tag: "PRO",
    title: "C / C+E",
    text: "Rozwój uprawnień do pracy w transporcie rzeczy.",
    points: ["wariant pojedynczy lub łączony", "praktyka na pojeździe ciężarowym", "możliwe programy wsparcia"],
    category: "C" as BookingCategory,
    featured: true,
  },
  {
    tag: "PEOPLE",
    title: "Kategoria D",
    text: "Przygotowanie do kierowania autobusem i przewozu osób.",
    points: ["wariant po B lub po C", "indywidualne ustalenia", "kwalifikacje do potwierdzenia"],
    category: "D" as BookingCategory,
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Małopolskie Centrum Szkoleń FUKS Agnieszka i Krzysztof Groń Sp. z o.o.",
  alternateName: "FUKS Krzysztof Groń",
  description: "Ośrodek szkolenia kierowców i kursów zawodowych w Nowym Sączu.",
  foundingDate: "2003",
  telephone: "+48606647396",
  email: "biuro.oskgron@op.pl",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ul. Grodzka 39A",
    postalCode: "33-300",
    addressLocality: "Nowy Sącz",
    addressCountry: "PL",
  },
  areaServed: { "@type": "City", name: "Nowy Sącz" },
  sameAs: [contact.facebook],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteExperience />
      <Navigation />

      <main>
        <Hero />

        <div id="kursy" className="anchor-offset">
          <CourseFinder />
        </div>

        <section className="categories-section" id="kategorie" aria-labelledby="categories-title">
          <div className="section-shell">
            <Reveal className="section-heading section-heading--split">
              <div>
                <span className="section-index">02 / KATEGORIE</span>
                <h2 id="categories-title">WYBIERZ<br /><em>SWÓJ PAS.</em></h2>
              </div>
              <div className="section-heading__aside">
                <p>
                  Od dwóch kół po zestaw ciężarowy. Zakres ośrodka potwierdziliśmy w dokumentach Bazy Usług Rozwojowych.
                </p>
                <small>Aktualny nabór i termin konkretnej kategorii potwierdź telefonicznie.</small>
              </div>
            </Reveal>

            <div className="category-rail" role="list" aria-label="Kategorie prawa jazdy i szkoleń">
              {courses.map((course, index) => {
                const Icon = course.icon;
                return (
                  <Reveal className="category-card" delay={Math.min(index * 0.045, 0.25)} key={course.id}>
                    <article role="listitem" style={{ "--card-accent": course.accent } as React.CSSProperties}>
                      <div className="category-card__top">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <Icon aria-hidden="true" />
                      </div>
                      <div className="category-card__code">{course.category}</div>
                      <span className="category-card__eyebrow">
                        {course.professional && <i aria-hidden="true" />}{course.eyebrow}
                      </span>
                      <h3>{course.title}</h3>
                      <p>{course.description}</p>
                      <div className="category-card__for">
                        <strong>Dla kogo?</strong>
                        <span>{course.forWhom}</span>
                      </div>
                      <BookingButton category={categoryForBooking[course.id]} className="category-card__button">
                        Sprawdź kurs
                      </BookingButton>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="why-section" id="o-nas" aria-labelledby="why-title">
          <div className="why-orbit" aria-hidden="true"><span>FUKS</span></div>
          <div className="section-shell">
            <Reveal className="why-intro">
              <span className="section-index section-index--lime">03 / DLACZEGO FUKS</span>
              <h2 id="why-title">TU NIE CHODZI TYLKO<br />O <em>ZDANY EGZAMIN.</em></h2>
              <p>
                Chodzi o moment, w którym na drodze przestajesz zgadywać. O decyzje, spokój i kompetencje, które zostają na dłużej.
              </p>
            </Reveal>

            <div className="verified-stats" aria-label="Zweryfikowane dane o FUKS">
              {verifiedHighlights.map((item, index) => (
                <Reveal className="verified-stat" delay={index * 0.08} key={item.label}>
                  <strong>{item.value}</strong>
                  <h3>{item.label}</h3>
                  <p>{item.note}</p>
                </Reveal>
              ))}
            </div>

            <div className="reasons-grid">
              {reasons.map((reason, index) => {
                const Icon = reason.icon;
                return (
                  <Reveal className="reason" delay={index * 0.06} key={reason.title}>
                    <span className="reason__icon"><Icon aria-hidden="true" /></span>
                    <div>
                      <h3>{reason.title}</h3>
                      <p>{reason.text}</p>
                    </div>
                    <span className="reason__number">0{index + 1}</span>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="process-section" id="jak-to-dziala" aria-labelledby="process-title">
          <div className="section-shell">
            <Reveal className="section-heading process-heading">
              <span className="section-index">04 / TRASA KURSU</span>
              <h2 id="process-title">OD DECYZJI<br />DO <em>EGZAMINU.</em></h2>
              <p>Pięć czytelnych etapów. Szczegóły formalne i czas trwania zależą od kategorii oraz Twojej sytuacji.</p>
            </Reveal>

            <div className="process-road">
              <svg viewBox="0 0 100 680" preserveAspectRatio="none" aria-hidden="true">
                <path d="M50 0 C10 90 88 150 52 245 C18 335 88 405 48 500 C25 555 36 620 50 680" />
              </svg>
              <div className="process-steps">
                {courseSteps.map((step, index) => (
                  <Reveal className={`process-step process-step--${index % 2 ? "right" : "left"}`} key={step.number}>
                    <span className="process-step__pin"><i /></span>
                    <article>
                      <span>{step.number}</span>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Gallery />

        <section className="reviews-section" id="opinie" aria-labelledby="reviews-title">
          <div className="section-shell reviews-grid">
            <Reveal className="reviews-score">
              <span className="section-index section-index--lime">06 / OPINIE W DANYCH</span>
              <div className="score-number"><span>4,7</span><small>/5</small></div>
              <div className="score-stars" aria-label="Ocena 4,7 na 5">
                {[0, 1, 2, 3, 4].map((star) => <Star key={star} fill="currentColor" aria-hidden="true" />)}
              </div>
              <p>ponad 1800 ocen usług w profilu dostawcy BUR</p>
            </Reveal>
            <Reveal className="reviews-copy" delay={0.1}>
              <BadgeCheck aria-hidden="true" />
              <h2 id="reviews-title">BEZ FIKCYJNYCH<br />NAZWISK I CYTATÓW.</h2>
              <p>
                Zamiast wymyślać opinie kursantów, pokazujemy wyłącznie wynik zweryfikowany w publicznej Bazie Usług Rozwojowych. Ocena dotyczy usług dostawcy, a licznik może się zmieniać.
              </p>
              <a href="https://uslugirozwojowe.parp.gov.pl/wyszukiwarka/dostawca-uslug/podglad?id=21948" target="_blank" rel="noreferrer">
                Zobacz profil BUR <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </section>

        <section className="pricing-section" id="cennik" aria-labelledby="pricing-title">
          <div className="section-shell">
            <Reveal className="section-heading section-heading--split">
              <div>
                <span className="section-index">07 / PAKIETY</span>
                <h2 id="pricing-title">KURS DOBRANY<br /><em>DO CELU.</em></h2>
              </div>
              <div className="section-heading__aside">
                <p>Ceny i dostępność zmieniają się zależnie od wariantu, naboru i możliwego dofinansowania.</p>
                <small>Dlatego nie publikujemy niepotwierdzonych kwot.</small>
              </div>
            </Reveal>

            <div className="pricing-grid">
              {packages.map((item, index) => (
                <Reveal className={`price-card ${item.featured ? "price-card--featured" : ""}`} delay={index * 0.08} key={item.title}>
                  <span className="price-card__tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <div className="price-card__price">
                    <small>Cena</small>
                    <strong>ustalana indywidualnie</strong>
                  </div>
                  <ul>
                    {item.points.map((point) => <li key={point}><Check size={16} aria-hidden="true" />{point}</li>)}
                  </ul>
                  <BookingButton category={item.category} className={item.featured ? "price-card__cta price-card__cta--dark" : "price-card__cta"}>
                    Zapytaj o wariant
                  </BookingButton>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <FAQ />

        <section className="contact-section" id="kontakt" aria-labelledby="contact-title">
          <div className="section-shell">
            <Reveal className="contact-heading">
              <span className="section-index section-index--lime">09 / KONTAKT</span>
              <h2 id="contact-title">ZACZNIJMY<br /><em>OD ROZMOWY.</em></h2>
              <a className="contact-big-phone" href={contact.phoneHref}>
                {contact.phoneDisplay}<ArrowRight aria-hidden="true" />
              </a>
              <p className="contact-source-note">
                Adresy poniżej pochodzą z aktualnej karty usługi kat. C w BUR.
                Miejsce realizacji swojego kursu potwierdź przy zapisie.
              </p>
            </Reveal>

            <div className="contact-grid">
              <Reveal className="contact-map">
                <div className="map-grid" aria-hidden="true" />
                <svg viewBox="0 0 600 520" aria-hidden="true">
                  <path d="M-20 390 C110 350 105 190 245 225 C360 255 385 85 625 105" />
                  <path d="M95 -30 C120 145 290 135 280 315 C270 430 380 460 520 555" />
                </svg>
                <div className="map-pin map-pin--office">
                  <span><MapPin aria-hidden="true" /></span>
                  <div><small>BIURO · TEORIA</small><strong>Grodzka 39A</strong></div>
                </div>
                <div className="map-pin map-pin--ground">
                  <span><Route aria-hidden="true" /></span>
                  <div><small>PLAC MANEWROWY</small><strong>Grottgera 53</strong></div>
                </div>
                <div className="map-card">
                  <span>NOWY SĄCZ</span>
                  <strong>49°37&apos;N · 20°42&apos;E</strong>
                  <a href={contact.maps} target="_blank" rel="noreferrer">Wyznacz trasę <ArrowUpRight size={16} aria-hidden="true" /></a>
                </div>
              </Reveal>

              <Reveal className="contact-info" delay={0.08}>
                <div className="contact-data">
                  <a href={contact.phoneHref}><Phone aria-hidden="true" /><span><small>Telefon</small><strong>{contact.phoneDisplay}</strong></span></a>
                  <a href="mailto:biuro.oskgron@op.pl"><Mail aria-hidden="true" /><span><small>E-mail</small><strong>biuro.oskgron@op.pl</strong></span></a>
                  <a href={contact.facebook} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /><span><small>Social media</small><strong>Facebook FUKS</strong></span></a>
                </div>
                <div className="hours-card">
                  <Clock3 aria-hidden="true" />
                  <div>
                    <small>Godziny wg dwóch katalogów publicznych</small>
                    <strong>Pon.–pt. 08:30–18:00<br />Sob. 08:00–12:00</strong>
                    <p>Przed wizytą potwierdź godziny telefonicznie.</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="contact-form-wrap">
              <Reveal className="contact-form-copy">
                <Sparkles aria-hidden="true" />
                <h3>Sprawdź, jak działa formularz.</h3>
                <p>To bezpieczna symulacja frontendowa. Wpisane dane pozostają tylko w pamięci przeglądarki i nie są wysyłane.</p>
                <ul>
                  <li><ShieldCheck aria-hidden="true" /> bez backendu</li>
                  <li><UserRoundCheck aria-hidden="true" /> bez zapisu danych</li>
                </ul>
              </Reveal>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BookingModal />
      <MobileCta />
    </>
  );
}
