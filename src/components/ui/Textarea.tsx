"use client";
import { forwardRef, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...rest }, ref) => <textarea ref={ref} className={cn("input-base font-mono text-xs leading-relaxed", className)} {...rest} />
);
Textarea.displayName = "Textarea";
