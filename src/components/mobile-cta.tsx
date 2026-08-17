"use client";

import { Phone } from "lucide-react";
import { useBranch } from "@/components/branch-experience";

export function MobileCta() {
  const { branch } = useBranch();
  return <a className="mobile-cta" href={branch.phoneHref}><Phone aria-hidden="true" /><span><small>Zapisy telefoniczne</small><strong>{branch.phoneDisplay}</strong></span></a>;
}
