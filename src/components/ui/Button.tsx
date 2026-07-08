import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "nebula";
type Size = "sm" | "md" | "lg" | "icon";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-500 text-white hover:bg-accent-600 shadow-lg shadow-accent-500/20",
  secondary:
    "glass text-slate-100 hover:bg-white/10 hover:border-white/20",
  ghost: "text-slate-300 hover:bg-white/10 hover:text-white",
  danger: "bg-red-500/80 text-white hover:bg-red-500",
  nebula:
    "bg-nebula-400 text-space-950 hover:bg-nebula-500 shadow-lg shadow-nebula-400/25",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg gap-1.5",
  md: "px-4 py-2 text-sm rounded-lg gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2",
  icon: "p-2 rounded-lg",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <motion.button
      ref={ref}
      type={type}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center font-semibold transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...(props as HTMLMotionProps<"button">)}
    />
  ),
);
Button.displayName = "Button";
