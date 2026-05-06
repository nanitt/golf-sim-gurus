import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Golf Sim Gurus",
    short_name: "GSG",
    description: "Custom golf simulators for home and business",
    start_url: "/",
    display: "standalone",
    background_color: "#fdfcfa",
    theme_color: "#1a3d2e",
    icons: [
      {
        src: "/golfsimlogo.avif",
        sizes: "192x192",
        type: "image/avif",
      },
      {
        src: "/golfsimlogo.avif",
        sizes: "512x512",
        type: "image/avif",
      },
    ],
  };
}
