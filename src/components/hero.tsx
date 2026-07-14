"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, ArrowUpRight, MapPin, Phone, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import { contact } from "@/data/site";

function openBooking() {
  window.dispatchEvent(new CustomEvent("fuks:open-booking"));
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 110]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -45]);
  const roadScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.18]);

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-grid" aria-hidden="true" />
      <motion.div className="hero-copy" style={{ y: copyY }}>
        <motion.div
          className="hero-kicker"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <MapPin size={16} aria-hidden="true" />
          Nowy Sącz · prawo jazdy i szkolenia zawodowe
        </motion.div>

        <h1 className="hero-title">
          <span className="hero-title__line">
            <motion.span
              initial={reduced ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.92, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              RUSZAJ
            </motion.span>
          </span>
          <span className="hero-title__line hero-title__line--accent">
            <motion.span
              initial={reduced ? false : { y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 1.02, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              PO SWOJE.
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="hero-intro"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.18, duration: 0.65 }}
        >
          <p>
            Od pierwszej jazdy po zawodową trasę. Kategorie motocyklowe, osobowe, ciężarowe i autobusowe — w jednym ośrodku.
          </p>
          <div className="hero-actions">
            <a href="#kursy" className="button button--lime">
              Wybierz kurs <ArrowDownRight size={19} aria-hidden="true" />
            </a>
            <a href={contact.phoneHref} className="button button--ghost">
              <Phone size={18} aria-hidden="true" /> {contact.phoneDisplay}
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="hero-visual" style={{ scale: roadScale }}>
        <motion.div className="hero-photo" style={{ y: imageY }}>
          <Image
            src="/images/demo-car.webp"
            alt="Samochód na leśnej drodze — kadr koncepcyjny, nie przedstawia floty FUKS"
            fill
            loading="eager"
            sizes="(max-width: 900px) 100vw, 58vw"
          />
          <div className="hero-photo__veil" />
        </motion.div>
        <div className="hero-road" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="hero-visual__label">
          <span>Kadr koncepcyjny</span>
          <strong>Droga zaczyna się tutaj</strong>
        </div>
        <div className="hero-coordinates" aria-label="Współrzędne Nowego Sącza">
          49°37&apos;N<br />20°42&apos;E
        </div>
      </motion.div>

      <motion.aside
        className="hero-proof"
        initial={reduced ? false : { opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.32, duration: 0.55 }}
      >
        <ShieldCheck aria-hidden="true" />
        <span>
          <strong>4,7 / 5 w BUR</strong>
          ponad 1800 ocen usług
        </span>
      </motion.aside>

      <button className="hero-booking-orbit" type="button" onClick={openBooking} aria-label="Otwórz rezerwację demonstracyjną">
        <span>ZAREZERWUJ · TERMIN · DEMO · </span>
        <ArrowUpRight aria-hidden="true" />
      </button>

      <div className="category-ticker" aria-label="Dostępne kategorie">
        <div>
          {["AM", "A1", "A2", "A", "B", "B+E", "C", "C+E", "D", "T", "KWALIFIKACJE", "KURSY ZAWODOWE"].map((item) => (
            <span key={item}>{item}<i aria-hidden="true" /></span>
          ))}
        </div>
      </div>
    </section>
  );
}
