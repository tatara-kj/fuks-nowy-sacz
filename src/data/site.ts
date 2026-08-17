export type BranchKey = "nowy-sacz" | "bobowa";

export type Branch = {
  key: BranchKey;
  shortLabel: string;
  label: string;
  address: string;
  postalCode: string;
  city: string;
  trainingGround?: string;
  trainingGroundNote?: string;
  hours: Array<{ days: string; hours: string }>;
  mapsUrl: string;
  mapQuery: string;
  heroImage: string;
};

export type CourseIcon =
  | "bike"
  | "car"
  | "trailer"
  | "truck"
  | "bus"
  | "tractor"
  | "briefcase"
  | "certificate"
  | "adr"
  | "tools";

export type Course = {
  id: string;
  code: string;
  title: string;
  kicker: string;
  icon: CourseIcon;
  aliases: string[];
  summary: string;
  minimumAge: string;
  ageDetails: string[];
  permissions: string[];
  requirements: string[];
  documents: string[];
  steps: string[];
  important?: string;
  professional?: boolean;
  sourceUrl?: string;
};

export const contact = {
  phoneDisplay: "606 647 396",
  phoneHref: "tel:+48606647396",
  email: "biuro.oskgron@op.pl",
  emailHref: "mailto:biuro.oskgron@op.pl",
  facebook: "https://www.facebook.com/fuks.krzysztofgron/",
  bur: "https://uslugirozwojowe.parp.gov.pl/wyszukiwarka/dostawca-uslug/podglad?id=21948",
};

