# FUKS — szkoła jazdy Nowy Sącz i Bobowa

Produkcyjna strona informacyjno-sprzedażowa FUKS Krzysztof Groń. Serwis obejmuje pełną ofertę kategorii prawa jazdy, szkolenia zawodowe, dofinansowanie BUR, aktualności, galerię realnej floty oraz kontakt dla dwóch oddziałów.

## Najważniejsze funkcje

- pełnoekranowy wybór oddziału Nowy Sącz / Bobowa, zapamiętywany lokalnie;
- wyszukiwarka kategorii z synonimami i dostępnymi kartami szczegółów;
- aktualne na 17.08.2026 progi wieku, wymagania, dokumenty i ważne zmiany prawne;
- zapisy wyłącznie przez telefon — bez atrap formularzy, płatności i terminów;
- podstrona `/kursy-zawodowe` w kontrolowanym trybie „w przygotowaniu”;
- lokalne zdjęcia floty i marki, bez hotlinkowania plików graficznych z Facebooka;
- responsywna, automatycznie aktualizowana oś czasu oficjalnego profilu FUKS z lokalnym fallbackiem;
- lokalne SEO dla Nowego Sącza i Bobowej, JSON-LD, sitemap, robots i Open Graph;
- Vercel Web Analytics i Speed Insights, bez Google Analytics;
- dostępność klawiaturą, `prefers-reduced-motion` i responsywność od 360 px.

## Uruchomienie

Wymagany jest Node.js 20.9 lub nowszy i npm.

```bash
npm ci
copy .env.example .env.local
npm run dev
```

Kontrole jakości:

```bash
npm run lint
npm run build
npm audit --audit-level=moderate
```

## Konfiguracja

`NEXT_PUBLIC_SITE_URL` ustawia bazowy adres dla metadanych, sitemap i robots. Przed podłączeniem domeny należy zmienić wartość w Vercel na docelowy adres HTTPS.

## Dane i materiały

- treści i dane kontaktowe: `src/data/site.ts`;
- źródła prawne i biznesowe: `RESEARCH.md`;
- pochodzenie zdjęć i logo: `MEDIA_SOURCES.md`;
- polityka prywatności: `/polityka-prywatnosci`;
- polityka cookies: `/polityka-cookies`.

Informacje prawne i liczniki zewnętrznych profili mogą się zmieniać. Datę ostatniej weryfikacji pokazujemy w serwisie i dokumentacji.
