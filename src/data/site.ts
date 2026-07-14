import type { LucideIcon } from "lucide-react";
import {
  Bike,
  BriefcaseBusiness,
  BusFront,
  CarFront,
  Tractor,
  Truck,
} from "lucide-react";

export type Course = {
  id: string;
  category: string;
  eyebrow: string;
  title: string;
  description: string;
  forWhom: string;
  icon: LucideIcon;
  professional?: boolean;
  accent: string;
};

export const courses: Course[] = [
  {
    id: "moto",
    category: "AM–A",
    eyebrow: "Dwa koła",
    title: "Motocykle",
    description: "Ścieżki AM, A1, A2 i A — dobrane do wieku oraz celu.",
    forWhom: "Dla osób, które chcą zacząć od motoroweru lub wejść na pełną kategorię A.",
    icon: Bike,
    accent: "#ff7a32",
  },
  {
    id: "b",
    category: "B",
    eyebrow: "Pierwsza niezależność",
    title: "Samochód osobowy",
    description: "Najpopularniejsza droga do samodzielnej, pewnej jazdy.",
    forWhom: "Dla początkujących i osób wracających za kierownicę po przerwie.",
    icon: CarFront,
    accent: "#c8ff33",
  },
  {
    id: "be",
    category: "B+E",
    eyebrow: "Więcej możliwości",
    title: "Auto z przyczepą",
    description: "Uprawnienia przydatne w pracy, podróży i przy cięższych zestawach.",
    forWhom: "Dla kierowców kategorii B, którzy potrzebują prowadzić zestaw z przyczepą.",
    icon: CarFront,
    accent: "#f3efe2",
  },
  {
    id: "c",
    category: "C",
    eyebrow: "Kategoria zawodowa",
    title: "Samochód ciężarowy",
    description: "Kierunek dla przyszłych i aktywnych kierowców zawodowych.",
    forWhom: "Dla posiadaczy kategorii B, którzy chcą prowadzić pojazdy ciężarowe.",
    icon: Truck,
    professional: true,
    accent: "#c8ff33",
  },
  {
    id: "ce",
    category: "C+E",
    eyebrow: "Kategoria zawodowa",
    title: "Zestaw ciężarowy",
    description: "Rozszerzenie kompetencji o ciężarówkę z naczepą lub przyczepą.",
    forWhom: "Dla kierowców kategorii C rozwijających możliwości w transporcie.",
    icon: Truck,
    professional: true,
    accent: "#ff7a32",
  },
  {
    id: "d",
    category: "D",
    eyebrow: "Kategoria zawodowa",
    title: "Autobus",
    description: "Przygotowanie do pracy w przewozie osób.",
    forWhom: "Dla kandydatów spełniających wymagania wieku, badań i posiadanych uprawnień.",
    icon: BusFront,
    professional: true,
    accent: "#7fc8ff",
  },
  {
    id: "t",
    category: "T",
    eyebrow: "Maszyny i rolnictwo",
    title: "Ciągnik rolniczy",
    description: "Uprawnienia do kierowania ciągnikiem i określonymi zestawami.",
    forWhom: "Dla osób związanych z rolnictwem, usługami komunalnymi i technicznymi.",
    icon: Tractor,
    accent: "#f3efe2",
  },
  {
    id: "kwalifikacje",
    category: "PRO",
    eyebrow: "Szkolenia zawodowe",
    title: "Kwalifikacje kierowców",
    description: "Kwalifikacje wstępne, przewóz osób i rzeczy oraz szkolenia okresowe.",
    forWhom: "Dla kierowców, którzy chcą rozpocząć lub kontynuować pracę zawodową.",
    icon: BriefcaseBusiness,
    professional: true,
    accent: "#c8ff33",
  },
];

export const courseSteps = [
  {
    number: "01",
    title: "Wybierz kierunek",
    text: "Dobierz kategorię do pojazdu, wieku i planu zawodowego. Finder na stronie podpowie dobry start.",
  },
  {
    number: "02",
    title: "Zbierz formalności",
    text: "Badanie lekarskie, zdjęcie i Profil Kandydata na Kierowcę (PKK); przy ścieżce zawodowej może być potrzebny PKZ.",
  },
  {
    number: "03",
    title: "Opanuj teorię",
    text: "Przepisy, sytuacje drogowe i świadome decyzje — nie tylko pamięciowe rozwiązywanie testów.",
  },
  {
    number: "04",
    title: "Zbuduj praktykę",
    text: "Plac manewrowy, miasto i trasy pozamiejskie, z harmonogramem ustalanym z ośrodkiem.",
  },
  {
    number: "05",
    title: "Podejdź do egzaminu",
    text: "Po egzaminie wewnętrznym przychodzi czas na sprawdzenie umiejętności w WORD.",
  },
];

export const verifiedHighlights = [
  {
    value: "4,7/5",
    label: "ocena dostawcy w BUR",
    note: "na podstawie 1814 ocen usług widocznych w profilu BUR w lipcu 2026",
  },
  {
    value: "2",
    label: "lokalizacje szkolenia w Nowym Sączu",
    note: "w aktualnej karcie kat. C: Grodzka 39A i plac przy Grottgera 53",
  },
  {
    value: "AM–T",
    label: "szeroki zakres uprawnień",
    note: "zakres wpisu dostawcy opublikowany w Bazie Usług Rozwojowych",
  },
];

export const contact = {
  phoneDisplay: "606 647 396",
  phoneHref: "tel:+48606647396",
  office: "ul. Grodzka 39A, 33-300 Nowy Sącz",
  trainingGround: "ul. Grottgera 53, Nowy Sącz",
  facebook: "https://www.facebook.com/fuks.krzysztofgron",
  maps: "https://www.google.com/maps/search/?api=1&query=Grodzka+39A+Nowy+Sacz",
};
