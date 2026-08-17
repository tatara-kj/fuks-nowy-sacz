import Image from "next/image";
import { ArrowDown, BadgeCheck, Search } from "lucide-react";
import { BranchBadge } from "@/components/branch-experience";
import { BranchPhoneButton } from "@/components/branch-phone-button";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Image
        className="hero__image"
        src="/images/fleet/samochody-szkola-jazdy-fuks.jpg"
        alt="Flota samochodów szkoleniowych FUKS przed siedzibą w Nowym Sączu"
        fill
        priority
        sizes="100vw"
      />
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__road" aria-hidden="true"><span /></div>
      <div className="shell hero__inner">
        <div className="hero__copy">
          <span className="eyebrow eyebrow--light"><BadgeCheck aria-hidden="true" /> Szkoła jazdy i szkolenia zawodowe od 2003 roku</span>
          <h1 id="hero-title">Lubimy<br /><em>uczyć jeździć.</em></h1>
          <p>Od pierwszej lekcji po zawodową trasę. Wszystkie kategorie, dwa oddziały i doświadczenie, które daje spokój za kierownicą.</p>
          <div className="hero__actions">
            <BranchPhoneButton className="button button--yellow" label="Zadzwoń i zapisz się" />
            <a className="button button--glass" href="#kategorie"><Search aria-hidden="true" /> Znajdź kategorię</a>
          </div>
          <div className="hero__facts" aria-label="Najważniejsze informacje">
            <span><strong>23</strong> lata doświadczenia</span>
            <span><strong>2</strong> oddziały</span>
            <span><strong>4,7/5</strong> ocena w BUR</span>
          </div>
        </div>
        <div className="hero__branch"><BranchBadge /></div>
      </div>
      <a className="hero__scroll" href="#kategorie"><ArrowDown aria-hidden="true" /> Poznaj ofertę</a>
    </section>
  );
}
