import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { Brand } from "@/components/brand";
import { contact } from "@/data/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Informacje o prywatności użytkowników strony FUKS.",
  alternates: { canonical: "/polityka-prywatnosci" },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <header className="legal-page__header"><Brand compact /><Link href="/"><ArrowLeft aria-hidden="true" /> Strona główna</Link></header>
      <article className="legal-page__content">
        <span className="section-number">INFORMACJE PRAWNE</span>
        <h1>Polityka prywatności</h1>
        <p className="legal-page__lead">Strona ma charakter informacyjny. Nie zawiera formularza zapisu, kont użytkowników ani płatności internetowych.</p>
        <h2>Administrator i kontakt</h2>
        <p>W sprawach dotyczących danych związanych z kontaktem ze szkołą skorzystaj z oficjalnych danych FUKS:</p>
        <ul><li><a href={contact.phoneHref}><Phone aria-hidden="true" /> {contact.phoneDisplay}</a></li><li><a href={contact.emailHref}><Mail aria-hidden="true" /> {contact.email}</a></li></ul>
        <h2>Jakie dane przetwarza strona</h2>
        <p>Nie prosimy o podawanie danych w formularzu. Standardowe logi techniczne hostingu mogą obejmować m.in. adres IP, typ przeglądarki, czas żądania i odwiedzony adres. Służą bezpieczeństwu, diagnostyce i poprawnemu działaniu usługi.</p>
        <h2>Analityka wydajności</h2>
        <p>Używamy Vercel Web Analytics i Speed Insights do zbiorczego pomiaru odwiedzin oraz jakości działania strony. Rozwiązania te są skonfigurowane bez Google Analytics i bez profili reklamowych.</p>
        <h2>Serwisy zewnętrzne</h2>
        <p>Linki do Facebooka, BUR i Map Google prowadzą do zewnętrznych serwisów działających według własnych zasad prywatności. Mapa Google jest ładowana dopiero po kliknięciu przycisku „Załaduj mapę”.</p>
        <h2>Twoje prawa</h2>
        <p>Jeżeli skontaktujesz się ze szkołą telefonicznie lub e-mailowo, możesz zapytać o podstawę i zakres przetwarzania przekazanych danych oraz skorzystać z praw wynikających z obowiązujących przepisów.</p>
        <p className="legal-page__date">Ostatnia aktualizacja: 17 sierpnia 2026 r.</p>
      </article>
    </main>
  );
}
