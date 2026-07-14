import { ArrowUp, MapPin, MessageCircle, Phone } from "lucide-react";
import { Brand } from "@/components/brand";
import { contact } from "@/data/site";

const nav = [
  ["Kursy", "#kursy"],
  ["Kategorie", "#kategorie"],
  ["Jak to działa", "#jak-to-dziala"],
  ["O nas", "#o-nas"],
  ["FAQ", "#faq"],
  ["Kontakt", "#kontakt"],
] as const;

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-marquee" aria-hidden="true">
        <span>GOTOWI DO DROGI · GOTOWI DO DROGI · GOTOWI DO DROGI ·</span>
      </div>
      <div className="section-shell footer-grid">
        <div className="footer-brand">
          <Brand inverted />
          <p>Prawo jazdy i szkolenia zawodowe w Nowym Sączu — od pierwszej decyzji po zawodową trasę.</p>
          <span className="demo-pill">PROJEKT DEMONSTRACYJNY</span>
        </div>

        <div className="footer-column">
          <h2>Nawigacja</h2>
          {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>

        <div className="footer-column">
          <h2>Kontakt</h2>
          <a href={contact.phoneHref}><Phone size={15} aria-hidden="true" /> {contact.phoneDisplay}</a>
          <a href={contact.maps} target="_blank" rel="noreferrer"><MapPin size={15} aria-hidden="true" /> Grodzka 39A</a>
          <a href={contact.facebook} target="_blank" rel="noreferrer"><MessageCircle size={15} aria-hidden="true" /> Facebook</a>
        </div>

        <a href="#top" className="back-to-top" aria-label="Wróć na początek strony">
          <ArrowUp aria-hidden="true" />
        </a>
      </div>
      <div className="section-shell footer-bottom">
        <p>© 2026 FUKS — koncepcja demonstracyjna. To nie jest oficjalna strona firmy.</p>
        <p>Rezerwacje, płatności, terminy i formularze są wyłącznie symulacją frontendową.</p>
      </div>
    </footer>
  );
}
