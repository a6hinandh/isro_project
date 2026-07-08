import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** The signature glassmorphism surface used across the app. */
export const GlassPanel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("glass rounded-2xl", className)}
      {...props}
    />
  ),
);
GlassPanel.displayName = "GlassPanel";
