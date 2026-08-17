import Image from "next/image";

const photos = [
  { src: "/images/fleet/samochody-szkola-jazdy-fuks.jpg", alt: "Samochody szkoleniowe FUKS przed siedzibą", label: "Samochody", className: "gallery-item--wide" },
  { src: "/images/fleet/autobus-fuks.jpg", alt: "Niebieski autobus szkoleniowy FUKS", label: "Autobus", className: "gallery-item--tall" },
  { src: "/images/fleet/ciezarowki-fuks.jpg", alt: "Ciężarówki szkoleniowe FUKS", label: "Ciężarówki", className: "" },
  { src: "/images/fleet/ciagnik-i-auto-fuks.jpg", alt: "Ciągnik rolniczy i samochód szkoleniowy FUKS", label: "Ciągnik", className: "" },
  { src: "/images/fleet/flota-samochodowa-fuks.jpg", alt: "Flota samochodów osobowych FUKS", label: "Flota", className: "gallery-item--wide" },
  { src: "/images/fleet/siedziba-flota-fuks.jpg", alt: "Siedziba FUKS i samochody szkoleniowe", label: "Nowy Sącz", className: "" },
];

export function Gallery() {
  return (
    <section className="gallery-section section" id="galeria" aria-labelledby="gallery-title">
      <div className="shell">
        <div className="section-heading section-heading--split">
          <div>
            <span className="section-number">04 / GALERIA</span>
            <h2 id="gallery-title">Sprzęt, na którym<br /><em>naprawdę uczymy.</em></h2>
          </div>
          <p>Realna flota FUKS — od samochodów osobowych po ciężarówki, autobus i ciągnik.</p>
        </div>
        <div className="gallery-grid">
          {photos.map((photo, index) => (
            <figure className={`gallery-item ${photo.className}`} key={photo.src}>
              <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
              <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{photo.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
