"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Brand } from "@/components/brand";
import { contact } from "@/data/site";

const links = [
  ["Kursy", "#kursy"],
  ["Kategorie", "#kategorie"],
  ["Jak to działa", "#jak-to-dziala"],
  ["O nas", "#o-nas"],
  ["FAQ", "#faq"],
  ["Kontakt", "#kontakt"],
] as const;

function openBooking() {
  window.dispatchEvent(new CustomEvent("fuks:open-booking"));
}

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="nav-shell">
        <a href="#top" className="nav-brand" aria-label="FUKS — przejdź na początek strony">
          <Brand />
        </a>

        <nav className="desktop-nav" aria-label="Nawigacja główna">
          {links.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a className="nav-phone" href={contact.phoneHref} aria-label={`Zadzwoń: ${contact.phoneDisplay}`}>
            <Phone size={16} aria-hidden="true" />
            <span>{contact.phoneDisplay}</span>
          </a>
          <button className="nav-book" type="button" onClick={openBooking}>
            Zarezerwuj termin
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Nawigacja mobilna">
              {links.map(([label, href], index) => (
                <motion.a
                  href={href}
                  key={href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + index * 0.045 }}
                >
                  <span>0{index + 1}</span>
                  {label}
                </motion.a>
              ))}
            </nav>
            <div className="mobile-menu__footer">
              <p>Nowy Sącz · od 2003 roku</p>
              <a href={contact.phoneHref}>Zadzwoń {contact.phoneDisplay}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

