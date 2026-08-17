import Link from "next/link";
import { ExternalLink, MapPin } from "lucide-react";
import { Brand } from "@/components/brand";
import { FacebookIcon } from "@/components/social-icons";
import { BranchEmailLink, BranchPhoneButton } from "@/components/branch-phone-button";
import { branches, contact } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div className="site-footer__brand">
          <Brand />
          <p>Prawo jazdy wszystkich kategorii, kwalifikacje i szkolenia zawodowe w Nowym Sączu oraz Bobowej.</p>
          <a href={contact.facebook} target="_blank" rel="noreferrer"><FacebookIcon aria-hidden="true" /> Oficjalny Facebook <ExternalLink aria-hidden="true" /></a>
        </div>
        <div>
          <h2>Oddziały</h2>
          {Object.values(branches).map((branch) => <p className="footer-address" key={branch.key}><MapPin aria-hidden="true" /><span><strong>{branch.shortLabel}</strong>{branch.address}, {branch.postalCode}</span></p>)}
        </div>
        <div>
          <h2>Kontakt</h2>
          <BranchPhoneButton className="footer-link" />
          <BranchEmailLink className="footer-link" />
        </div>
        <div>
          <h2>Informacje</h2>
          <Link href="/kursy-zawodowe">Kursy zawodowe</Link>
          <a href="#dofinansowanie">Dofinansowanie BUR</a>
          <Link href="/polityka-prywatnosci">Polityka prywatności</Link>
          <Link href="/polityka-cookies">Polityka cookies</Link>
        </div>
      </div>
      <div className="shell site-footer__bottom">
        <span>© {new Date().getFullYear()} FUKS Krzysztof Groń</span>
        <span>Stan informacji prawnych: 17.08.2026</span>
      </div>
    </footer>
  );
}
