import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FUKS — szkoła jazdy",
    short_name: "FUKS",
    description: "Szkoła jazdy i kursy zawodowe w Nowym Sączu i Bobowej.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f8fc",
    theme_color: "#071a5c",
    lang: "pl",
    icons: [{ src: "/images/brand/logo-fuks.jpg", sizes: "960x960", type: "image/jpeg" }],
  };
}
