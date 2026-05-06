import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GalleryGrid } from "@/components/sections/gallery-grid";

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-carbon pt-24">
        <GalleryGrid />
      </main>
      <Footer />
    </>
  );
}
