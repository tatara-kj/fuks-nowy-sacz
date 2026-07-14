"use client";

import {
  Bike,
  BriefcaseBusiness,
  BusFront,
  CarFront,
  Check,
  ChevronRight,
  CircleGauge,
  Route,
  Tractor,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { BookingButton, type BookingCategory } from "./booking-button";

type Goal = "na-co-dzien" | "do-pracy" | "rozszerzenie";
type Vehicle =
  | "motocykl"
  | "samochod"
  | "samochod-przyczepa"
  | "ciezarowka"
  | "ciezarowka-przyczepa"
  | "autobus"
  | "ciagnik"
  | "kwalifikacje";

interface Choice<T extends string> {
  id: T;
  label: string;
  description: string;
  icon: LucideIcon;
}

interface Recommendation {
  category: BookingCategory;
  title: string;
  description: string;
}

const GOALS: readonly Choice<Goal>[] = [
  {
    id: "na-co-dzien",
    label: "Na co dzień",
    description: "Mobilność prywatna",
    icon: CircleGauge,
  },
  {
    id: "do-pracy",
    label: "Do pracy",
    description: "Ścieżka zawodowa",
    icon: BriefcaseBusiness,
  },
  {
    id: "rozszerzenie",
    label: "Rozszerzam uprawnienia",
    description: "Kolejna kategoria",
    icon: Route,
  },
] as const;

const VEHICLES: readonly Choice<Vehicle>[] = [
  {
    id: "motocykl",
    label: "Motocykl",
    description: "Kategoria A",
    icon: Bike,
  },
  {
    id: "samochod",
    label: "Samochód",
    description: "Kategoria B",
    icon: CarFront,
  },
  {
    id: "samochod-przyczepa",
    label: "Auto + przyczepa",
    description: "Kategoria B+E",
    icon: CarFront,
  },
  {
    id: "ciezarowka",
    label: "Ciężarówka",
    description: "Kategoria C",
    icon: Truck,
  },
  {
    id: "ciezarowka-przyczepa",
    label: "Ciężarówka + przyczepa",
    description: "Kategoria C+E",
    icon: Truck,
  },
  {
    id: "autobus",
    label: "Autobus",
    description: "Kategoria D",
    icon: BusFront,
  },
  {
    id: "ciagnik",
    label: "Ciągnik",
    description: "Kategoria T",
    icon: Tractor,
  },
  {
    id: "kwalifikacje",
    label: "Kwalifikacje",
    description: "Uprawnienia zawodowe",
    icon: BriefcaseBusiness,
  },
] as const;

const RECOMMENDATIONS: Record<Vehicle, Recommendation> = {
  motocykl: {
    category: "A",
    title: "Kategoria A",
    description: "Ścieżka dla osób zainteresowanych jazdą motocyklem.",
  },
  samochod: {
    category: "B",
    title: "Kategoria B",
    description: "Najbardziej naturalny wybór do codziennej jazdy samochodem.",
  },
  "samochod-przyczepa": {
    category: "B+E",
    title: "Kategoria B+E",
    description: "Rozszerzenie uprawnień o zestaw samochodu z przyczepą.",
  },
  ciezarowka: {
    category: "C",
    title: "Kategoria C",
    description: "Kierunek dla osób planujących prowadzenie samochodu ciężarowego.",
  },
  "ciezarowka-przyczepa": {
    category: "C+E",
    title: "Kategoria C+E",
    description: "Ścieżka dla zestawu ciężarowego z przyczepą lub naczepą.",
  },
  autobus: {
    category: "D",
    title: "Kategoria D",
    description: "Kierunek związany z prowadzeniem autobusu.",
  },
  ciagnik: {
    category: "T",
    title: "Kategoria T",
    description: "Ścieżka dla osób zainteresowanych prowadzeniem ciągnika.",
  },
  kwalifikacje: {
    category: "Kwalifikacje",
    title: "Kwalifikacje zawodowe",
    description: "Opcja dla kierowców rozwijających uprawnienia do pracy zawodowej.",
  },
};

function goalNote(goal: Goal) {
  if (goal === "do-pracy") {
    return "Przed zapisem potwierdź zakres wymaganych kwalifikacji zawodowych.";
  }

  if (goal === "rozszerzenie") {
    return "Przed zapisem szkoła potwierdzi, czy posiadane uprawnienia spełniają wymagania.";
  }

  return "Aktualne warunki rozpoczęcia kursu potwierdzisz bezpośrednio ze szkołą.";
}

export function CourseFinder() {
  const [goal, setGoal] = useState<Goal | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const reduceMotion = useReducedMotion();
  const recommendation = vehicle ? RECOMMENDATIONS[vehicle] : null;

  return (
    <section
      id="wyszukiwarka-kursu"
      aria-labelledby="course-finder-title"
      className="relative overflow-hidden bg-[#111310] px-4 py-20 text-[#f4f0e7] sm:px-6 sm:py-28 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="absolute -right-24 top-0 size-80 rounded-full bg-[#c8ff33]/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#c8ff33]">
            <span className="h-px w-8 bg-current" />
            Wyszukiwarka kursu
          </p>
          <h2
            id="course-finder-title"
            className="max-w-xl text-4xl font-black leading-[0.96] tracking-[-0.055em] text-balance sm:text-6xl"
          >
            Dwa pytania. Jeden dobry kierunek.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#f4f0e7]/65 sm:text-lg">
            Wybierz cel i pojazd, a podpowiemy kategorię, od której warto zacząć rozmowę ze szkołą.
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm text-[#f4f0e7]/55">
            <span className={`size-2 rounded-full ${goal ? "bg-[#c8ff33]" : "bg-white/20"}`} />
            <span className={`size-2 rounded-full ${vehicle ? "bg-[#c8ff33]" : "bg-white/20"}`} />
            <span>{goal && vehicle ? "Rekomendacja gotowa" : "2 krótkie kroki"}</span>
          </div>
        </div>

        <div className="space-y-6">
          <fieldset className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-7">
            <legend className="px-2 text-lg font-black tracking-[-0.02em] sm:text-xl">
              <span className="mr-3 text-[#c8ff33]">01</span>
              Jaki jest Twój cel?
            </legend>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {GOALS.map((option) => {
                const Icon = option.icon;
                const selected = goal === option.id;

                return (
                  <motion.label
                    key={option.id}
                    whileHover={reduceMotion ? undefined : { y: -2 }}
                    className={`relative cursor-pointer rounded-xl border p-4 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#c8ff33] ${
                      selected
                        ? "border-[#c8ff33] bg-[#c8ff33]/10"
                        : "border-white/10 bg-black/10 hover:border-white/25"
                    }`}
                  >
                    <input
                      type="radio"
                      name="course-goal"
                      value={option.id}
                      checked={selected}
                      onChange={() => setGoal(option.id)}
                      className="sr-only"
                    />
                    <span className="flex items-start justify-between gap-3">
                      <Icon aria-hidden="true" className="size-5 text-[#c8ff33]" />
                      <span
                        aria-hidden="true"
                        className={`grid size-5 place-items-center rounded-full border ${
                          selected ? "border-[#c8ff33] bg-[#c8ff33] text-[#111310]" : "border-white/25"
                        }`}
                      >
                        {selected ? <Check className="size-3" strokeWidth={3} /> : null}
                      </span>
                    </span>
                    <span className="mt-5 block font-bold">{option.label}</span>
                    <span className="mt-1 block text-xs text-[#f4f0e7]/50">{option.description}</span>
                  </motion.label>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 sm:p-7">
            <legend className="px-2 text-lg font-black tracking-[-0.02em] sm:text-xl">
              <span className="mr-3 text-[#c8ff33]">02</span>
              Czym chcesz jeździć?
            </legend>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {VEHICLES.map((option) => {
                const Icon = option.icon;
                const selected = vehicle === option.id;

                return (
                  <motion.label
                    key={option.id}
                    whileHover={reduceMotion ? undefined : { x: 3 }}
                    className={`group flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#c8ff33] ${
                      selected
                        ? "border-[#c8ff33] bg-[#c8ff33]/10"
                        : "border-white/10 bg-black/10 hover:border-white/25"
                    }`}
                  >
                    <input
                      type="radio"
                      name="course-vehicle"
                      value={option.id}
                      checked={selected}
                      onChange={() => setVehicle(option.id)}
                      className="sr-only"
                    />
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-[#c8ff33]">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold">{option.label}</span>
                      <span className="mt-0.5 block text-xs text-[#f4f0e7]/50">{option.description}</span>
                    </span>
                    <ChevronRight
                      aria-hidden="true"
                      className={`size-4 transition-transform motion-reduce:transition-none ${
                        selected ? "translate-x-0 text-[#c8ff33]" : "-translate-x-1 text-white/25"
                      }`}
                    />
                  </motion.label>
                );
              })}
            </div>
          </fieldset>

          <div aria-live="polite" className="min-h-64">
            <AnimatePresence mode="wait" initial={false}>
              {goal && recommendation ? (
                <motion.div
                  key={`${goal}-${recommendation.category}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden rounded-2xl bg-[#c8ff33] p-6 text-[#111310] sm:p-8"
                >
                  <div aria-hidden="true" className="absolute -right-8 -top-14 text-[11rem] font-black leading-none text-black/[0.055]">
                    {recommendation.category}
                  </div>
                  <div className="relative">
                    <p className="text-xs font-black uppercase tracking-[0.18em]">Rekomendowany kierunek</p>
                    <h3 className="mt-3 text-3xl font-black tracking-[-0.045em] sm:text-5xl">
                      {recommendation.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-[#111310]/70 sm:text-base">
                      {recommendation.description} {goalNote(goal)}
                    </p>
                    <BookingButton
                      category={recommendation.category}
                      className="mt-7 bg-[#111310] text-[#f4f0e7] shadow-none hover:bg-[#252824] hover:shadow-none focus-visible:outline-[#111310]"
                    >
                      Sprawdź rezerwację demo
                    </BookingButton>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty-recommendation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid min-h-64 place-items-center rounded-2xl border border-dashed border-white/15 p-8 text-center"
                >
                  <div>
                    <Route aria-hidden="true" className="mx-auto size-8 text-[#c8ff33]/70" />
                    <p className="mt-4 font-bold">Uzupełnij oba wybory</p>
                    <p className="mt-1 text-sm text-[#f4f0e7]/50">Rekomendacja pojawi się tutaj.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
