import dynamic from "next/dynamic";

export const RoomBuilder = dynamic(
  () => import("./scene").then((mod) => ({ default: mod.RoomBuilder })),
  { ssr: false }
);

export type { RoomBuilderProps } from "./scene";
