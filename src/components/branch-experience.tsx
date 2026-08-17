"use client";

import Image from "next/image";
import { Check, MapPin, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode, RefObject } from "react";
import { branches, type Branch, type BranchKey } from "@/data/site";

type BranchContextValue = {
  branch: Branch;
  selectBranch: (key: BranchKey) => void;
  showSelector: (returnFocusTo?: HTMLElement | null) => void;
};

const BranchContext = createContext<BranchContextValue | null>(null);
const storageKey = "fuks-branch:v1";
const branchChangeEvent = "fuks-branch-change";
let volatileBranch: BranchKey | null = null;

function subscribeToBranch(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(branchChangeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(branchChangeEvent, callback);
  };
}

function getSavedBranch(): BranchKey | null {
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === "nowy-sacz" || saved === "bobowa") return saved;
  } catch {
    return volatileBranch;
  }
  return volatileBranch;
}

export function BranchProvider({ children }: { children: ReactNode }) {
  const savedBranch = useSyncExternalStore(subscribeToBranch, getSavedBranch, () => null);
  const [selectorRequested, setSelectorRequested] = useState(false);
  const [selectorDismissed, setSelectorDismissed] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const selected = savedBranch ?? "nowy-sacz";
  const selectorOpen = selectorRequested || (savedBranch === null && !selectorDismissed);

  const restoreFocus = useCallback(() => {
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, []);

  const selectBranch = useCallback((key: BranchKey) => {
    volatileBranch = key;
    try {
      window.localStorage.setItem(storageKey, key);
    } catch {
      // Session-only fallback remains available when storage is blocked.
    }
    document.documentElement.dataset.fuksBranch = key;
    window.dispatchEvent(new Event(branchChangeEvent));
    setSelectorRequested(false);
    setSelectorDismissed(true);
    document.documentElement.style.overflow = "";
    restoreFocus();
  }, [restoreFocus]);

  const showSelector = useCallback((returnFocusTo?: HTMLElement | null) => {
    returnFocusRef.current = returnFocusTo ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    delete document.documentElement.dataset.fuksBranch;
    setSelectorRequested(true);
    document.documentElement.style.overflow = "hidden";
  }, []);

  const dismissSelector = useCallback(() => {
    document.documentElement.dataset.fuksBranch = selected;
    setSelectorRequested(false);
    setSelectorDismissed(true);
    document.documentElement.style.overflow = "";
    restoreFocus();
  }, [restoreFocus, selected]);

  useEffect(() => {
    document.documentElement.style.overflow = selectorOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [selectorOpen]);

  const value = useMemo(
    () => ({ branch: branches[selected], selectBranch, showSelector }),
    [selected, selectBranch, showSelector],
  );

  return (
    <BranchContext.Provider value={value}>
      <div className="site-experience" inert={selectorOpen ? true : undefined} aria-hidden={selectorOpen ? true : undefined}>
        {children}
      </div>
      {selectorOpen ? <BranchGate defaultBranch={branches[selected].shortLabel} onDismiss={dismissSelector} onSelect={selectBranch} /> : null}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const context = useContext(BranchContext);
  if (!context) throw new Error("useBranch must be used inside BranchProvider");
  return context;
}

export function BranchBadge({ onOpen, returnFocusTo }: { onOpen?: () => void; returnFocusTo?: RefObject<HTMLElement | null> }) {
  const { branch, showSelector } = useBranch();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <button ref={buttonRef} className="branch-badge" type="button" onClick={() => { const focusTarget = returnFocusTo?.current ?? buttonRef.current; onOpen?.(); showSelector(focusTarget); }} aria-label={`Wybrany oddział: ${branch.shortLabel}. Zmień oddział`}>
      <MapPin aria-hidden="true" />
      <span><small>Twój oddział</small><strong>{branch.shortLabel}</strong></span>
      <span className="branch-badge__change">Zmień</span>
    </button>
  );
}

function BranchGate({ defaultBranch, onDismiss, onSelect }: { defaultBranch: string; onDismiss: () => void; onSelect: (key: BranchKey) => void }) {
  const gateRef = useRef<HTMLDivElement>(null);
  const firstChoiceRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstChoiceRef.current?.focus();
  }, []);

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onDismiss();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = Array.from(gateRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])") ?? []);
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div ref={gateRef} className="branch-gate" role="dialog" aria-modal="true" aria-labelledby="branch-gate-title" aria-describedby="branch-gate-note" onKeyDown={handleKeyDown}>
      <div className="branch-gate__header">
        <Image src="/images/brand/logo-fuks.jpg" alt="Logo FUKS Krzysztof Groń" width={960} height={960} priority />
        <div>
          <p>Lubimy uczyć jeździć</p>
          <h1 id="branch-gate-title">Wybierz swój oddział</h1>
        </div>
        <button className="branch-gate__close" type="button" onClick={onDismiss} aria-label={`Zamknij wybór oddziału i pozostań przy: ${defaultBranch}`}><X aria-hidden="true" /></button>
      </div>
      <div className="branch-gate__choices">
        {(Object.values(branches) as Branch[]).map((branch) => (
          <button ref={branch.key === "nowy-sacz" ? firstChoiceRef : undefined} key={branch.key} type="button" onClick={() => onSelect(branch.key)} className="branch-choice" autoFocus={branch.key === "nowy-sacz"}>
            <Image src={branch.heroImage} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" priority />
            <span className="branch-choice__shade" aria-hidden="true" />
            <span className="branch-choice__content">
              <span className="branch-choice__eyebrow">Ośrodek szkolenia</span>
              <strong>{branch.shortLabel}</strong>
              <span><MapPin aria-hidden="true" />{branch.address}</span>
              <span className="branch-choice__action">Wybieram <Check aria-hidden="true" /></span>
            </span>
          </button>
        ))}
      </div>
      <p className="branch-gate__note" id="branch-gate-note">Nie chcesz wybierać teraz? Zamknij ten ekran — pokażemy domyślnie Nowy Sącz. Oddział zmienisz później w menu.</p>
    </div>
  );
}
