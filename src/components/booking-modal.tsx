"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Bike,
  BriefcaseBusiness,
  Bus,
  CalendarDays,
  Car,
  Check,
  CircleCheck,
  Clock,
  CreditCard,
  Landmark,
  LoaderCircle,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tractor,
  Truck,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";

export type BookingOpenDetail = {
  category?: string;
};

type CategoryId = "A" | "B" | "B+E" | "C" | "C+E" | "D" | "T" | "Kwalifikacje";
type ServiceId = "full-course" | "extra-driving" | "consultation";
type PaymentId = "blik" | "card" | "transfer" | "on-site" | "installments";

type ContactData = {
  name: string;
  phone: string;
  email: string;
};

type ContactErrors = Partial<Record<keyof ContactData, string>>;

type ChoiceCardProps = {
  checked: boolean;
  description: string;
  icon: LucideIcon;
  id: string;
  name: string;
  onChange: () => void;
  title: string;
  value: string;
  badge?: string;
};

const DEMO_NOTICE =
  "Wersja demonstracyjna — termin nie zostanie naprawdę zarezerwowany.";

const STEPS = [
  { short: "Kategoria", title: "Jaki kurs Cię interesuje?" },
  { short: "Usługa", title: "Wybierz rodzaj usługi" },
  { short: "Data", title: "Wybierz przykładowy dzień" },
  { short: "Godzina", title: "Wybierz dogodną godzinę" },
  { short: "Kontakt", title: "Jak możemy się z Tobą skontaktować?" },
  { short: "Podsumowanie", title: "Sprawdź szczegóły" },
  { short: "Płatność", title: "Wybierz metodę płatności demo" },
  { short: "Gotowe", title: "Prezentacja zakończona" },
] as const;

const CATEGORIES: ReadonlyArray<{
  id: CategoryId;
  name: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    id: "B",
    name: "Kategoria B",
    description: "Samochód osobowy",
    icon: Car,
  },
  {
    id: "A",
    name: "Kategoria A",
    description: "Motocykl",
    icon: Bike,
  },
  {
    id: "B+E",
    name: "Kategoria B+E",
    description: "Samochód z przyczepą",
    icon: Car,
  },
  {
    id: "C",
    name: "Kategoria C",
    description: "Samochód ciężarowy",
    icon: Truck,
  },
  {
    id: "C+E",
    name: "Kategoria C+E",
    description: "Zespół pojazdów",
    icon: Truck,
  },
  {
    id: "D",
    name: "Kategoria D",
    description: "Autobus",
    icon: Bus,
  },
  {
    id: "T",
    name: "Kategoria T",
    description: "Ciągnik rolniczy",
    icon: Tractor,
  },
  {
    id: "Kwalifikacje",
    name: "Kwalifikacje zawodowe",
    description: "Szkolenia dla kierowców zawodowych",
    icon: BriefcaseBusiness,
  },
];

const SERVICES: ReadonlyArray<{
  id: ServiceId;
  name: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
}> = [
  {
    id: "full-course",
    name: "Kurs pełny",
    description: "Przykładowy pakiet teorii i zajęć praktycznych.",
    icon: Sparkles,
    badge: "Najczęściej wybierany",
  },
  {
    id: "extra-driving",
    name: "Jazda doszkalająca",
    description: "Demonstracyjna rezerwacja dodatkowej jazdy.",
    icon: Car,
  },
  {
    id: "consultation",
    name: "Konsultacja startowa",
    description: "Krótka rozmowa o formalnościach i przebiegu kursu.",
    icon: UserRound,
  },
];

const DEMO_DATES = [
  {
    id: "2026-07-15",
    weekday: "Śr",
    day: "15",
    month: "lip",
    full: "środa, 15 lipca 2026",
    available: true,
  },
  {
    id: "2026-07-16",
    weekday: "Czw",
    day: "16",
    month: "lip",
    full: "czwartek, 16 lipca 2026",
    available: false,
  },
  {
    id: "2026-07-17",
    weekday: "Pt",
    day: "17",
    month: "lip",
    full: "piątek, 17 lipca 2026",
    available: true,
  },
  {
    id: "2026-07-18",
    weekday: "Sob",
    day: "18",
    month: "lip",
    full: "sobota, 18 lipca 2026",
    available: true,
  },
  {
    id: "2026-07-20",
    weekday: "Pon",
    day: "20",
    month: "lip",
    full: "poniedziałek, 20 lipca 2026",
    available: false,
  },
  {
    id: "2026-07-21",
    weekday: "Wt",
    day: "21",
    month: "lip",
    full: "wtorek, 21 lipca 2026",
    available: true,
  },
] as const;

