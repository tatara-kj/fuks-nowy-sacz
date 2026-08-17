import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Brand } from "@/components/brand";

export const metadata: Metadata = {
  title: "Polityka cookies",
  description: "Informacje o plikach cookies i pamięci lokalnej na stronie FUKS.",
  alternates: { canonical: "/polityka-cookies" },
};

export default function CookiesPage() {
  return (
    <main className="legal-page" id="main-content">
      <header className="legal-page__header"><Brand compact /><Link href="/"><ArrowLeft aria-hidden="true" /> Strona główna</Link></header>
      <article className="legal-page__content">
        <span className="section-number">INFORMACJE PRAWNE</span>
        <h1>Polityka cookies</h1>
        <p className="legal-page__lead">Strona zapisuje lokalnie wybór oddziału oraz korzysta z osadzonych treści Facebooka i Map Google.</p>
        <h2>Zapamiętanie oddziału</h2>
        <p>Po wybraniu Nowego Sącza albo Bobowej zapisujemy w pamięci lokalnej przeglądarki preferencję oddziału. Dzięki temu nie pytamy o oddział przy każdym wejściu. Możesz ją usunąć w ustawieniach danych witryny w swojej przeglądarce.</p>
        <h2>Vercel Web Analytics i Speed Insights</h2>
        <p>Serwis korzysta ze zbiorczych pomiarów odwiedzin i wydajności dostarczanych przez Vercel. Nie instalujemy Google Analytics ani pikseli reklamowych Meta.</p>
        <h2>Treści zewnętrzne</h2>
        <p>Sekcja aktualności zawiera oficjalną oś czasu Facebooka, dzięki czemu nowe wpisy mogą pojawiać się automatycznie. Sekcja kontaktowa zawiera osadzoną Mapę Google. Po załadowaniu tych elementów Meta lub Google mogą stosować własne pliki cookies i podobne technologie zgodnie ze swoimi zasadami.</p>
        <h2>Zarządzanie danymi witryny</h2>
        <p>W ustawieniach przeglądarki możesz przeglądać i usuwać dane zapisane dla tej domeny oraz ograniczyć cookies stron trzecich. Wyłączenie pamięci lokalnej może spowodować ponowne wyświetlenie wyboru oddziału, a blokowanie treści zewnętrznych może ukryć oś czasu Facebooka lub mapę. Wyróżnione aktualności, adresy i bezpośrednie linki pozostają dostępne także bez tych osadzeń.</p>
        <p className="legal-page__date">Ostatnia aktualizacja: 17 sierpnia 2026 r.</p>
      </article>
    </main>
  );
}