export const branches: Record<BranchKey, Branch> = {
  "nowy-sacz": {
    key: "nowy-sacz",
    shortLabel: "Nowy Sącz",
    label: "Ośrodek szkolenia w Nowym Sączu",
    address: "ul. Grodzka 39A",
    postalCode: "33-300",
    city: "Nowy Sącz",
    trainingGround: "ul. Artura Grottgera 53, Nowy Sącz",
    hours: [
      { days: "Poniedziałek–piątek", hours: "08:30–18:00" },
      { days: "Sobota", hours: "08:00–12:00" },
      { days: "Niedziela", hours: "nieczynne" },
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Grodzka+39A+Nowy+Sacz",
    mapQuery: "Grodzka 39A, 33-300 Nowy Sącz",
    heroImage: "/images/fleet/samochody-szkola-jazdy-fuks.jpg",
  },
  bobowa: {
    key: "bobowa",
    shortLabel: "Bobowa",
    label: "Ośrodek szkolenia w Bobowej",
    address: "Rynek 3",
    postalCode: "38-350",
    city: "Bobowa",
    trainingGroundNote: "Miejsce zajęć praktycznych potwierdzimy telefonicznie przy zapisie.",
    hours: [
      { days: "Poniedziałek–piątek", hours: "08:00–16:00" },
      { days: "Sobota", hours: "08:00–13:00" },
      { days: "Niedziela", hours: "nieczynne" },
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rynek+3+Bobowa",
    mapQuery: "Rynek 3, 38-350 Bobowa",
    heroImage: "/images/fleet/ciezarowki-fuks.jpg",
  },
};

const standardDocuments = [
  "dokument tożsamości",
  "aktualne zdjęcie do prawa jazdy",
  "orzeczenie lekarskie o braku przeciwwskazań",
  "numer Profilu Kandydata na Kierowcę (PKK)",
];

const standardSteps = [
  "Zadzwoń i potwierdź kategorię oraz oddział.",
  "Wykonaj badanie lekarskie i przygotuj zdjęcie.",
  "Załóż PKK w odpowiednim urzędzie.",
  "Zapisz się na kurs i ustal harmonogram zajęć.",
  "Po szkoleniu i egzaminie wewnętrznym zapisz się na egzamin państwowy.",
];

const govCategories = "https://www.gov.pl/web/infrastruktura/kategorie-prawa-jazdy";

export const courses: Course[] = [
  {
    id: "motocykle",
    code: "AM · A1 · A2 · A",
    title: "Motocykle",
    kicker: "Dwa koła",
    icon: "bike",
    aliases: ["motor", "motocykl", "skuter", "motorower", "am", "a1", "a2", "a"],
    summary: "Pełna ścieżka od motoroweru i motocykla 125 cm³ po kategorię A bez ograniczeń.",
    minimumAge: "od 14 lat",
    ageDetails: [
      "AM — 14 lat.",
      "A1 — 16 lat.",
      "A2 — 18 lat.",
      "A — 20 lat po minimum 2 latach posiadania A2 albo 24 lata w ścieżce bez A2.",
    ],
    permissions: [
      "AM: motorower i lekki czterokołowiec.",
      "A1: motocykl do 125 cm³, do 11 kW i maks. 0,1 kW/kg.",
      "A2: motocykl do 35 kW i maks. 0,2 kW/kg.",
      "A: każdy motocykl.",
    ],
    requirements: ["Zgoda rodzica lub opiekuna dla osoby niepełnoletniej.", "W przypadku kat. A od 20 lat — kat. A2 posiadana od co najmniej 2 lat."],
    documents: standardDocuments,
    steps: standardSteps,
    sourceUrl: govCategories,
  },
  {
    id: "samochod",
    code: "B1 · B",
    title: "Samochód osobowy",
    kicker: "Pierwsze prawo jazdy",
    icon: "car",
    aliases: ["auto", "samochód", "samochod", "osobówka", "b1", "b", "17 lat"],
    summary: "Najpopularniejsza kategoria do codziennej jazdy samochodem osobowym.",
    minimumAge: "B od 17 lat",
    ageDetails: [
      "B1 — 16 lat.",
      "B — 17 lat. Do ukończenia 18 lat uprawnienie obowiązuje wyłącznie w Polsce.",
      "Kurs i egzamin można rozpocząć najwcześniej 3 miesiące przed osiągnięciem wymaganego wieku.",
    ],
    permissions: [
      "B1: czterokołowiec oraz pojazdy kategorii AM.",
      "B: samochód do 3,5 t (z wyjątkami ustawowymi) oraz określone zestawy z przyczepą.",
    ],
    requirements: [
      "Zgoda rodzica lub opiekuna dla osoby niepełnoletniej.",
      "Kierowca, który uzyska kat. B przed 18. rokiem życia, przez pierwsze 6 miesięcy lub do ukończenia 18 lat jeździ z doświadczonym opiekunem spełniającym warunki ustawowe.",
    ],
    documents: standardDocuments,
    steps: standardSteps,
    important: "Zasady dla 17-latków obowiązują od 3 marca 2026 r. Przed zapisem potwierdzimy aktualną procedurę i wymagania wobec opiekuna.",
    sourceUrl: "https://www.gov.pl/web/infrastruktura/uwaga-kierowcy--od-3-marca-obowiazuja-nowe-przepisy---sprawdz-co-sie-zmienilo",
  },
  {
    id: "auto-przyczepa",
    code: "B+E",
    title: "Auto z przyczepą",
    kicker: "Większy zestaw",
    icon: "trailer",
    aliases: ["przyczepa", "laweta", "b+e", "be", "auto przyczepa"],
    summary: "Rozszerzenie kategorii B o cięższą przyczepę — przydatne w pracy, podróży i sporcie.",
    minimumAge: "od 18 lat",
    ageDetails: ["Minimalny wiek — 18 lat."],
    permissions: ["Pojazd kategorii B z przyczepą, której dopuszczalna masa całkowita nie przekracza 3,5 t.", "W Polsce także określone zestawy ciągnika rolniczego lub pojazdu wolnobieżnego z przyczepą."],
    requirements: ["Prawo jazdy kategorii B."],
    documents: [...standardDocuments, "prawo jazdy kategorii B"],
    steps: standardSteps,
    sourceUrl: govCategories,
  },
  {
    id: "ciezarowka",
    code: "C",
    title: "Samochód ciężarowy",
    kicker: "Kierunek zawodowy",
    icon: "truck",
    aliases: ["ciężarówka", "ciezarowka", "tir", "kat c", "c", "transport rzeczy"],
    summary: "Uprawnienia do prowadzenia pojazdów ciężarowych powyżej 3,5 t, z wyjątkiem autobusów.",
    minimumAge: "standardowo od 21 lat",
    ageDetails: ["Standardowo — 21 lat.", "Od 18 lat w odpowiedniej ścieżce z kwalifikacją wstępną."],
    permissions: ["Pojazd samochodowy o DMC powyżej 3,5 t, z wyjątkiem autobusu, oraz taki pojazd z lekką przyczepą."],
    requirements: ["Prawo jazdy kategorii B.", "Badanie lekarskie i psychologiczne dla kierowcy zawodowego.", "Do wykonywania przewozu drogowego potrzebna jest odpowiednia kwalifikacja zawodowa."],
    documents: [...standardDocuments, "orzeczenie psychologiczne", "prawo jazdy kategorii B", "PKZ — gdy równolegle realizujesz kwalifikację zawodową"],
    steps: ["Skonsultuj ścieżkę C albo C + kwalifikacja.", ...standardSteps.slice(1)],
    professional: true,
    sourceUrl: govCategories,
  },
  {
    id: "ciezarowka-przyczepa",
    code: "C+E",
    title: "Ciężarówka z przyczepą",
    kicker: "Pełny zestaw",
    icon: "trailer",
    aliases: ["c+e", "ce", "naczepa", "tir", "zestaw ciężarowy", "zestaw ciezarowy"],
    summary: "Rozszerzenie kategorii C o ciężarówkę z przyczepą lub naczepą.",
    minimumAge: "standardowo od 21 lat",
    ageDetails: ["Wiek zależy od posiadanej kwalifikacji zawodowej; możliwa jest ścieżka od 18 lat.", "Bez kwalifikacji zawodowej stosuje się standardowy próg dla kat. C."],
    permissions: ["Pojazd kategorii C z przyczepą lub naczepą."],
    requirements: ["Prawo jazdy kategorii C.", "Badanie lekarskie i psychologiczne.", "Odpowiednia kwalifikacja zawodowa, jeżeli zamierzasz wykonywać przewóz drogowy."],
    documents: [...standardDocuments, "orzeczenie psychologiczne", "prawo jazdy kategorii C", "PKZ — jeśli dotyczy"],
    steps: ["Potwierdź, czy wybierasz samą kat. C+E, czy ścieżkę łączoną z kwalifikacją.", ...standardSteps.slice(1)],
    professional: true,
    sourceUrl: govCategories,
  },
  {
    id: "autobus",
    code: "D1 · D",
    title: "Autobus",
    kicker: "Przewóz osób",
    icon: "bus",
    aliases: ["autobus", "bus", "d", "d1", "przewóz osób", "przewoz osob"],
    summary: "Kategorie do kierowania autobusem oraz przygotowania do pracy w przewozie osób.",
    minimumAge: "D1 od 21, D od 24 lat",
    ageDetails: [
      "Standardowo: D1 — 21 lat, D — 24 lata.",
      "Do 2 września 2026 r. niższe progi w ścieżce zawodowej zależą od rodzaju kwalifikacji i przewozu: m.in. D1 od 21 lat, D od 21 albo 23 lat.",
      "Od 3 września 2026 r. z kwalifikacją wstępną: D1/D1+E od 18 lat przy przewozie krajowym; D/D+E od 20 lat przy przewozie krajowym albo od 18 lat na krajowych liniach regularnych do 50 km.",
    ],
    permissions: ["D1: autobus do 17 osób łącznie z kierowcą i do 8 m długości.", "D: autobus bez ograniczenia właściwego dla D1."],
    requirements: ["Prawo jazdy kategorii B.", "Badanie lekarskie i psychologiczne.", "Odpowiednia kwalifikacja zawodowa do wykonywania przewozu osób."],
    documents: [...standardDocuments, "orzeczenie psychologiczne", "prawo jazdy kategorii B lub C — zależnie od wariantu", "PKZ — jeśli dotyczy"],
    steps: ["Zadzwoń, aby dobrać wariant po B albo po C i właściwą kwalifikację.", ...standardSteps.slice(1)],
    important: "Stan na 17 sierpnia 2026 r.: nowe wyjątki wieku 18 i 20 lat dla określonych krajowych przewozów autobusowych zaczną obowiązywać 3 września 2026 r. Do tego dnia nie można ich stosować. Dobór kategorii, kwalifikacji i rodzaju przewozu potwierdź przed zapisem.",
    professional: true,
    sourceUrl: govCategories,
  },
  {
    id: "ciagnik",
    code: "T",
    title: "Ciągnik rolniczy",
    kicker: "Rolnictwo i maszyny",
    icon: "tractor",
    aliases: ["ciągnik", "ciagnik", "traktor", "rolniczy", "t"],
    summary: "Kategoria do prowadzenia ciągnika rolniczego, pojazdu wolnobieżnego i określonych zestawów.",
    minimumAge: "od 16 lat",
    ageDetails: ["Minimalny wiek — 16 lat."],
    permissions: ["Ciągnik rolniczy lub pojazd wolnobieżny.", "Zespół złożony z takiego pojazdu i przyczepy lub przyczep.", "Pojazdy kategorii AM."],
    requirements: ["Zgoda rodzica lub opiekuna dla osoby niepełnoletniej."],
    documents: standardDocuments,
    steps: standardSteps,
    sourceUrl: govCategories,
  },
  {
    id: "kwalifikacja-zawodowa",
    code: "KWALIFIKACJA",
    title: "Kwalifikacja zawodowa",
    kicker: "Start w zawodzie",
    icon: "certificate",
    aliases: ["kwalifikacja", "kod 95", "pkz", "przewóz osób", "przewóz rzeczy", "zawodowy"],
    summary: "Kwalifikacja wstępna lub przyspieszona dla osób rozpoczynających zawodową pracę w transporcie.",
    minimumAge: "zależnie od ścieżki",
    ageDetails: ["Minimalny wiek zależy od kategorii prawa jazdy, rodzaju kwalifikacji oraz planowanego przewozu."],
    permissions: ["Przygotowanie do uzyskania wpisu kodu 95 i wykonywania przewozu drogowego osób lub rzeczy — po spełnieniu wszystkich wymagań."],
    requirements: ["Właściwa kategoria prawa jazdy lub równoległa ścieżka jej uzyskania.", "Badanie lekarskie i psychologiczne.", "Profil Kierowcy Zawodowego (PKZ)."],
    documents: ["dokument tożsamości", "prawo jazdy — jeśli już wydane", "orzeczenie lekarskie", "orzeczenie psychologiczne", "numer PKZ", "aktualne zdjęcie, jeżeli wymaga go procedura"],
    steps: ["Zadzwoń i opisz posiadane kategorie oraz cel zawodowy.", "Dobierz kwalifikację wstępną, wstępną przyspieszoną albo właściwe rozszerzenie.", "Wykonaj badania i załóż PKZ.", "Ustal termin szkolenia i egzaminu kwalifikacyjnego."],
    professional: true,
    sourceUrl: govCategories,
  },
  {
    id: "szkolenia-zawodowe",
    code: "PRO",
    title: "Szkolenia zawodowe",
    kicker: "Rozwój kompetencji",
    icon: "tools",
    aliases: ["okresowe", "tachograf", "operator maszyn", "maszyny", "przewóz krajowy", "przewóz zagraniczny", "szkolenie"],
    summary: "Szkolenia okresowe kierowców, tachografy, operatorzy maszyn oraz przewóz osób i rzeczy.",
    minimumAge: "zależnie od szkolenia",
    ageDetails: ["Wiek, wymagane uprawnienia i badania zależą od wybranego szkolenia."],
    permissions: ["Szkolenia okresowe kierowców.", "Obsługa tachografu.", "Kursy operatorów maszyn.", "Krajowy i zagraniczny przewóz osób oraz rzeczy."],
    requirements: ["Zakres dokumentów ustalimy po wskazaniu konkretnego szkolenia i posiadanych uprawnień."],
    documents: ["dokument tożsamości", "prawo jazdy lub posiadane uprawnienia — jeśli wymagane", "badania właściwe dla wybranej ścieżki"],
    steps: ["Wybierz interesujące szkolenie.", "Zadzwoń, aby sprawdzić wymagania i najbliższy termin.", "Jeżeli szkolenie jest dostępne w BUR, sprawdź możliwość dofinansowania.", "Dostarcz wymagane dokumenty i rozpocznij szkolenie."],
    professional: true,
  },
  {
    id: "adr",
    code: "ADR",
    title: "Towary niebezpieczne",
    kicker: "Transport specjalistyczny",
    icon: "adr",
    aliases: ["adr", "cysterny", "towary niebezpieczne", "niebezpieczne", "podstawa"],
    summary: "Kursy ADR początkowe i doskonalące, w tym zakres podstawowy i specjalistyczny.",
    minimumAge: "od 21 lat",
    ageDetails: ["Zaświadczenie ADR może otrzymać osoba, która ukończyła 21 lat (z ustawowym wyjątkiem dla Sił Zbrojnych RP)."],
    permissions: ["Po ukończeniu odpowiedniego kursu i zdaniu egzaminu — uzyskanie ważnego zaświadczenia ADR w objętym nim zakresie."],
    requirements: ["Spełnienie wymagań wobec kierowców wykonujących przewóz drogowy.", "Kurs początkowy przy pierwszym zaświadczeniu albo doskonalący przy przedłużeniu.", "Pozytywny wynik egzaminu kończącego kurs."],
    documents: ["dokument tożsamości", "prawo jazdy", "dokumenty wymagane dla wybranego rodzaju kursu ADR"],
    steps: ["Potwierdź, czy potrzebujesz kursu podstawowego, cysternowego lub innego zakresu specjalistycznego.", "Sprawdź wymagania i termin.", "Ukończ kurs.", "Zdaj egzamin końcowy i odbierz zaświadczenie ADR."],
    professional: true,
    sourceUrl: "https://www.gov.pl/web/infrastruktura/towary-niebezpieczne",
  },
];

export const courseSteps = [
  { number: "01", title: "Wybierz kategorię", text: "Skorzystaj z wyszukiwarki albo zadzwoń — dobierzemy ścieżkę do wieku, posiadanych uprawnień i celu." },
  { number: "02", title: "Zbierz formalności", text: "Badanie lekarskie, zdjęcie i PKK. Przy szkoleniach zawodowych także badanie psychologiczne i PKZ, jeżeli dotyczą wybranej ścieżki." },
  { number: "03", title: "Ustal harmonogram", text: "Rezerwacja odbywa się telefonicznie. Terminy teorii i praktyki ustalisz bezpośrednio z biurem." },
  { number: "04", title: "Zrealizuj szkolenie", text: "Teoria, plac i jazda w ruchu drogowym są dopasowane do konkretnej kategorii i obowiązującego programu." },
  { number: "05", title: "Podejdź do egzaminu", text: "Po zakończeniu kursu i egzaminie wewnętrznym otrzymasz informacje potrzebne do zapisania się na egzamin państwowy." },
];

export const faqs = [
  { question: "Jakich dokumentów potrzebuję, żeby zacząć?", answer: "Najczęściej potrzebujesz dokumentu tożsamości, aktualnego zdjęcia, orzeczenia lekarskiego i numeru PKK. Dla ścieżek zawodowych mogą być wymagane również badania psychologiczne, odpowiednia wcześniejsza kategoria oraz PKZ. Dokładna lista znajduje się po otwarciu wybranej kategorii." },
  { question: "Czy kurs kategorii B można rozpocząć przed 18. rokiem życia?", answer: "Tak. Od 3 marca 2026 r. minimalny wiek dla kategorii B wynosi 17 lat, a kurs i egzamin można rozpocząć do 3 miesięcy wcześniej. Do ukończenia 18 lat obowiązują szczególne zasady, w tym jazda z doświadczonym opiekunem przez wymagany okres oraz ważność uprawnień wyłącznie w Polsce." },
  { question: "Ile trwa kurs?", answer: "Czas zależy od kategorii, dostępności terminów, Twojej dyspozycyjności i wymaganej liczby zajęć. Zadzwoń, aby otrzymać aktualny harmonogram dla Nowego Sącza albo Bobowej." },
  { question: "Czy można płacić w ratach?", answer: "Istnieje możliwość płatności w ratach. Ostatnia rata musi zostać opłacona najpóźniej w dniu ukończenia kursu." },
  { question: "Jak mogę zarezerwować miejsce?", answer: "Na ten moment zapisy i rezerwacje prowadzimy wyłącznie telefonicznie pod numerem 606 647 396. Kalendarz zapisów online jest w przygotowaniu." },
  { question: "Czy kursy są dostępne w obu oddziałach?", answer: "Oferta jest kierowana do kursantów z Nowego Sącza i Bobowej. Dokładne miejsce teorii, praktyki i aktualną dostępność wybranej kategorii potwierdź telefonicznie." },
  { question: "Czy mogę skorzystać z dofinansowania BUR?", answer: "FUKS jest dostawcą usług w Bazie Usług Rozwojowych. Dostępność konkretnej usługi i programu wsparcia zależy od aktualnej oferty oraz warunków operatora, dlatego nie podajemy gwarantowanej wysokości dofinansowania." },
  { question: "Czy badanie psychologiczne jest zawsze potrzebne?", answer: "Nie. Badanie lekarskie dotyczy kandydatów na kierowców, natomiast badanie psychologiczne jest wymagane w określonych ścieżkach zawodowych, m.in. przy kategoriach ciężarowych i autobusowych oraz kwalifikacjach. Potwierdzimy to dla Twojego wariantu." },
  { question: "Czy mogę zapisać się bezpośrednio przez stronę?", answer: "Nie wysyłamy przez stronę formularzy z danymi osobowymi i nie pokazujemy fikcyjnych terminów. Kliknij przycisk „Zadzwoń i zapisz się”, aby porozmawiać z biurem." },
];

export const news = [
  {
    title: "Nowa Škoda Fabia dołącza do floty",
    text: "Najnowsza zapowiedź z oficjalnego profilu FUKS. Szczegóły i film znajdziesz na Facebooku.",
    image: "/images/social/nowa-skoda-fabia-facebook.jpg",
    href: "https://www.facebook.com/reel/1358855983115060/",
    label: "Aktualność",
  },
  {
    title: "Sezon motocyklowy rozpoczęty",
    text: "Szkolenia kategorii A1, A2 i A prowadzone są na placu oraz w ruchu drogowym.",
    image: "/images/social/szkolenie-motocyklowe-facebook.jpg",
    href: "https://www.facebook.com/photo.php?fbid=1468192428426493",
    label: "Motocykle",
  },
  {
    title: "Kursy na maszyny budowlane",
    text: "Oferta szkoleń zawodowych obejmuje również kursy operatorów maszyn.",
    image: "/images/social/kursy-maszyny-facebook.jpg",
    href: "https://www.facebook.com/photo.php?fbid=1502844244961311",
    label: "Szkolenia zawodowe",
  },
];
