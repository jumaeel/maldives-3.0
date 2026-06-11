import Link from "next/link";
import { Suspense } from "react";
import type { Metadata } from "next";
import { PlusIcon } from "@heroicons/react/24/outline";
import { PageHeader } from "@/components/ui";
import { IssueList } from "@/components/issue-list";

export const metadata: Metadata = { title: "Issues" };

export default function IssuesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <PageHeader
        eyebrow="Module 02"
        title="Issue Management"
        subtitle="Every societal issue — researched, evidenced, scholar-reviewed, and tracked from submission to implementation."
        action={
          <Link
            href="/issues/new"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 font-semibold text-white transition hover:bg-emerald-700"
          >
            <PlusIcon className="h-5 w-5" /> Submit Issue
          </Link>
        }
      />
      <Suspense fallback={<p className="text-text-muted">Loading issues…</p>}>
        <IssueList />
      </Suspense>
    </div>
  );
}
