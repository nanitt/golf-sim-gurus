"use client";

import Image from "next/image";
import Link from "next/link";

interface GalleryItemData {
  id: string;
  title: string;
  dimensions: string;
  monitor: string;
  image: string;
}

const defaultGalleryItems: GalleryItemData[] = [
  { id: "1", title: "Modern Basement Retreat",       dimensions: "18′ × 25′ × 10′", monitor: "Trackman iO",       image: "/images/gallery/build-29.jpg" },
  { id: "2", title: "Garage Conversion",             dimensions: "16′ × 22′ × 9′",  monitor: "Foresight GCQuad", image: "/images/gallery/build-24.jpg" },
  { id: "3", title: "Dedicated Wing Build",          dimensions: "20′ × 30′ × 11′", monitor: "Trackman iO",       image: "/images/gallery/sim-room-2.jpg" },
  { id: "4", title: "Urban Condo Studio",            dimensions: "14′ × 20′ × 9′",  monitor: "Uneekor EYE XO2",  image: "/images/gallery/commercial-sim.jpg" },
  { id: "5", title: "Lakehouse Entertainment Room",  dimensions: "22′ × 28′ × 10′", monitor: "Foresight GCQuad", image: "/images/gallery/celtic-course-5.jpg" },
  { id: "6", title: "Executive Home Office",         dimensions: "15′ × 24′ × 9.5′",monitor: "Trackman iO",       image: "/images/gallery/build-room.jpg" },
];

interface GalleryGridProps {
  items?: GalleryItemData[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const g = items && items.length > 0 ? items : defaultGalleryItems;

  return (
    <section id="gallery" className="bg-[#0a0a0a]">
      {/* Label row */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/30">Our Work</p>
        <Link href="/gallery" className="font-mono text-xs uppercase tracking-widest text-celtic transition-opacity hover:opacity-70">
          View All →
        </Link>
      </div>

      {/* Hero image — full width, wide crop */}
      <div className="group relative h-[50vw] max-h-[600px] min-h-[300px] w-full overflow-hidden">
        <Image
          src={g[0].image}
          alt={g[0].title}
          fill
          className="object-cover opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
          priority
          sizes="100vw"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="font-heading text-xl font-bold text-white">{g[0].title}</p>
          <p className="mt-1 font-mono text-xs text-celtic">{g[0].dimensions} · {g[0].monitor}</p>
        </div>
      </div>

      {/* 2-column row */}
      <div className="grid grid-cols-2 gap-1">
        {[g[1], g[2]].map((item) => (
          <div key={item.id} className="group relative aspect-[4/3] overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover opacity-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
              sizes="50vw"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="font-heading text-base font-bold text-white">{item.title}</p>
              <p className="mt-0.5 font-mono text-xs text-celtic">{item.dimensions} · {item.monitor}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3-column row */}
      <div className="grid grid-cols-3 gap-1">
        {[g[3], g[4], g[5]].map((item) => (
          <div key={item.id} className="group relative aspect-[4/3] overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover opacity-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
              sizes="33vw"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="font-heading text-sm font-bold text-white">{item.title}</p>
              <p className="mt-0.5 font-mono text-xs text-celtic">{item.monitor}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
