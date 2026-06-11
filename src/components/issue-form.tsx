"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Card, cn } from "./ui";
import { categories } from "@/lib/data";

const SEVERITIES = ["Low", "Moderate", "High", "Critical"] as const;

const schema = z.object({
  title: z.string().min(8, "Give a clear title (at least 8 characters).").max(120),
  category: z.string().min(1, "Choose a category."),
  location: z.string().min(2, "Where is this happening?"),
  severity: z.enum(SEVERITIES, { message: "Select a severity." }),
  description: z.string().min(30, "Describe the issue in at least 30 characters."),
  evidence: z.string().optional(),
  consent: z.literal(true, { message: "Please confirm before submitting." }),
});

type FormValues = z.infer<typeof schema>;

export function IssueForm() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { severity: undefined, consent: undefined as unknown as true },
  });

  async function onSubmit(values: FormValues) {
    await new Promise((r) => setTimeout(r, 600)); // simulate API
    setSubmitted(values);
    reset();
  }

  if (submitted) {
    return (
      <Card className="mt-6 p-8 text-center">
        <CheckCircleIcon className="mx-auto h-14 w-14 text-emerald-500" />
        <h2 className="mt-4 font-display text-2xl font-semibold">Issue submitted</h2>
        <p className="mt-2 text-text-muted">
          “{submitted.title}” has entered the review pipeline with status <strong>Submitted</strong>.
          A Core Team member will triage it shortly.
        </p>
        <button
          onClick={() => setSubmitted(null)}
          className="mt-6 rounded-xl bg-emerald-600 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-700"
        >
          Submit another
        </button>
      </Card>
    );
  }

  return (
    <Card className="mt-6 p-6 sm:p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <Field label="Title" error={errors.title?.message}>
          <input
            {...register("title")}
            placeholder="e.g. Sports events scheduled during prayer times"
            className={input(errors.title)}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Category" error={errors.category?.message}>
            <select {...register("category")} className={input(errors.category)} defaultValue="">
              <option value="" disabled>Select a sector…</option>
              {categories.map((c) => (
                <option key={c.key} value={c.key}>{c.name}</option>
              ))}
            </select>
          </Field>

          <Field label="Location" error={errors.location?.message}>
            <input {...register("location")} placeholder="e.g. Malé, Addu, National" className={input(errors.location)} />
          </Field>
        </div>

        <Field label="Severity" error={errors.severity?.message}>
          <div className="flex flex-wrap gap-2">
            {SEVERITIES.map((s) => (
              <label key={s} className="cursor-pointer">
                <input type="radio" value={s} {...register("severity")} className="peer sr-only" />
                <span className="inline-block rounded-lg border border-border px-4 py-2 text-sm font-medium transition peer-checked:border-emerald-500 peer-checked:bg-brand-soft peer-checked:text-brand hover:border-brand/40">
                  {s}
                </span>
              </label>
            ))}
          </div>
        </Field>

        <Field label="Description" error={errors.description?.message}>
          <textarea
            {...register("description")}
            rows={5}
            placeholder="Describe the issue, who it affects, and why it matters…"
            className={input(errors.description)}
          />
        </Field>

        <Field label="Initial evidence or sources (optional)" error={errors.evidence?.message}>
          <textarea
            {...register("evidence")}
            rows={3}
            placeholder="Links, statistics, references to Quran/Hadith, field observations…"
            className={input(errors.evidence)}
          />
        </Field>

        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" {...register("consent")} className="mt-0.5 h-4 w-4 rounded border-border text-emerald-600" />
          <span className={errors.consent ? "text-red-600" : "text-text-muted"}>
            I confirm this submission is accurate, sincere, and intended for the benefit of the community.
          </span>
        </label>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
          >
            {isSubmitting ? "Submitting…" : "Submit Issue"}
          </button>
          <button type="button" onClick={() => reset()} className="text-sm font-medium text-text-muted hover:text-text">
            Clear
          </button>
        </div>
      </form>
    </Card>
  );
}

function input(error?: unknown) {
  return cn(
    "w-full rounded-lg border bg-surface px-3 py-2.5 text-sm outline-none transition focus:border-brand/60",
    error ? "border-red-400" : "border-border"
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
