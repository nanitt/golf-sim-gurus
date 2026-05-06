import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  lift?: boolean;
}

export function Card({ className, lift = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "border border-white/8 bg-[#1c1c1c] p-6",
        lift && "card-lift",
        className
      )}
      {...props}
    />
  );
}