const TIME_SLOTS = [
  { value: "08:00", available: true },
  { value: "09:30", available: false },
  { value: "11:00", available: true },
  { value: "12:30", available: true },
  { value: "14:00", available: false },
  { value: "15:30", available: true },
  { value: "17:00", available: true },
  { value: "18:30", available: true },
] as const;

const PAYMENT_METHODS: ReadonlyArray<{
  id: PaymentId;
  name: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    id: "blik",
    name: "BLIK",
    description: "Bez podawania kodu — wyłącznie demonstracja.",
    icon: Smartphone,
  },
  {
    id: "card",
    name: "Karta",
    description: "Bez numeru karty, daty ważności ani CVV.",
    icon: CreditCard,
  },
  {
    id: "transfer",
    name: "Szybki przelew",
    description: "Nie nastąpi przekierowanie do banku.",
    icon: Landmark,
  },
  {
    id: "on-site",
    name: "Płatność na miejscu",
    description: "Przykładowy wybór płatności w biurze.",
    icon: Banknote,
  },
  {
    id: "installments",
    name: "Raty",
    description: "Przykładowa opcja — warunki ustalane indywidualnie.",
    icon: CreditCard,
  },
];

const primaryButtonClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#dfff00] px-6 text-sm font-extrabold tracking-[-0.01em] text-[#0b0c0e] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#edff70] hover:shadow-[0_12px_35px_rgba(223,255,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfff00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111316] disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/35 disabled:shadow-none motion-reduce:transform-none";

const secondaryButtonClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 text-sm font-bold text-white transition-colors hover:border-white/30 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfff00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111316] disabled:cursor-not-allowed disabled:opacity-40";

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function resolveCategoryId(value?: string): CategoryId | null {
  if (!value) return null;

  const normalized = value
    .toLocaleUpperCase("pl-PL")
    .replace(/KATEGORIA|KAT\.?/g, "")
    .replace(/[\s_-]/g, "");

  if (normalized === "CE" || normalized === "C+E") return "C+E";
  if (normalized === "BE" || normalized === "B+E") return "B+E";
  if (normalized === "PRO" || normalized === "KWALIFIKACJE") return "Kwalifikacje";

  return (
    CATEGORIES.find(
      (category) => category.id.toLocaleUpperCase("pl-PL") === normalized,
    )?.id ?? null
  );
}

function ChoiceCard({
  badge,
  checked,
  description,
  icon: Icon,
  id,
  name,
  onChange,
  title,
  value,
}: ChoiceCardProps) {
  return (
    <label className="group relative block h-full cursor-pointer">
      <input
        checked={checked}
        className="peer sr-only"
        id={id}
        name={name}
        onChange={onChange}
        type="radio"
        value={value}
      />
      <span className="relative flex h-full min-h-32 flex-col overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5 transition-[border-color,background-color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:border-white/25 group-hover:bg-white/[0.055] peer-checked:border-[#dfff00]/80 peer-checked:bg-[#dfff00]/[0.08] peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[#dfff00] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#111316] motion-reduce:transform-none">
        <span className="mb-5 flex items-start justify-between gap-3">
          <span
            className={cx(
              "grid size-10 shrink-0 place-items-center rounded-full border transition-colors",
              checked
                ? "border-[#dfff00]/50 bg-[#dfff00] text-[#0b0c0e]"
                : "border-white/10 bg-white/[0.06] text-white/70",
            )}
          >
            <Icon aria-hidden="true" className="size-[1.15rem]" strokeWidth={1.8} />
          </span>
          {badge ? (
            <span className="rounded-full bg-[#dfff00]/10 px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.12em] text-[#dfff00]">
              {badge}
            </span>
          ) : null}
          <span
            aria-hidden="true"
            className={cx(
              "ml-auto grid size-6 shrink-0 place-items-center rounded-full border transition-colors",
              checked
                ? "border-[#dfff00] bg-[#dfff00] text-black"
                : "border-white/20 text-transparent",
            )}
          >
            <Check className="size-3.5" strokeWidth={3} />
          </span>
        </span>
        <span className="text-base font-extrabold tracking-[-0.02em] text-white">
          {title}
        </span>
        <span className="mt-1 text-sm leading-5 text-white/50">{description}</span>
      </span>
    </label>
  );
}

