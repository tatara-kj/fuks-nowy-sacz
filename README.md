# FUKS — koncepcja strony szkoły jazdy

Premium, responsywna koncepcja serwisu dla FUKS Krzysztof Groń w Nowym Sączu. Projekt łączy stronę wizerunkowo-sprzedażową z wyszukiwarką kursu i kompletną, ośmiokrokową symulacją rezerwacji.

> To nie jest oficjalna strona firmy. Rezerwacja, terminy, płatność i formularz kontaktowy są demonstracją frontendową: nic nie jest wysyłane, zapisywane ani pobierane.

## Najważniejsze funkcje

- lokalne SEO i metadane Open Graph;
- responsywny hero, menu mobilne i stałe CTA na telefonach;
- finder kursu dopasowujący kierunek do celu i pojazdu;
- pełny zakres kategorii od AM do T oraz ścieżki zawodowe;
- ośmiokrokowy modal: kategoria, usługa, data, godzina, kontakt, podsumowanie, płatność demo i sukces;
- walidacja formularzy, focus trap, przywracanie fokusu, blokada tła modala i obsługa klawisza Escape;
- wyłączone zajęte terminy oraz jawne oznaczenie wszystkich danych demonstracyjnych;
- animacje Motion z pełnym wariantem `prefers-reduced-motion`;
- lokalne fonty Manrope i Barlow oraz obrazy optymalizowane przez `next/image`;
- dane firmy oddzielone od niepotwierdzonych cen, opinii, modeli floty i dostępności.

## Uruchomienie

Wymagany jest Node.js 20.9 lub nowszy i npm.

```bash
npm ci
copy .env.example .env.local
npm run dev
```

Strona będzie dostępna pod adresem [http://localhost:3000](http://localhost:3000).

Kontrole jakości:

```bash
npm run lint
npm run build
npm audit --audit-level=moderate
npm start
```

## Konfiguracja

`NEXT_PUBLIC_SITE_URL` ustawia bazowy adres dla metadanych Open Graph. W środowisku lokalnym pozostaw `http://localhost:3000`, a przed publikacją podaj docelową domenę.

Projekt celowo zwraca `noindex` i blokuje roboty w `src/app/robots.ts`, ponieważ jest nieautoryzowaną koncepcją demonstracyjną. Przed prawdziwą publikacją trzeba uzyskać akceptację firmy, podłączyć rzeczywisty backend i płatności, ponownie potwierdzić dane oraz dopiero wtedy zmienić politykę indeksowania.

## Struktura

```text
src/app/                 strona, layout, metadane, OG image i style
src/components/          komponenty interaktywne i sekcje UI
src/data/site.ts         jawne dane treściowe i kontaktowe
src/app/fonts/           lokalne pliki Manrope i Barlow
public/images/           demonstracyjne fotografie zoptymalizowane lokalnie
RESEARCH.md              źródła, poziomy pewności i decyzje redakcyjne
```

## Granice danych demo

- Terminy i godziny w modalu są lokalną tablicą testową.
- Dane wpisane do formularzy istnieją wyłącznie w stanie React i są kasowane po sukcesie lub odświeżeniu.
- Nie ma endpointu API, bazy danych, localStorage, analityki ani operatora płatności.
- Strona nie publikuje niepotwierdzonych cen ani nazwisk/cytatów kursantów.
- Zdjęcia są koncepcyjne i nie przedstawiają aktualnej floty FUKS.
- Godziny otwarcia i miejsce konkretnego szkolenia wymagają potwierdzenia telefonicznego.

## Materiały wizualne

Fotografie demonstracyjne pochodzą z Unsplash. Hero korzysta ze zdjęcia [Luke Miller](https://unsplash.com/photos/car-drives-through-a-forest-on-a-winding-road-K14SKnhLFc0); pozostałe kadry są podpisane i podlinkowane bezpośrednio w galerii. Pliki są przechowywane lokalnie, aby uniknąć zależności od zewnętrznego hosta podczas działania strony.

Szczegółowy audyt źródeł i benchmarków znajduje się w [RESEARCH.md](./RESEARCH.md).
