"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Brand } from "@/components/brand";
import { BranchBadge } from "@/components/branch-experience";
import { contact } from "@/data/site";

const links = [
  { href: "#kategorie", label: "Kategorie" },
  { href: "#dlaczego-fuks", label: "Dlaczego FUKS" },
  { href: "#trasa-kursu", label: "Trasa kursu" },
  { href: "#dofinansowanie", label: "Dofinansowanie" },
  { href: "#aktualnosci", label: "Aktualności" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
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
          <a className="header-phone" href={contact.phoneHref} aria-label={`Zadzwoń: ${contact.phoneDisplay}`}>
            <Phone aria-hidden="true" /><span>{contact.phoneDisplay}</span>
          </a>
          <button className="menu-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Zamknij menu" : "Otwórz menu"}>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" className={`mobile-nav ${open ? "mobile-nav--open" : ""}`} aria-label="Nawigacja mobilna">
        {links.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>)}
        <Link href="/kursy-zawodowe" onClick={() => setOpen(false)}>Kursy zawodowe</Link>
        <a className="button button--yellow" href={contact.phoneHref} onClick={() => setOpen(false)}><Phone aria-hidden="true" /> Zadzwoń i zapisz się</a>
      </nav>
    </header>
  );
}
