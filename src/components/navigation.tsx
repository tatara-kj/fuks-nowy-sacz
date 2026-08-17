"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Brand } from "@/components/brand";
import { BranchBadge, useBranch } from "@/components/branch-experience";

const links = [
  { href: "#kategorie", label: "Kategorie" },
  { href: "#dlaczego-fuks", label: "Dlaczego FUKS" },
  { href: "#trasa-kursu", label: "Trasa kursu" },
  { href: "#dofinansowanie", label: "Dofinansowanie" },
  { href: "#aktualnosci", label: "Aktualności" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Navigation() {
  const { branch } = useBranch();
  const [open, setOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuToggleRef.current?.focus();
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Brand compact />
        <nav className="desktop-nav" aria-label="Główna nawigacja">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          <Link href="/kursy-zawodowe">Kursy zawodowe</Link>
        </nav>
        <div className="site-header__actions">
          <BranchBadge />
          <a className="header-phone" href={branch.phoneHref} aria-label={`Zadzwoń: ${branch.phoneDisplay}`}>
            <Phone aria-hidden="true" /><span>{branch.phoneDisplay}</span>
          </a>
          <button ref={menuToggleRef} className="menu-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Zamknij menu" : "Otwórz menu"}>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" className={`mobile-nav ${open ? "mobile-nav--open" : ""}`} aria-label="Nawigacja mobilna">
        <BranchBadge onOpen={() => setOpen(false)} returnFocusTo={menuToggleRef} />
        {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
        <Link href="/kursy-zawodowe" onClick={() => setOpen(false)}>Kursy zawodowe</Link>
        <a className="button button--yellow" href={branch.phoneHref} onClick={() => setOpen(false)}><Phone aria-hidden="true" /> Zadzwoń i zapisz się</a>
      </nav>
    </header>
  );
}
