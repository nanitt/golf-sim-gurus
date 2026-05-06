export interface Monitor {
  id: string;
  name: string;
  technology: string;
  accuracy: string;
  dataPoints: string;
  spinRate: string;
  clubData: boolean;
  outdoorCapable: boolean;
  mounting: string;
  price: string;
  productImage: string;
  logo: string;
  description: string;
  recommendation: string;
}

export const monitors: Monitor[] = [
  {
    id: "trackman-io",
    name: "Trackman iO",
    technology: "Radar + IR + High-Speed Cameras",
    accuracy: "±0.2°",
    dataPoints: "50+ with OERT",
    spinRate: "Full spin axis",
    clubData: true,
    outdoorCapable: false,
    mounting: "Ceiling / Overhead",
    price: "From $13,995",
    productImage: "/images/equipment/trackman-io.webp",
    logo: "/images/logos/trackman.webp",
    description:
      "Purpose-built for indoor simulation. The Trackman iO mounts overhead to free up floor space and uses combined radar, infrared, and high-speed imaging for 50+ data parameters — the same OERT technology trusted on every major tour.",
    recommendation:
      "Best for: Dedicated simulator rooms with ceiling clearance. Frees up the full bay width and requires zero setup — step up and swing.",
  },
  {
    id: "trackman-4",
    name: "Trackman 4",
    technology: "Dual Doppler Radar + Camera",
    accuracy: "±0.3°",
    dataPoints: "26 parameters",
    spinRate: "Full spin axis",
    clubData: true,
    outdoorCapable: true,
    mounting: "Floor / Tripod",
    price: "From $21,995",
    productImage: "/images/equipment/trackman-4.jpg",
    logo: "/images/logos/trackman.webp",
    description:
      "The industry benchmark used at every major tour event worldwide. The Trackman 4's dual Doppler radar delivers 26 data parameters with proven accuracy that coaches, fitters, and tour professionals rely on.",
    recommendation:
      "Best for: Tour-level accuracy in a portable package. Works indoors and outdoors — ideal for fitting studios, academies, and serious home simulator rooms.",
  },
  {
    id: "foresight-gcquad",
    name: "Foresight GCQuad",
    technology: "Quadrascopic Camera",
    accuracy: "±0.5°",
    dataPoints: "16 parameters",
    spinRate: "Full spin axis",
    clubData: true,
    outdoorCapable: true,
    mounting: "Floor / Tripod",
    price: "From $15,999",
    productImage: "/images/equipment/foresight-gcquad.jpg",
    logo: "/images/logos/foresight.png",
    description:
      "Four high-speed cameras capture every detail of impact with photographic precision. The GCQuad is the professional standard for camera-based measurement — compact, portable, and accurate indoors and out.",
    recommendation:
      "Best for: Golfers who want near-Trackman accuracy in a versatile, portable package. Works in any size room and can move between indoor and outdoor setups.",
  },
  {
    id: "uneekor-eye-xo2",
    name: "Uneekor EYE XO2",
    technology: "3-Camera Overhead System",
    accuracy: "±1.0°",
    dataPoints: "13 parameters",
    spinRate: "Full spin axis",
    clubData: true,
    outdoorCapable: false,
    mounting: "Ceiling / Overhead",
    price: "From $10,999",
    productImage: "/images/equipment/uneekor-eye-xo2.png",
    logo: "/images/logos/uneekor.webp",
    description:
      "Three overhead high-speed cameras track both ball and club data without occupying any floor space. Fixed ceiling mounting means zero setup time — just step up and swing.",
    recommendation:
      "Best for: Dedicated simulator rooms where ceiling mounting is possible. Excellent value with reliable accuracy and a clean, uncluttered bay.",
  },
];

export function getMonitorByName(name: string): Monitor | undefined {
  return monitors.find(
    (m) => m.name.toLowerCase() === name.toLowerCase()
  );
}
