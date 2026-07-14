"use client";

import { Check, CheckCircle2, Info, RotateCcw } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

interface FormState {
  name: string;
  contact: string;
  topic: string;
  message: string;
  demoAccepted: boolean;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
  name: "",
  contact: "",
  topic: "",
  message: "",
  demoAccepted: false,
};

const fieldClassName =
  "peer min-h-12 w-full rounded-xl border border-white/15 bg-white/[0.045] px-4 py-3 text-base text-[#f4f0e7] outline-none transition-colors placeholder:text-white/30 hover:border-white/30 focus:border-[#c8ff33] focus:ring-2 focus:ring-[#c8ff33]/20 motion-reduce:transition-none";

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (form.name.trim().length < 2) {
    errors.name = "Wpisz co najmniej 2 znaki.";
  }

  if (form.contact.trim().length < 5) {
    errors.contact = "Wpisz testowy telefon lub adres e-mail.";
  }

  if (!form.topic) {
    errors.topic = "Wybierz temat rozmowy.";
  }

  if (form.message.trim().length < 10) {
    errors.message = "Wiadomość powinna mieć co najmniej 10 znaków.";
  }

  if (!form.demoAccepted) {
    errors.demoAccepted = "Potwierdź, że rozumiesz demonstracyjny charakter formularza.";
  }

  return errors;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const reduceMotion = useReducedMotion();

  function clearError(field: keyof FormState) {
    setErrors((current) => {
      if (!current[field]) return current;

      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateForm(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    // Demo only: no request, storage write or external integration is performed.
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitted(true);
  }

  function startAgain() {
    setSubmitted(false);
    setForm(EMPTY_FORM);
    setErrors({});
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111310] p-5 text-[#f4f0e7] shadow-[0_30px_80px_rgba(17,19,16,0.2)] sm:p-8 lg:p-10">
      <div aria-hidden="true" className="absolute -right-20 -top-20 size-64 rounded-full bg-[#c8ff33]/10 blur-3xl" />

      <div className="relative">
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-[#c8ff33]/25 bg-[#c8ff33]/[0.08] p-4">
          <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#c8ff33]" />
          <p className="text-sm leading-6 text-[#f4f0e7]/75">
            <strong className="text-[#f4f0e7]">Formularz demonstracyjny.</strong> Nic, co tu wpiszesz, nie zostanie wysłane ani zapisane. Nie podawaj prawdziwych danych.
          </p>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {submitted ? (
            <motion.div
              key="success"
              role="status"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              className="grid min-h-[31rem] place-items-center py-10 text-center"
            >
              <div className="max-w-md">
                <span className="mx-auto grid size-20 place-items-center rounded-full bg-[#c8ff33] text-[#111310]">
                  <CheckCircle2 aria-hidden="true" className="size-9" strokeWidth={2.25} />
                </span>
                <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#c8ff33]">Symulacja zakończona</p>
                <h3 className="mt-3 text-3xl font-black tracking-[-0.045em] sm:text-4xl">Nic nie zostało wysłane.</h3>
                <p className="mt-4 text-sm leading-7 text-[#f4f0e7]/60 sm:text-base">
                  To ekran sukcesu wersji demo. Dane zostały usunięte ze stanu formularza, a wiadomość nie trafiła do FUKS.
                </p>
                <button
                  type="button"
                  onClick={startAgain}
                  className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-bold transition-colors hover:border-[#c8ff33] hover:text-[#c8ff33] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8ff33] motion-reduce:transition-none"
                >
                  <RotateCcw aria-hidden="true" className="size-4" />
                  Wypełnij ponownie
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              aria-label="Demonstracyjny formularz kontaktowy"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-bold">
                    Imię lub pseudonim demo
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={(event) => {
                      setForm((current) => ({ ...current, name: event.target.value }));
                      clearError("name");
                    }}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    placeholder="Np. Kierowca Demo"
                    className={fieldClassName}
                  />
                  {errors.name ? (
                    <p id="contact-name-error" className="mt-2 text-xs font-medium text-[#ff9b83]">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="contact-detail" className="mb-2 block text-sm font-bold">
                    Testowy telefon lub e-mail
                  </label>
                  <input
                    id="contact-detail"
                    name="contact"
                    type="text"
                    inputMode="email"
                    value={form.contact}
                    onChange={(event) => {
                      setForm((current) => ({ ...current, contact: event.target.value }));
                      clearError("contact");
                    }}
                    aria-invalid={Boolean(errors.contact)}
                    aria-describedby={errors.contact ? "contact-detail-error" : undefined}
                    placeholder="demo@example.test"
                    className={fieldClassName}
                  />
                  {errors.contact ? (
                    <p id="contact-detail-error" className="mt-2 text-xs font-medium text-[#ff9b83]">
                      {errors.contact}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="contact-topic" className="mb-2 block text-sm font-bold">
                  Temat
                </label>
                <select
                  id="contact-topic"
                  name="topic"
                  value={form.topic}
                  onChange={(event) => {
                    setForm((current) => ({ ...current, topic: event.target.value }));
                    clearError("topic");
                  }}
                  aria-invalid={Boolean(errors.topic)}
                  aria-describedby={errors.topic ? "contact-topic-error" : undefined}
                  className={`${fieldClassName} appearance-none`}
                >
                  <option value="" className="bg-[#111310]">Wybierz temat rozmowy</option>
                  <option value="kurs" className="bg-[#111310]">Kurs prawa jazdy</option>
                  <option value="zawodowe" className="bg-[#111310]">Kategorie i kwalifikacje zawodowe</option>
                  <option value="jazdy" className="bg-[#111310]">Jazdy i terminy</option>
                  <option value="inne" className="bg-[#111310]">Inny temat</option>
                </select>
                {errors.topic ? (
                  <p id="contact-topic-error" className="mt-2 text-xs font-medium text-[#ff9b83]">
                    {errors.topic}
                  </p>
                ) : null}
              </div>

              <div className="mt-6">
                <label htmlFor="contact-message" className="mb-2 block text-sm font-bold">
                  Wiadomość testowa
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={(event) => {
                    setForm((current) => ({ ...current, message: event.target.value }));
                    clearError("message");
                  }}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : "contact-message-help"}
                  placeholder="Napisz przykładową wiadomość…"
                  className={`${fieldClassName} resize-y`}
                />
                {errors.message ? (
                  <p id="contact-message-error" className="mt-2 text-xs font-medium text-[#ff9b83]">
                    {errors.message}
                  </p>
                ) : (
                  <p id="contact-message-help" className="mt-2 text-xs text-[#f4f0e7]/40">
                    Pole służy wyłącznie do sprawdzenia działania interfejsu.
                  </p>
                )}
              </div>

              <div className="mt-6">
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#f4f0e7]/70">
                  <input
                    type="checkbox"
                    checked={form.demoAccepted}
                    onChange={(event) => {
                      setForm((current) => ({ ...current, demoAccepted: event.target.checked }));
                      clearError("demoAccepted");
                    }}
                    aria-invalid={Boolean(errors.demoAccepted)}
                    aria-describedby={errors.demoAccepted ? "contact-demo-error" : undefined}
                    className="peer sr-only"
                  />
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded border border-white/25 peer-checked:border-[#c8ff33] peer-checked:bg-[#c8ff33] peer-checked:text-[#111310] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#c8ff33]">
                    {form.demoAccepted ? <Check aria-hidden="true" className="size-3" strokeWidth={3} /> : null}
                  </span>
                  <span>Rozumiem, że to demo i żadna wiadomość nie zostanie wysłana.</span>
                </label>
                {errors.demoAccepted ? (
                  <p id="contact-demo-error" className="mt-2 text-xs font-medium text-[#ff9b83]">
                    {errors.demoAccepted}
                  </p>
                ) : null}
              </div>

              <motion.button
                type="submit"
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                className="mt-8 inline-flex min-h-13 w-full items-center justify-center rounded-xl bg-[#c8ff33] px-6 py-3.5 text-sm font-black text-[#111310] transition-colors hover:bg-[#d5ff66] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8ff33] sm:w-auto motion-reduce:transition-none"
              >
                Pokaż potwierdzenie demo
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
