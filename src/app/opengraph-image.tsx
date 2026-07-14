import { ImageResponse } from "next/og";

export const alt = "FUKS — prawo jazdy i szkolenia zawodowe w Nowym Sączu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080a08",
          color: "#f3efe2",
          padding: "68px 76px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 540,
            height: 540,
            right: -120,
            top: -160,
            borderRadius: 999,
            border: "90px solid #c8ff33",
            opacity: 0.92,
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 68,
              height: 68,
              borderRadius: 14,
              background: "#c8ff33",
              color: "#080a08",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              fontWeight: 900,
            }}
          >
            F
          </div>
          <div style={{ display: "flex", fontSize: 38, fontWeight: 900, letterSpacing: 2 }}>FUKS</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 850 }}>
          <div style={{ display: "flex", fontSize: 96, lineHeight: 0.9, fontWeight: 900, letterSpacing: -4 }}>
            RUSZAJ PO SWOJE.
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 27, color: "#c8ff33" }}>
            PRAWO JAZDY · KURSY ZAWODOWE · NOWY SĄCZ
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "#9ca392" }}>
          <span>606 647 396</span>
          <span>PROJEKT DEMONSTRACYJNY</span>
        </div>
      </div>
    ),
    size,
  );
}

