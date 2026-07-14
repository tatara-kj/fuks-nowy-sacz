"use client";

import { CalendarDays, Phone } from "lucide-react";
import { contact } from "@/data/site";

export function MobileCta() {
  return (
    <div className="mobile-cta" aria-label="Szybki kontakt">
      <a href={contact.phoneHref}>
        <Phone size={18} aria-hidden="true" /> Zadzwoń
      </a>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent("fuks:open-booking"))}
      >
        <CalendarDays size={18} aria-hidden="true" /> Zarezerwuj
      </button>
    </div>
  );
}

