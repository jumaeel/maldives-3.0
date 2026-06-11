import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { PageHeader } from "@/components/ui";
import { IssueForm } from "@/components/issue-form";

export const metadata: Metadata = { title: "Submit an Issue" };

export default function NewIssuePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/issues" className="inline-flex items-center gap-1.5 text-sm text-text-muted transition hover:text-brand">
        <ArrowLeftIcon className="h-4 w-4" /> All issues
      </Link>
      <div className="mt-4">
        <PageHeader
          title="Submit a Societal Issue"
          subtitle="Volunteers and members can raise issues affecting Maldivian society. Submissions enter the review pipeline before publication."
        />
      </div>
      <IssueForm />
    </div>
  );
}
