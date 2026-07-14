"use client";

import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";

const FAQ_ITEMS = [
  {
    id: "pkk",
    question: "Czym jest PKK i kiedy jest potrzebny?",
    answer:
      "PKK, czyli Profil Kandydata na Kierowcę, identyfikuje osobę rozpoczynającą drogę do uzyskania uprawnień. Sposób jego uzyskania i wymagane załączniki zależą od kategorii oraz sytuacji kandydata — aktualne wymagania potwierdź we właściwym urzędzie lub bezpośrednio w FUKS.",
  },
  {
    id: "documents",
    question: "Jakie dokumenty przygotować przed kursem?",
    answer:
      "Nie podajemy jednej uniwersalnej listy, ponieważ wymagania mogą różnić się w zależności od kategorii i sytuacji kandydata. Przed wizytą skontaktuj się ze szkołą, aby potwierdzić aktualny zestaw dokumentów oraz kolejność formalności.",
  },
  {
    id: "duration",
    question: "Ile trwa kurs?",
    answer:
      "Czas zależy między innymi od kategorii, formalności i dostępności terminów. Na stronie nie deklarujemy sztywnego harmonogramu — orientacyjny czas realizacji konkretnego kursu potwierdzisz w rozmowie ze szkołą.",
  },
  {
    id: "installments",
    question: "Czy można zapłacić w ratach?",
    answer:
      "Możliwość płatności ratalnej, liczba rat i terminy wymagają bezpośredniego potwierdzenia w FUKS. Wariant rat widoczny w demonstracyjnej rezerwacji jest wyłącznie elementem prezentacji i nie stanowi oferty.",
  },
  {
    id: "professional",
    question: "Czy dostępne są kursy i kwalifikacje zawodowe?",
    answer:
      "Strona prezentuje ścieżki dla kategorii zawodowych i kwalifikacji. Dostępność konkretnego szkolenia, wymagania wstępne, zakres oraz najbliższe terminy należy potwierdzić bezpośrednio ze szkołą przed zapisem.",
  },
  {
    id: "booking",
    question: "Jak działa rezerwacja jazd na tej stronie?",
    answer:
      "Rezerwacja online w tym projekcie jest demonstracją interfejsu. Wybrany termin nie jest wysyłany do szkoły i nie zostaje naprawdę zarezerwowany. Rzeczywisty termin ustal telefonicznie pod numerem 606 647 396.",
  },
] as const;

export function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const sectionId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="faq"
      aria-labelledby={`${sectionId}-title`}
      className="bg-[#f4f0e7] px-4 py-20 text-[#171916] sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <div>
          <p className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#526800]">
            <span className="h-px w-8 bg-current" />
            FAQ
          </p>
          <h2
            id={`${sectionId}-title`}
            className="text-4xl font-black leading-[0.96] tracking-[-0.055em] text-balance sm:text-6xl"
          >
            Zanim ruszysz w drogę.
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-[#171916]/60">
            Najważniejsze odpowiedzi bez obietnic bez pokrycia. Szczegóły kursu i aktualne warunki zawsze potwierdź bezpośrednio ze szkołą.
          </p>
        </div>

        <div className="border-t border-[#171916]/15">
          {FAQ_ITEMS.map((item, index) => {
            const expanded = openItem === item.id;
            const triggerId = `${sectionId}-${item.id}-trigger`;
            const panelId = `${sectionId}-${item.id}-panel`;

            return (
              <div key={item.id} className="border-b border-[#171916]/15">
                <h3>
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpenItem(expanded ? null : item.id)}
                    className="group flex w-full items-center gap-4 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#526800] sm:py-7"
                  >
                    <span className="w-7 shrink-0 text-xs font-black tabular-nums text-[#171916]/35">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-lg font-black tracking-[-0.025em] sm:text-xl">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`grid size-10 shrink-0 place-items-center rounded-full border transition-colors duration-300 motion-reduce:transition-none ${
                        expanded
                          ? "border-[#c8ff33] bg-[#c8ff33] text-[#171916]"
                          : "border-[#171916]/20 group-hover:border-[#171916]/45"
                      }`}
                    >
                      {expanded ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {expanded ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0.01 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pl-11 pr-12 text-sm leading-7 text-[#171916]/65 sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
