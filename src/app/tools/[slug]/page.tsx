import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ToolRenderer from "@/components/tools/ToolRenderer";
import { TOOLS } from "@/lib/tools";

interface Params { slug: string; }

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) return { title: "Tool Not Found" };
  return { title: tool.name + " — Fast Online Tool", description: tool.description };
}

export default async function ToolPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) notFound();
  return (
    <ToolLayout slug={tool.slug} title={tool.name} description={tool.description}>
      <ToolRenderer slug={tool.slug} />
    </ToolLayout>
  );
}
