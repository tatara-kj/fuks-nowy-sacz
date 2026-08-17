"use client";

import { Mail, Phone } from "lucide-react";
import { useBranch } from "@/components/branch-experience";

export function BranchPhoneButton({ label, className }: { label?: string; className?: string }) {
  const { branch } = useBranch();

  return <a className={className} href={branch.phoneHref}><Phone aria-hidden="true" /> {label ?? branch.phoneDisplay}</a>;
}

export function BranchEmailLink({ className }: { className?: string }) {
  const { branch } = useBranch();

  return <a className={className} href={branch.emailHref}><Mail aria-hidden="true" /> {branch.email}</a>;
}