function SummaryRow({
  actionLabel,
  children,
  icon: Icon,
  onEdit,
  title,
}: {
  actionLabel: string;
  children: ReactNode;
  icon: LucideIcon;
  onEdit: () => void;
  title: string;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-white/10 py-4 first:pt-0 last:border-b-0 last:pb-0">
      <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full bg-white/[0.06] text-[#dfff00]">
        <Icon aria-hidden="true" className="size-[1.1rem]" strokeWidth={1.8} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/35">
          {title}
        </span>
        <span className="mt-1 block text-sm font-semibold leading-5 text-white/85">
          {children}
        </span>
      </span>
      <button
        aria-label={actionLabel}
        className="rounded-full px-2 py-1 text-xs font-bold text-[#dfff00] underline-offset-4 transition-colors hover:text-[#edff70] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfff00]"
        onClick={onEdit}
        type="button"
      >
        Zmień
      </button>
    </div>
  );
}

/**
 * Otwiera modal przez zdarzenie używane przez przyciski CTA na stronie.
 * Funkcję wywołuj wyłącznie po stronie klienta.
 */
export function openBookingModal(category?: string) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<BookingOpenDetail>("fuks:open-booking", {
      detail: category ? { category } : {},
    }),
  );
}

export function BookingModal() {
  const dialogTitleId = useId();
  const dialogDescriptionId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const stepTitleRef = useRef<HTMLHeadingElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const paymentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [categoryId, setCategoryId] = useState<CategoryId | null>(null);
  const [serviceId, setServiceId] = useState<ServiceId | null>(null);
  const [dateId, setDateId] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [contact, setContact] = useState<ContactData>({
    name: "",
    phone: "",
    email: "",
  });
  const [contactErrors, setContactErrors] = useState<ContactErrors>({});
  const [paymentId, setPaymentId] = useState<PaymentId | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedCategory = useMemo(
    () => CATEGORIES.find((category) => category.id === categoryId),
    [categoryId],
  );
  const selectedService = useMemo(
    () => SERVICES.find((service) => service.id === serviceId),
    [serviceId],
  );
  const selectedDate = useMemo(
    () => DEMO_DATES.find((date) => date.id === dateId),
    [dateId],
  );
  const selectedPayment = useMemo(
    () => PAYMENT_METHODS.find((method) => method.id === paymentId),
    [paymentId],
  );

  const resetFlow = useCallback(() => {
    if (paymentTimerRef.current) {
      clearTimeout(paymentTimerRef.current);
      paymentTimerRef.current = null;
    }
    setStep(0);
    setCategoryId(null);
    setServiceId(null);
    setDateId(null);
    setTime(null);
    setContact({ name: "", phone: "", email: "" });
    setContactErrors({});
    setPaymentId(null);
    setIsProcessing(false);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      resetFlow();
      resetTimerRef.current = null;
    }, 320);
  }, [resetFlow]);

  useEffect(() => {
    const handleOpen = (event: Event) => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }

      resetFlow();
      const customEvent = event as CustomEvent<BookingOpenDetail>;
      const category = resolveCategoryId(customEvent.detail?.category);
      if (category) setCategoryId(category);
      setIsOpen(true);
    };

    window.addEventListener("fuks:open-booking", handleOpen);
    return () => window.removeEventListener("fuks:open-booking", handleOpen);
  }, [resetFlow]);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      if (paymentTimerRef.current) clearTimeout(paymentTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const overlay = overlayRef.current;
    const backgroundElements = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element !== overlay,
    );
    const backgroundState = backgroundElements.map((element) => ({
      element,
      inert: element.inert,
      ariaHidden: element.getAttribute("aria-hidden"),
    }));

    backgroundElements.forEach((element) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("hidden"));

      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const hasActiveFocusable = activeElement ? focusable.includes(activeElement) : false;

      if (event.shiftKey && (!hasActiveFocusable || activeElement === first)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (!hasActiveFocusable || activeElement === last)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      backgroundState.forEach(({ element, inert, ariaHidden }) => {
        element.inert = inert;
        if (ariaHidden === null) element.removeAttribute("aria-hidden");
        else element.setAttribute("aria-hidden", ariaHidden);
      });
      previouslyFocusedRef.current?.focus({ preventScroll: true });
    };
  }, [closeModal, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const animationFrame = requestAnimationFrame(() => {
      stepTitleRef.current?.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [isOpen, step]);

  const updateContact = (field: keyof ContactData, value: string) => {
    setContact((current) => ({ ...current, [field]: value }));
    setContactErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validateContact = () => {
    const errors: ContactErrors = {};
    const normalizedPhone = contact.phone.replace(/\D/g, "").replace(/^48(?=\d{9}$)/, "");

    if (contact.name.trim().length < 3 || /\d/.test(contact.name)) {
      errors.name = "Wpisz imię i nazwisko lub nazwę kontaktu (min. 3 znaki).";
    }
    if (!/^\d{9}$/.test(normalizedPhone)) {
      errors.phone = "Wpisz poprawny 9-cyfrowy numer telefonu.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact.email.trim())) {
      errors.email = "Wpisz poprawny adres e-mail.";
    }

    setContactErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstInvalidField = ["name", "phone", "email"].find(
        (field) => errors[field as keyof ContactData],
      );
      requestAnimationFrame(() => {
        if (firstInvalidField) {
          document.getElementById(`booking-${firstInvalidField}`)?.focus();
        }
      });
      return false;
    }

    return true;
  };

  const canContinue =
    (step === 0 && categoryId !== null) ||
    (step === 1 && serviceId !== null) ||
    (step === 2 && dateId !== null) ||
    (step === 3 && time !== null) ||
    step === 4 ||
    step === 5 ||
    (step === 6 && paymentId !== null);

  const goBack = () => {
    if (isProcessing) return;
    setStep((current) => Math.max(0, current - 1));
  };

  const goNext = () => {
    if (step === 4 && !validateContact()) return;
    if (!canContinue) return;

    if (step === 6) {
      setIsProcessing(true);
      paymentTimerRef.current = setTimeout(() => {
        setIsProcessing(false);
        setStep(7);
        paymentTimerRef.current = null;
      }, shouldReduceMotion ? 250 : 1050);
      return;
    }

    setStep((current) => Math.min(7, current + 1));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    goNext();
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <fieldset>
            <legend className="sr-only">Wybierz kategorię prawa jazdy</legend>
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="max-w-xl text-sm leading-6 text-white/50">
                Poniższe warianty służą wyłącznie do prezentacji ścieżki rezerwacji.
              </p>
              <span className="hidden shrink-0 rounded-full border border-white/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/40 sm:inline-flex">
                wybór demo
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {CATEGORIES.map((category) => (
                <ChoiceCard
                  checked={categoryId === category.id}
                  description={category.description}
                  icon={category.icon}
                  id={`booking-category-${category.id.replace("+", "-")}`}
                  key={category.id}
                  name="booking-category"
                  onChange={() => setCategoryId(category.id)}
                  title={category.name}
                  value={category.id}
                />
              ))}
            </div>
          </fieldset>
        );

      case 1:
        return (
          <fieldset>
            <legend className="sr-only">Wybierz rodzaj usługi</legend>
            <p className="mb-5 text-sm leading-6 text-white/50">
              Wybrana kategoria: {selectedCategory?.name}. Szczegółowy zakres i cena
              są ustalane podczas kontaktu.
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              {SERVICES.map((service) => (
                <ChoiceCard
                  badge={service.badge}
                  checked={serviceId === service.id}
                  description={service.description}
                  icon={service.icon}
                  id={`booking-service-${service.id}`}
                  key={service.id}
                  name="booking-service"
                  onChange={() => setServiceId(service.id)}
                  title={service.name}
                  value={service.id}
                />
              ))}
            </div>
          </fieldset>
        );

      case 2:
        return (
          <fieldset>
            <legend className="sr-only">Wybierz przykładową datę</legend>
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#dfff00]">
                  Lipiec 2026 · terminy demo
                </p>
                <p className="mt-2 text-sm leading-6 text-white/50">
                  Dostępność jest przykładowa i nie pochodzi z systemu szkoły.
                </p>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/45" aria-label="Legenda terminów">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-white/45" aria-hidden="true" />
                  dostępny
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-white/15" aria-hidden="true" />
                  zajęty
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#dfff00]" aria-hidden="true" />
                  wybrany
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {DEMO_DATES.map((date) => {
                const isSelected = dateId === date.id;
                return (
                  <button
                    aria-label={`${date.full}, ${date.available ? (isSelected ? "wybrany" : "dostępny") : "zajęty"}`}
                    aria-pressed={isSelected}
                    className={cx(
                      "relative flex min-h-28 flex-col items-center justify-center rounded-[1.2rem] border p-3 text-center transition-[border-color,background-color,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfff00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111316] motion-reduce:transform-none",
                      isSelected &&
                        "border-[#dfff00] bg-[#dfff00] text-[#0b0c0e] shadow-[0_12px_32px_rgba(223,255,0,0.12)]",
                      !isSelected &&
                        date.available &&
                        "border-white/12 bg-white/[0.04] text-white hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.07]",
                      !date.available &&
                        "cursor-not-allowed border-white/[0.05] bg-white/[0.015] text-white/20 line-through",
                    )}
                    disabled={!date.available}
                    key={date.id}
                    onClick={() => setDateId(date.id)}
                    type="button"
                  >
                    <span className="text-[0.65rem] font-bold uppercase tracking-[0.13em] opacity-60">
                      {date.weekday}
                    </span>
                    <span className="my-0.5 text-3xl font-black tracking-[-0.05em]">
                      {date.day}
                    </span>
                    <span className="text-xs font-semibold uppercase opacity-55">{date.month}</span>
                    {isSelected ? (
                      <CircleCheck
                        aria-hidden="true"
                        className="absolute right-2 top-2 size-4"
                        strokeWidth={2.5}
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </fieldset>
        );

      case 3:
        return (
          <fieldset>
            <legend className="sr-only">Wybierz przykładową godzinę</legend>
            <div className="mb-5 flex items-center gap-3 rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#dfff00]/10 text-[#dfff00]">
                <CalendarDays aria-hidden="true" className="size-[1.1rem]" />
              </span>
              <span>
                <span className="block text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/35">
                  Wybrany dzień
                </span>
                <span className="mt-0.5 block text-sm font-bold text-white">
                  {selectedDate?.full}
                </span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {TIME_SLOTS.map((slot) => {
                const isSelected = time === slot.value;
                return (
                  <button
                    aria-label={`${slot.value}, ${slot.available ? (isSelected ? "wybrana" : "dostępna") : "zajęta"}`}
                    aria-pressed={isSelected}
                    className={cx(
                      "relative flex min-h-16 items-center justify-center gap-2 rounded-[1rem] border px-4 text-base font-extrabold transition-[border-color,background-color,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfff00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111316] motion-reduce:transform-none",
                      isSelected && "border-[#dfff00] bg-[#dfff00] text-black",
                      !isSelected &&
                        slot.available &&
                        "border-white/10 bg-white/[0.035] text-white hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.065]",
                      !slot.available &&
                        "cursor-not-allowed border-white/[0.05] bg-white/[0.015] text-white/20 line-through",
                    )}
                    disabled={!slot.available}
                    key={slot.value}
                    onClick={() => setTime(slot.value)}
                    type="button"
                  >
                    <Clock aria-hidden="true" className="size-4" strokeWidth={1.8} />
                    {slot.value}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-xs leading-5 text-white/35">
              Godziny są lokalnymi danymi testowymi. Wybór nie blokuje terminu.
            </p>
          </fieldset>
        );

      case 4:
        return (
          <div>
            <div className="mb-6 flex items-start gap-3 rounded-[1.2rem] border border-[#dfff00]/15 bg-[#dfff00]/[0.05] p-4">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-[#dfff00]"
              />
              <p className="text-sm leading-5 text-white/60">
                Dane pozostają wyłącznie w pamięci tej strony i nie są nigdzie wysyłane.
                Znikną po odświeżeniu.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-white/55"
                  htmlFor="booking-name"
                >
                  Imię i nazwisko
                </label>
                <input
                  aria-describedby={contactErrors.name ? "booking-name-error" : undefined}
                  aria-invalid={Boolean(contactErrors.name)}
                  autoComplete="name"
                  className="min-h-13 w-full rounded-2xl border border-white/12 bg-white/[0.045] px-4 text-base text-white outline-none transition-[border-color,box-shadow] placeholder:text-white/25 focus:border-[#dfff00]/70 focus:ring-4 focus:ring-[#dfff00]/10"
                  id="booking-name"
                  onChange={(event) => updateContact("name", event.target.value)}
                  placeholder="np. Anna Kowalska"
                  type="text"
                  value={contact.name}
                />
                {contactErrors.name ? (
                  <p className="mt-2 text-xs font-semibold text-[#ff9b82]" id="booking-name-error" role="alert">
                    {contactErrors.name}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-white/55"
                  htmlFor="booking-phone"
                >
                  Telefon
                </label>
                <input
                  aria-describedby={contactErrors.phone ? "booking-phone-error" : undefined}
                  aria-invalid={Boolean(contactErrors.phone)}
                  autoComplete="tel"
                  className="min-h-13 w-full rounded-2xl border border-white/12 bg-white/[0.045] px-4 text-base text-white outline-none transition-[border-color,box-shadow] placeholder:text-white/25 focus:border-[#dfff00]/70 focus:ring-4 focus:ring-[#dfff00]/10"
                  id="booking-phone"
                  inputMode="tel"
                  onChange={(event) => updateContact("phone", event.target.value)}
                  placeholder="600 000 000"
                  type="tel"
                  value={contact.phone}
                />
                {contactErrors.phone ? (
                  <p className="mt-2 text-xs font-semibold text-[#ff9b82]" id="booking-phone-error" role="alert">
                    {contactErrors.phone}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-white/55"
                  htmlFor="booking-email"
                >
                  E-mail
                </label>
                <input
                  aria-describedby={contactErrors.email ? "booking-email-error" : undefined}
                  aria-invalid={Boolean(contactErrors.email)}
                  autoComplete="email"
                  className="min-h-13 w-full rounded-2xl border border-white/12 bg-white/[0.045] px-4 text-base text-white outline-none transition-[border-color,box-shadow] placeholder:text-white/25 focus:border-[#dfff00]/70 focus:ring-4 focus:ring-[#dfff00]/10"
                  id="booking-email"
                  inputMode="email"
                  onChange={(event) => updateContact("email", event.target.value)}
                  placeholder="anna@example.pl"
                  type="email"
                  value={contact.email}
                />
                {contactErrors.email ? (
                  <p className="mt-2 text-xs font-semibold text-[#ff9b82]" id="booking-email-error" role="alert">
                    {contactErrors.email}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="grid gap-4 lg:grid-cols-[1fr_0.78fr]">
            <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.035] p-5 sm:p-6">
              <SummaryRow
                actionLabel="Zmień kategorię"
                icon={selectedCategory?.icon ?? Car}
                onEdit={() => setStep(0)}
                title="Kategoria"
              >
                {selectedCategory?.name} · {selectedCategory?.description}
              </SummaryRow>
              <SummaryRow
                actionLabel="Zmień usługę"
                icon={Sparkles}
                onEdit={() => setStep(1)}
                title="Usługa"
              >
                {selectedService?.name}
              </SummaryRow>
              <SummaryRow
                actionLabel="Zmień datę"
                icon={CalendarDays}
                onEdit={() => setStep(2)}
                title="Termin demonstracyjny"
              >
                {selectedDate?.full}, godz. {time}
              </SummaryRow>
              <SummaryRow
                actionLabel="Zmień dane kontaktowe"
                icon={UserRound}
                onEdit={() => setStep(4)}
                title="Kontakt"
              >
                {contact.name}
                <span className="block font-normal text-white/45">
                  {contact.phone} · {contact.email}
                </span>
              </SummaryRow>
            </div>
            <div className="relative overflow-hidden rounded-[1.4rem] bg-[#dfff00] p-6 text-[#0b0c0e]">
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-16 size-44 rounded-full border-[28px] border-black/[0.06]"
              />
              <span className="relative text-[0.65rem] font-black uppercase tracking-[0.16em] opacity-50">
                Wycena
              </span>
              <p className="relative mt-3 text-2xl font-black leading-tight tracking-[-0.04em]">
                Cena ustalana indywidualnie
              </p>
              <p className="relative mt-4 text-sm leading-5 opacity-65">
                Modal nie prezentuje fikcyjnej ceny jako prawdziwej oferty firmy.
              </p>
              <div className="relative mt-7 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.1em]">
                Dalej: płatność demo
                <ArrowRight aria-hidden="true" className="size-4" />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <fieldset disabled={isProcessing}>
            <legend className="sr-only">Wybierz demonstracyjną metodę płatności</legend>
            <div className="mb-5 flex items-start gap-3 rounded-[1.2rem] border border-[#dfff00]/15 bg-[#dfff00]/[0.05] p-4">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-[#dfff00]"
              />
              <p className="text-sm leading-5 text-white/60">
                Nie podawaj danych karty ani kodu BLIK. Żaden operator płatności nie
                jest podłączony.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {PAYMENT_METHODS.map((method) => (
                <ChoiceCard
                  checked={paymentId === method.id}
                  description={method.description}
                  icon={method.icon}
                  id={`booking-payment-${method.id}`}
                  key={method.id}
                  name="booking-payment"
                  onChange={() => setPaymentId(method.id)}
                  title={method.name}
                  value={method.id}
                />
              ))}
            </div>
            {isProcessing ? (
              <div
                aria-live="assertive"
                className="absolute inset-0 z-20 grid place-items-center bg-[#111316]/88 px-6 text-center backdrop-blur-sm"
                role="status"
              >
                <div>
                  <motion.div
                    animate={shouldReduceMotion ? undefined : { rotate: 360 }}
                    className="mx-auto grid size-16 place-items-center rounded-full border border-[#dfff00]/30 bg-[#dfff00]/10 text-[#dfff00]"
                    transition={{ duration: 0.9, ease: "linear", repeat: Infinity }}
                  >
                    <LoaderCircle aria-hidden="true" className="size-8" />
                  </motion.div>
                  <p className="mt-5 text-lg font-extrabold tracking-[-0.02em] text-white">
                    Symulujemy płatność…
                  </p>
                  <p className="mt-2 text-sm text-white/45">Nic nie jest wysyłane ani pobierane.</p>
                </div>
              </div>
            ) : null}
          </fieldset>
        );

      case 7:
        return (
          <div className="flex min-h-[24rem] flex-col items-center justify-center py-4 text-center sm:py-8">
            <div className="relative">
              {!shouldReduceMotion ? (
                <>
                  <motion.span
                    animate={{ opacity: [0, 0.75, 0], scale: [0.7, 1.55] }}
                    className="absolute inset-0 rounded-full border border-[#dfff00]"
                    transition={{ duration: 1.4, ease: "easeOut" }}
                  />
                  <motion.span
                    animate={{ opacity: [0, 0.4, 0], scale: [0.6, 2] }}
                    className="absolute inset-0 rounded-full border border-[#dfff00]"
                    transition={{ delay: 0.15, duration: 1.6, ease: "easeOut" }}
                  />
                </>
              ) : null}
              <motion.span
                animate={shouldReduceMotion ? undefined : { scale: [0.5, 1.08, 1] }}
                className="relative grid size-24 place-items-center rounded-full bg-[#dfff00] text-black shadow-[0_20px_70px_rgba(223,255,0,0.18)]"
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <Check aria-hidden="true" className="size-11" strokeWidth={2.5} />
              </motion.span>
            </div>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.22, duration: 0.45 }}
            >
              <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-[#dfff00]">
                Koniec demonstracji
              </p>
              <h3 className="mx-auto mt-3 max-w-lg text-3xl font-black leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl">
                Tak wyglądałoby potwierdzenie rezerwacji
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/50">
                {selectedCategory?.name} · {selectedService?.name}
                <br />
                {selectedDate?.full}, godz. {time}
              </p>
              <div className="mx-auto mt-6 max-w-xl rounded-[1.2rem] border border-[#dfff00]/20 bg-[#dfff00]/[0.06] p-4 text-left">
                <p className="text-sm font-bold leading-5 text-white">{DEMO_NOTICE}</p>
                <p className="mt-2 text-sm leading-5 text-[#dfff00]">
                  To jest prezentacja. Żadna płatność nie została wykonana.
                </p>
                <p className="mt-2 text-xs leading-5 text-white/35">
                  Wybrana metoda: {selectedPayment?.name}. Dane kontaktowe nie zostały wysłane.
                </p>
              </div>
              <button className={cx(primaryButtonClass, "mt-7")} onClick={closeModal} type="button">
                Zamknij prezentację
                <X aria-hidden="true" className="size-4" />
              </button>
            </motion.div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-0 backdrop-blur-md sm:items-center sm:p-5"
          exit={{ opacity: 0 }}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          ref={overlayRef}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.2 }}
        >
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-describedby={dialogDescriptionId}
            aria-labelledby={dialogTitleId}
            aria-modal="true"
            className="relative flex h-[100dvh] w-full max-w-[72rem] overflow-hidden bg-[#111316] text-white shadow-[0_40px_140px_rgba(0,0,0,0.7)] outline-none sm:h-[min(48rem,calc(100dvh-2.5rem))] sm:rounded-[2rem] sm:border sm:border-white/10 lg:grid lg:grid-cols-[17rem_1fr]"
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 16 }}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98, y: 20 }}
            ref={dialogRef}
            role="dialog"
            tabIndex={-1}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:48px_48px]"
            />
            <aside className="relative hidden overflow-hidden border-r border-white/10 bg-[#0b0c0e] p-7 lg:flex lg:flex-col">
              <div
                aria-hidden="true"
                className="absolute -left-32 bottom-20 h-28 w-[34rem] -rotate-[28deg] border-y border-[#dfff00]/15 bg-[#dfff00]/[0.025]"
              />
              <div className="relative flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-[#dfff00] text-base font-black text-black">
                  F
                </span>
                <span>
                  <span className="block text-sm font-black tracking-[0.06em]">FUKS</span>
                  <span className="block text-[0.6rem] font-bold uppercase tracking-[0.17em] text-white/35">
                    Rezerwacja demo
                  </span>
                </span>
              </div>

              <nav aria-label="Postęp rezerwacji" className="relative my-auto py-6">
                <ol className="space-y-1.5">
                  {STEPS.map((item, index) => {
                    const isCurrent = index === step;
                    const isComplete = index < step;
                    return (
                      <li
                        aria-current={isCurrent ? "step" : undefined}
                        className={cx(
                          "flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm transition-colors",
                          isCurrent && "bg-white/[0.06] text-white",
                          !isCurrent && !isComplete && "text-white/28",
                          isComplete && "text-white/55",
                        )}
                        key={item.short}
                      >
                        <span
                          className={cx(
                            "grid size-7 shrink-0 place-items-center rounded-full border text-[0.68rem] font-black",
                            isCurrent && "border-[#dfff00] bg-[#dfff00] text-black",
                            isComplete && "border-[#dfff00]/45 bg-[#dfff00]/10 text-[#dfff00]",
                            !isCurrent && !isComplete && "border-white/10",
                          )}
                        >
                          {isComplete ? (
                            <Check aria-hidden="true" className="size-3.5" strokeWidth={2.8} />
                          ) : (
                            index + 1
                          )}
                        </span>
                        <span className="font-semibold">{item.short}</span>
                      </li>
                    );
                  })}
                </ol>
              </nav>

              <div className="relative rounded-[1.2rem] border border-white/10 bg-white/[0.035] p-4">
                <p className="text-[0.62rem] font-black uppercase tracking-[0.15em] text-[#dfff00]">
                  Bez zobowiązań
                </p>
                <p className="mt-2 text-xs leading-5 text-white/40">
                  Proces działa lokalnie. Niczego nie zapisujemy i nic nie pobieramy.
                </p>
              </div>
            </aside>

            <form className="relative flex min-h-0 flex-1 flex-col" onSubmit={handleSubmit}>
              <header className="shrink-0 border-b border-white/10 px-5 pb-4 pt-5 sm:px-8 sm:pb-5 sm:pt-7 lg:px-10">
                <div className="mb-4 flex items-center gap-4 pr-12">
                  <span className="text-[0.65rem] font-black uppercase tracking-[0.15em] text-[#dfff00]">
                    Krok {step + 1}/{STEPS.length} · {STEPS[step].short}
                  </span>
                  <div
                    aria-label={`Postęp: krok ${step + 1} z ${STEPS.length}`}
                    aria-valuemax={STEPS.length}
                    aria-valuemin={1}
                    aria-valuenow={step + 1}
                    className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
                    role="progressbar"
                  >
                    <motion.div
                      animate={{ width: `${progress}%` }}
                      className="h-full rounded-full bg-[#dfff00]"
                      transition={{ duration: shouldReduceMotion ? 0.01 : 0.35, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <h2
                  className="max-w-2xl text-2xl font-black leading-[1.08] tracking-[-0.04em] text-white outline-none sm:text-3xl"
                  id={dialogTitleId}
                  ref={stepTitleRef}
                  tabIndex={-1}
                >
                  {STEPS[step].title}
                </h2>
                <div
                  className="mt-4 flex items-start gap-2.5 rounded-xl border border-[#dfff00]/15 bg-[#dfff00]/[0.045] px-3.5 py-3 text-xs leading-5 text-white/55"
                  id={dialogDescriptionId}
                >
                  <ShieldCheck
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-[#dfff00]"
                  />
                  <span>{DEMO_NOTICE}</span>
                </div>
              </header>

              <button
                aria-label="Zamknij rezerwację"
                className="absolute right-4 top-4 z-30 grid size-10 place-items-center rounded-full border border-white/10 bg-[#111316]/80 text-white/60 backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfff00] sm:right-6 sm:top-6"
                onClick={closeModal}
                type="button"
              >
                <X aria-hidden="true" className="size-[1.1rem]" />
              </button>

              <div className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 [scrollbar-color:rgba(255,255,255,.18)_transparent] sm:px-8 sm:py-7 lg:px-10">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    animate={{ opacity: 1, x: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
                    key={step}
                    transition={{ duration: shouldReduceMotion ? 0.01 : 0.22, ease: "easeOut" }}
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {step < 7 ? (
                <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 bg-[#111316]/95 px-5 py-4 backdrop-blur-md sm:px-8 lg:px-10">
                  {step > 0 ? (
                    <button
                      aria-label="Wróć do poprzedniego kroku"
                      className={secondaryButtonClass}
                      disabled={isProcessing}
                      onClick={goBack}
                      type="button"
                    >
                      <ArrowLeft aria-hidden="true" className="size-4" />
                      <span className="hidden sm:inline">Wstecz</span>
                    </button>
                  ) : (
                    <button className={secondaryButtonClass} onClick={closeModal} type="button">
                      Anuluj
                    </button>
                  )}
                  <p className="hidden text-center text-[0.68rem] leading-4 text-white/30 md:block">
                    Dane nie opuszczają przeglądarki.
                  </p>
                  <button
                    className={primaryButtonClass}
                    disabled={!canContinue || isProcessing}
                    type="submit"
                  >
                    {step === 6 ? "Zapłać demonstracyjnie" : "Dalej"}
                    {isProcessing ? (
                      <LoaderCircle aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none" />
                    ) : (
                      <ArrowRight aria-hidden="true" className="size-4" />
                    )}
                  </button>
                </footer>
              ) : null}
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default BookingModal;
