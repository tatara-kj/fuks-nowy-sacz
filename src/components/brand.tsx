import Image from "next/image";
import Link from "next/link";

type BrandProps = {
  compact?: boolean;
};

export function Brand({ compact = false }: BrandProps) {
  return (
    <Link className={`brand ${compact ? "brand--compact" : ""}`} href="/" aria-label="FUKS — strona główna">
      <Image
        className="brand__logo"
        src="/images/brand/logo-fuks.jpg"
        alt="Logo FUKS Krzysztof Groń"
        width={960}
        height={960}
        sizes={compact ? "52px" : "64px"}
        priority
      />
      <span className="brand__wordmark">
        <strong>FUKS</strong>
        <small>Lubimy uczyć jeździć</small>
      </span>
    </Link>
  );
}
