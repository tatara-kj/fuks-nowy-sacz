import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";

const images = [
  {
    src: "/images/demo-car.webp",
    alt: "Samochód jadący przez leśną drogę — zdjęcie demonstracyjne",
    category: "B",
    title: "Pewność w codziennym ruchu",
    position: "50% 58%",
    credit: "Luke Miller / Unsplash",
    href: "https://unsplash.com/photos/car-drives-through-a-forest-on-a-winding-road-K14SKnhLFc0",
  },
  {
    src: "/images/demo-moto.webp",
    alt: "Motocyklistka na otwartej drodze — zdjęcie demonstracyjne",
    category: "A",
    title: "Precyzja na dwóch kołach",
    position: "50% 50%",
    credit: "Unsplash",
    href: "https://unsplash.com",
  },
  {
    src: "/images/demo-truck.webp",
    alt: "Samochód ciężarowy na trasie — zdjęcie demonstracyjne",
    category: "C+E",
    title: "Kompetencje do zawodowej trasy",
    position: "45% 52%",
    credit: "Unsplash",
    href: "https://unsplash.com",
  },
];

export function Gallery() {
  return (
    <section className="gallery-section" id="flota" aria-labelledby="gallery-title">
      <div className="section-shell">
        <Reveal className="gallery-heading">
          <div>
            <span className="section-index">05 / KIERUNEK</span>
            <h2 id="gallery-title">JEDNA SZKOŁA.<br />RÓŻNE TRASY.</h2>
          </div>
          <div className="demo-note demo-note--light">
            <strong>Zdjęcia demonstracyjne</strong>
            <p>Nie przedstawiają aktualnej floty FUKS. Modele pojazdów i ich dostępność potwierdź telefonicznie.</p>
          </div>
        </Reveal>

        <div className="gallery-grid">
          {images.map((item, index) => (
            <Reveal className={`gallery-card gallery-card--${index + 1}`} delay={index * 0.08} key={item.src}>
              <div className="gallery-card__media">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={index === 0 ? "(max-width: 900px) 100vw, 55vw" : "(max-width: 900px) 100vw, 35vw"}
                  style={{ objectPosition: item.position }}
                />
                <span className="gallery-card__category">KAT. {item.category}</span>
                <div className="gallery-card__scrim" />
              </div>
              <div className="gallery-card__caption">
                <h3>{item.title}</h3>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.credit} <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

