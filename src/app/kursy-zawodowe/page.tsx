import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Award, Banknote, BriefcaseBusiness, Check, Clock3, Phone, ShieldAlert, Truck, Wrench } from "lucide-react";
import { BranchProvider } from "@/components/branch-experience";
import { Footer } from "@/components/footer";
import { MobileCta } from "@/components/mobile-cta";
import { Navigation } from "@/components/navigation";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Kursy zawodowe — w przygotowaniu",
  description: "Kwalifikacje kierowców, szkolenia okresowe, ADR, tachografy i kursy operatorów maszyn w FUKS.",
  alternates: { canonical: "/kursy-zawodowe" },
  robots: { index: false, follow: true },
};

const trainingAreas = [
  { icon: Award, title: "Kwalifikacja zawodowa", text: "Kwalifikacja wstępna, przyspieszona i rozszerzenia dla przewozu osób lub rzeczy." },
  { icon: BriefcaseBusiness, title: "Szkolenia okresowe", text: "Odnowienie wiedzy i uprawnień kierowców wykonujących przewóz drogowy." },
  { icon: ShieldAlert, title: "ADR", text: "Kursy początkowe i doskonalące, zakres podstawowy oraz szkolenia specjalistyczne." },
  { icon: Wrench, title: "Operatorzy maszyn", text: "Szkolenia na wybrane maszyny budowlane i robocze — zakres potwierdź telefonicznie." },
  { icon: Clock3, title: "Tachografy", text: "Praktyczne szkolenia z prawidłowej obsługi i obowiązków kierowcy." },
  { icon: Truck, title: "Przewóz osób i rzeczy", text: "Szkolenia związane z krajowym i zagranicznym transportem drogowym." },
];

export default function ProfessionalCoursesPage() {
  return (
    <BranchProvider>
      <Navigation />
      <main id="main-content">
        <section className="subpage-hero subpage-hero--professional">
          <Image src="/images/fleet/ciezarowki-fuks.jpg" alt="Ciężarówki szkoleniowe FUKS" fill priority sizes="100vw" />
          <div className="subpage-hero__veil" aria-hidden="true" />
          <div className="shell subpage-hero__content">
            <Link href="/"><ArrowLeft aria-hidden="true" /> Wróć na stronę główną</Link>
            <span className="eyebrow eyebrow--light">Osobna podstrona · w przygotowaniu</span>
            <h1>Kursy<br /><em>zawodowe.</em></h1>
            <p>Rozbudowujemy katalog terminów i wymagań. Już teraz możesz sprawdzić zakres szkoleń i dobrać właściwą ścieżkę telefonicznie.</p>
            <div className="hero__actions">
              <a className="button button--yellow" href={contact.phoneHref}><Phone aria-hidden="true" /> Porozmawiaj z doradcą</a>
              <a className="button button--glass" href={contact.bur} target="_blank" rel="noreferrer"><Banknote aria-hidden="true" /> Profil FUKS w BUR</a>
            </div>
          </div>
        </section>

        <section className="section professional-list" aria-labelledby="professional-title">
          <div className="shell">
            <div className="section-heading section-heading--split">
              <div><span className="section-number">ZAKRES OFERTY</span><h2 id="professional-title">Kompetencje<br /><em>do pracy.</em></h2></div>
              <p>Wymagania zależą od posiadanych kategorii, wieku i rodzaju przewozu. Nie zgaduj — zadzwoń, a dobierzemy właściwy wariant.</p>
            </div>
            <div className="professional-grid">
              {trainingAreas.map((area) => { const Icon = area.icon; return <article key={area.title}><Icon aria-hidden="true" /><h3>{area.title}</h3><p>{area.text}</p><span><Check aria-hidden="true" /> dostępność do potwierdzenia</span></article>; })}
            </div>
          </div>
        </section>

        <section className="professional-cta section">
          <div className="shell professional-cta__inner">
            <div><span>Zapisy telefoniczne</span><h2>Opowiedz, jakie masz uprawnienia i co chcesz osiągnąć.</h2></div>
            <a className="button button--yellow" href={contact.phoneHref}><Phone aria-hidden="true" /> {contact.phoneDisplay}</a>
          </div>
        </section>
      </main>
      <Footer />
      <MobileCta />
    </BranchProvider>
  );
}
