"use client";
import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: "primary" | "ghost"; loading?: boolean; size?: "sm" | "md" | "lg"; }
export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", loading, size = "md", children, disabled, ...rest }, ref) => {
    const sizeCls = size === "sm" ? "px-3 py-2 text-xs" : size === "lg" ? "px-6 py-3 text-base" : "";
    const cls = variant === "primary" ? "btn-primary" : "btn-ghost";
    return (
      <button ref={ref} className={cn(cls, sizeCls, (loading || disabled) && "opacity-60 cursor-not-allowed", className)} disabled={loading || disabled} {...rest}>
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
