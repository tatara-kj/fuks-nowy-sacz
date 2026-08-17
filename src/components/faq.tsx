import { ChevronDown, FileText, Search } from "lucide-react";
import { BranchPhoneButton } from "@/components/branch-phone-button";
import { faqs } from "@/data/site";

export function FAQ() {
  return (
    <section className="faq-section section" id="faq" aria-labelledby="faq-title">
      <div className="shell faq-layout">
        <div className="faq-intro">
          <span className="section-number">08 / FAQ</span>
          <h2 id="faq-title">Pytania przed<br /><em>pierwszą jazdą.</em></h2>
          <p>Najważniejsze odpowiedzi zebrane w jednym miejscu. Szczegóły zależne od kategorii sprawdzisz w jej karcie.</p>
          <div className="faq-actions">
            <a href="#kategorie"><Search aria-hidden="true" /> Przejdź do kategorii</a>
            <a href="#trasa-kursu"><FileText aria-hidden="true" /> Jak wygląda kurs</a>
            <BranchPhoneButton label="Zadzwoń do biura" />
          </div>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary><span>{String(index + 1).padStart(2, "0")}</span>{faq.question}<ChevronDown aria-hidden="true" /></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
