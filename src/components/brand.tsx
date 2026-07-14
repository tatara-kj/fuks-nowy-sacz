type BrandProps = {
  compact?: boolean;
  inverted?: boolean;
};

export function Brand({ compact = false, inverted = false }: BrandProps) {
  return (
    <span className="brand" aria-label="FUKS — Małopolskie Centrum Szkoleń">
      <span className={`brand-mark ${inverted ? "brand-mark--light" : ""}`} aria-hidden="true">
        <span>F</span>
      </span>
      <span className="brand-word">
        <strong>FUKS</strong>
        {!compact && <small>Centrum szkoleń</small>}
      </span>
    </span>
  );
}

