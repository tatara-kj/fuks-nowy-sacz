"use client";

import Image from "next/image";
import { Check, MapPin } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { branches, type Branch, type BranchKey } from "@/data/site";

type BranchContextValue = {
  branch: Branch;
  selectBranch: (key: BranchKey) => void;
  showSelector: () => void;
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
  const selected = savedBranch ?? "nowy-sacz";
  const selectorOpen = selectorRequested || savedBranch === null;

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
    document.documentElement.style.overflow = "";
  }, []);

  const showSelector = useCallback(() => {
    delete document.documentElement.dataset.fuksBranch;
    setSelectorRequested(true);
    document.documentElement.style.overflow = "hidden";
  }, []);

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
      {children}
      {selectorOpen ? <BranchGate onSelect={selectBranch} /> : null}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const context = useContext(BranchContext);
  if (!context) throw new Error("useBranch must be used inside BranchProvider");
  return context;
}

export function BranchBadge() {
  const { branch, showSelector } = useBranch();
  return (
    <button className="branch-badge" type="button" onClick={showSelector} aria-label={`Wybrany oddział: ${branch.shortLabel}. Zmień oddział`}>
      <MapPin aria-hidden="true" />
      <span><small>Twój oddział</small><strong>{branch.shortLabel}</strong></span>
      <span className="branch-badge__change">Zmień</span>
    </button>
  );
}

function BranchGate({ onSelect }: { onSelect: (key: BranchKey) => void }) {
  return (
    <div className="branch-gate" role="dialog" aria-modal="true" aria-labelledby="branch-gate-title">
      <div className="branch-gate__header">
        <Image src="/images/brand/logo-fuks.jpg" alt="Logo FUKS Krzysztof Groń" width={960} height={960} priority />
        <div>
          <p>Lubimy uczyć jeździć</p>
          <h1 id="branch-gate-title">Wybierz swój oddział</h1>
        </div>
      </div>
      <div className="branch-gate__choices">
        {(Object.values(branches) as Branch[]).map((branch) => (
          <button key={branch.key} type="button" onClick={() => onSelect(branch.key)} className="branch-choice">
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
      <p className="branch-gate__note">W każdej chwili możesz zmienić oddział w górnym menu.</p>
    </div>
  );
}
