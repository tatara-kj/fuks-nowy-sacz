"use client";

import { Clock3, ExternalLink, Mail, MapPin, Phone, Route, ShieldCheck } from "lucide-react";
import { useBranch } from "@/components/branch-experience";

export function ContactSection() {
  const { branch, showSelector } = useBranch();
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(branch.mapQuery)}&output=embed`;

  return (
    <section className="contact-section section" id="kontakt" aria-labelledby="contact-title">
      <div className="shell">
        <div className="section-heading section-heading--split section-heading--light">
          <div>
            <span className="section-number">09 / KONTAKT</span>
            <h2 id="contact-title">Zacznijmy<br /><em>od rozmowy.</em></h2>
          </div>
          <div className="contact-heading__cta">
            <span>Wybrany oddział: <strong>{branch.shortLabel}</strong></span>
            <button type="button" onClick={(event) => showSelector(event.currentTarget)}>Zmień oddział</button>
          </div>
        </div>

        <div className="contact-layout">
          <div className="contact-map">
            <iframe title={`Mapa oddziału FUKS — ${branch.shortLabel}`} src={embedUrl} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            <span className="contact-map__label">Mapa oddziału · {branch.shortLabel}</span>
          </div>

          <div className="contact-card">
            <span className="contact-card__branch">{branch.label}</span>
            <a className="contact-card__phone" href={branch.phoneHref}><Phone aria-hidden="true" /><span><small>Telefon i zapisy</small><strong>{branch.phoneDisplay}</strong></span></a>
            <a className="contact-card__row" href={branch.emailHref}><Mail aria-hidden="true" /><span><small>E-mail</small><strong>{branch.email}</strong></span></a>
            <a className="contact-card__row" href={branch.mapsUrl} target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /><span><small>Biuro i teoria</small><strong>{branch.address}, {branch.postalCode} {branch.city}</strong></span><ExternalLink aria-hidden="true" /></a>
            <div className="contact-card__row"><Route aria-hidden="true" /><span><small>Zajęcia praktyczne</small><strong>{branch.trainingGround ?? branch.trainingGroundNote}</strong></span></div>
            <div className="contact-hours">
              <h3><Clock3 aria-hidden="true" /> Godziny otwarcia</h3>
              {branch.hours.map((row) => <div key={row.days}><span>{row.days}</span><strong>{row.hours}</strong></div>)}
            </div>
            <p className="contact-card__notice"><ShieldCheck aria-hidden="true" /> Zapisy i rezerwacje prowadzimy obecnie wyłącznie telefonicznie.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
