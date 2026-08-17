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
        <p className="legal-page__lead">Strona ogranicza mechanizmy zapisu w przeglądarce do minimum potrzebnego do wygodnego działania.</p>
        <h2>Zapamiętanie oddziału</h2>
        <p>Po wybraniu Nowego Sącza albo Bobowej zapisujemy w pamięci lokalnej przeglądarki preferencję oddziału. Dzięki temu nie pytamy o oddział przy każdym wejściu. Możesz ją usunąć w ustawieniach danych witryny w swojej przeglądarce.</p>
        <h2>Vercel Web Analytics i Speed Insights</h2>
        <p>Serwis korzysta ze zbiorczych pomiarów odwiedzin i wydajności dostarczanych przez Vercel. Nie instalujemy Google Analytics ani pikseli reklamowych Meta.</p>
        <h2>Treści zewnętrzne</h2>
        <p>Nie ładujemy automatycznie wtyczki Facebooka. Aktualności są lokalnymi podglądami prowadzącymi do oficjalnego profilu. Mapa Google jest uruchamiana dopiero po świadomym kliknięciu użytkownika; wtedy Google może zastosować własne technologie zgodnie ze swoją polityką.</p>
        <h2>Zarządzanie danymi witryny</h2>
        <p>W ustawieniach przeglądarki możesz przeglądać i usuwać dane zapisane dla tej domeny. Wyłączenie pamięci lokalnej nie blokuje dostępu do treści, ale może spowodować ponowne wyświetlenie wyboru oddziału. Serwis nie uruchamia opcjonalnych cookies marketingowych, dlatego nie pokazuje pozornego panelu zgód; decyzję o załadowaniu Map Google podejmujesz każdorazowo przy mapie.</p>
        <p className="legal-page__date">Ostatnia aktualizacja: 17 sierpnia 2026 r.</p>
      </article>
    </main>
  );
}
