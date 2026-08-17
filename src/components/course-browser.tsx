"use client";

import type { LucideIcon } from "lucide-react";
import {
  Award,
  Bike,
  BriefcaseBusiness,
  BusFront,
  CarFront,
  Caravan,
  Check,
  ChevronRight,
  CircleAlert,
  ExternalLink,
  FileCheck2,
  Phone,
  Search,
  ShieldAlert,
  Tractor,
  Truck,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useBranch } from "@/components/branch-experience";
import { courses, type Course, type CourseIcon } from "@/data/site";

const icons: Record<CourseIcon, LucideIcon> = {
  bike: Bike,
  car: CarFront,
  trailer: Caravan,
  truck: Truck,
  bus: BusFront,
  tractor: Tractor,
  briefcase: BriefcaseBusiness,
  certificate: Award,
  adr: ShieldAlert,
  tools: Wrench,
};

function normalize(value: string) {
  return value.trim().toLocaleLowerCase("pl");
}

const courseChangeEvent = "fuks-course-change";

function subscribeToCourseHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener(courseChangeEvent, callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener(courseChangeEvent, callback);
  };
}

function getCourseHash() {
  return window.location.hash.replace("#kurs-", "");
}

export function CourseBrowser() {
  const { branch } = useBranch();
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const courseHash = useSyncExternalStore(subscribeToCourseHash, getCourseHash, () => "");
  const selected = courses.find((item) => item.id === courseHash) ?? null;

  const filtered = useMemo(() => {
    const needle = normalize(query);
    if (!needle) return courses;
    return courses.filter((course) => normalize([course.code, course.title, course.kicker, ...course.aliases].join(" ")).includes(needle));
  }, [query]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    if (!selected && dialog.open) dialog.close();
  }, [selected]);

  function openCourse(course: Course) {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#kurs-${course.id}`);
    window.dispatchEvent(new Event(courseChangeEvent));
  }

  function closeCourse() {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    window.dispatchEvent(new Event(courseChangeEvent));
  }

  return (
    <>
      <section className="course-section section" id="kategorie" aria-labelledby="course-title">
        <div className="shell">
          <div className="section-heading section-heading--split">
            <div>
              <span className="section-number">01 / KATEGORIE</span>
              <h2 id="course-title">Znajdź swój<br /><em>kurs.</em></h2>
            </div>
            <p>Wpisz pojazd, kategorię lub cel. Kliknij kafelek, aby zobaczyć wiek, wymagania, dokumenty i kolejne kroki.</p>
          </div>

          <label className="course-search" htmlFor="course-search-input">
            <Search aria-hidden="true" />
            <span className="sr-only">Szukaj kategorii lub szkolenia</span>
            <input id="course-search-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Np. motocykl, B+E, autobus, ADR, tachograf…" />
            {query ? <button type="button" onClick={() => setQuery("")} aria-label="Wyczyść wyszukiwanie"><X aria-hidden="true" /></button> : null}
          </label>
          <div className="course-results" aria-live="polite">{filtered.length} {filtered.length === 1 ? "wynik" : "wyników"}</div>

          {filtered.length ? (
            <div className="course-grid">
              {filtered.map((course) => {
                const Icon = icons[course.icon];
                return (
                  <button className={`course-card ${course.professional ? "course-card--professional" : ""}`} type="button" key={course.id} onClick={() => openCourse(course)}>
                    <span className="course-card__top"><Icon aria-hidden="true" /><small>{course.kicker}</small></span>
                    <strong className="course-card__code">{course.code}</strong>
                    <span className="course-card__title">{course.title}</span>
                    <span className="course-card__age">{course.minimumAge}</span>
                    <span className="course-card__link">Pełne informacje <ChevronRight aria-hidden="true" /></span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="course-empty">
              <CircleAlert aria-hidden="true" />
              <h3>Nie znaleźliśmy takiej frazy.</h3>
              <p>Spróbuj wpisać literę kategorii albo zadzwoń — pomożemy dobrać szkolenie.</p>
              <a className="button button--blue" href={branch.phoneHref}><Phone aria-hidden="true" /> {branch.phoneDisplay}</a>
            </div>
          )}
        </div>
      </section>

      <dialog ref={dialogRef} className="course-dialog" onClose={closeCourse} onCancel={(event) => { event.preventDefault(); closeCourse(); }} aria-labelledby={selected ? `course-dialog-${selected.id}` : undefined}>
        {selected ? <CourseDetails course={selected} onClose={closeCourse} /> : null}
      </dialog>
    </>
  );
}

function CourseDetails({ course, onClose }: { course: Course; onClose: () => void }) {
  const { branch } = useBranch();
  const Icon = icons[course.icon];
  return (
    <div className="course-dialog__layout">
      <aside className="course-dialog__aside">
        <button className="course-dialog__close" type="button" onClick={onClose} aria-label="Zamknij informacje o kursie" autoFocus><X aria-hidden="true" /></button>
        <Icon className="course-dialog__icon" aria-hidden="true" />
        <span>{course.kicker}</span>
        <strong className={`course-dialog__code ${course.code.length > 8 ? "course-dialog__code--long" : ""}`}>{course.code}</strong>
        <h2 id={`course-dialog-${course.id}`}>{course.title}</h2>
        <p>{course.summary}</p>
        <div className="course-dialog__age"><small>Minimalny wiek</small><b>{course.minimumAge}</b></div>
        <a className="button button--yellow" href={branch.phoneHref}><Phone aria-hidden="true" /> Zadzwoń i zapisz się</a>
      </aside>
      <div className="course-dialog__body">
        {course.important ? <div className="legal-alert"><CircleAlert aria-hidden="true" /><p><strong>Ważna aktualizacja</strong>{course.important}</p></div> : null}
        <DetailSection icon={Award} title="Wiek i ścieżki" items={course.ageDetails} />
        <DetailSection icon={Check} title="Co daje ta kategoria" items={course.permissions} />
        <DetailSection icon={FileCheck2} title="Wymagania i dokumenty" items={[...course.requirements, ...course.documents.map((item) => `Dokument: ${item}.`)]} />
        <section className="detail-section">
          <h3>Co zrobić krok po kroku</h3>
          <ol className="detail-steps">{course.steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol>
        </section>
        <div className="course-dialog__footer">
          <p>Aktualną dostępność, cenę i harmonogram potwierdź telefonicznie.</p>
          {course.sourceUrl ? <a href={course.sourceUrl} target="_blank" rel="noreferrer">Sprawdź źródło urzędowe <ExternalLink aria-hidden="true" /></a> : null}
        </div>
      </div>
    </div>
  );
}

function DetailSection({ icon: Icon, title, items }: { icon: LucideIcon; title: string; items: string[] }) {
  return (
    <section className="detail-section">
      <h3><Icon aria-hidden="true" />{title}</h3>
      <ul>{items.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
    </section>
  );
}
