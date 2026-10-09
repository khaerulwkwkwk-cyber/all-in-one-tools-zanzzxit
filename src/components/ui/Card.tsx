import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("card", className)} {...rest} />;
}
