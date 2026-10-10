"use client";
import { getToolComponent } from "./registry";

export default function ToolRenderer({ slug }: { slug: string }) {
  const Component = getToolComponent(slug);
  return <Component />;
}
