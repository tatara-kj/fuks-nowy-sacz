import { Phone } from "lucide-react";
import { contact } from "@/data/site";

export function MobileCta() {
  return <a className="mobile-cta" href={contact.phoneHref}><Phone aria-hidden="true" /><span><small>Zapisy telefoniczne</small><strong>{contact.phoneDisplay}</strong></span></a>;
}
