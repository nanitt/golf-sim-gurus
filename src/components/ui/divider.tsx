import { cn } from "@/lib/utils/cn";

interface DividerProps {
  className?: string;
  variant?: "brass" | "border";
}

export function Divider({ className, variant = "brass" }: DividerProps) {
  return (
    <div
      className={cn(
        variant === "brass" ? "brass-divider" : "h-px bg-border",
        className
      )}
    />
  );
}
