import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";
import { KnowledgeBrowser } from "@/components/knowledge-browser";

export const metadata: Metadata = { title: "Knowledge Base" };

export default function KnowledgePage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <PageHeader
        eyebrow="Module 03"
        title="Knowledge Base"
        subtitle="A searchable library of articles, fatwas, research papers, policy documents, awareness materials, videos and presentations."
      />
      <KnowledgeBrowser />
    </div>
  );
}
