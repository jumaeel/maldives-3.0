"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { CheckCircleIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { Card, cn } from "./ui";
import { helplineServices, specialists } from "@/lib/initiatives";

const schema = z.object({
  service: z.string().min(1, "Choose the kind of help you need."),
  name: z.string().min(2, "Tell us what to call you (a nickname is fine)."),
  contact: z.string().min(5, "A phone number or email so we can reach you."),
  mode: z.enum(["Online", "In person"], { message: "Pick how you'd like to meet." }),
  urgency: z.enum(["Routine", "Soon", "Urgent"], { message: "How soon do you need help?" }),
  message: z.string().min(15, "Briefly describe what you're going through (15+ characters)."),
  consent: z.literal(true, { message: "Please agree to the confidentiality terms." }),
});

type FormValues = z.infer<typeof schema>;

export function HelplineBooking() {
  const [done, setDone] = useState<FormValues | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const service = watch("service");
  const matched = specialists.filter((s) => s.service === service).slice(0, 2);

  async function onSubmit(values: FormValues) {
    await new Promise((r) => setTimeout(r, 700));
    setDone(values);
    reset();
  }

  if (done) {
    const svc = helplineServices.find((s) => s.key === done.service);
    return (
      <Card className="p-8 text-center">
        <CheckCircleIcon className="mx-auto h-14 w-14 text-emerald-500" />
        <h3 className="mt-4 font-display text-2xl font-semibold">Request received</h3>
        <p className="mt-2 text-text-muted">
          Thank you, {done.name}. Your confidential request for{" "}
          <strong>{svc?.name}</strong> ({done.mode}, {done.urgency.toLowerCase()}) has been logged.
          A coordinator will match you with the right specialist and confirm a time shortly.
        </p>
        <button
          onClick={() => setDone(null)}
          className="mt-6 rounded-xl bg-emerald-600 px-5 py-2.5 font-semibold text-white transition hover:bg-emerald-700"
        >
          Book another
        </button>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8">
      <div className="mb-5 flex items-center gap-2 rounded-lg bg-brand-soft px-3 py-2 text-sm text-brand">
        <LockClosedIcon className="h-4 w-4" /> Private &amp; confidential — only matched specialists can see your request.
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <Field label="What kind of help do you need?" error={errors.service?.message}>
          <div className="grid gap-2 sm:grid-cols-2">
            {helplineServices.map((s) => (
              <label key={s.key} className="cursor-pointer">
                <input type="radio" value={s.key} {...register("service")} className="peer sr-only" />
                <span className="block rounded-xl border border-border p-3 text-sm transition peer-checked:border-emerald-500 peer-checked:bg-brand-soft hover:border-brand/40">
                  <span className="font-semibold">{s.name}</span>
                  <span className="mt-0.5 block text-xs text-text-muted">{s.providers} specialists · {s.avgWait}</span>
                </span>
              </label>
            ))}
          </div>
        </Field>

        {matched.length > 0 && (
          <div className="rounded-xl border border-dashed border-border p-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">Specialists who could help</p>
            <ul className="mt-2 space-y-1.5">
              {matched.map((m) => (
                <li key={m.id} className="flex items-center justify-between text-sm">
                  <span>{m.name} · <span className="text-text-muted">{m.role}</span></span>
                  <span className="text-xs text-brand">{m.nextSlot}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name or nickname" error={errors.name?.message}>
            <input {...register("name")} placeholder="e.g. Ahmed, or 'Brother from Malé'" className={input(errors.name)} />
          </Field>
          <Field label="Phone or email" error={errors.contact?.message}>
            <input {...register("contact")} placeholder="How we reach you privately" className={input(errors.contact)} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Meeting preference" error={errors.mode?.message}>
            <Pills name="mode" options={["Online", "In person"]} register={register} />
          </Field>
          <Field label="How soon?" error={errors.urgency?.message}>
            <Pills name="urgency" options={["Routine", "Soon", "Urgent"]} register={register} />
          </Field>
        </div>

        <Field label="Describe what you're going through" error={errors.message?.message}>
          <textarea
            {...register("message")}
            rows={4}
            placeholder="Share as much or as little as you're comfortable with. This is safe."
            className={input(errors.message)}
          />
        </Field>

        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" {...register("consent")} className="mt-0.5 h-4 w-4 rounded border-border text-emerald-600" />
          <span className={errors.consent ? "text-red-600" : "text-text-muted"}>
            I understand my request is confidential and will only be shared with the specialist matched to help me.
          </span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
        >
          {isSubmitting ? "Sending securely…" : "Request an appointment"}
        </button>
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

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function Pills({
  name,
  options,
  register,
}: {
  name: "mode" | "urgency";
  options: string[];
  register: ReturnType<typeof useForm<FormValues>>["register"];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label key={o} className="cursor-pointer">
          <input type="radio" value={o} {...register(name)} className="peer sr-only" />
          <span className="inline-block rounded-lg border border-border px-3.5 py-2 text-sm font-medium transition peer-checked:border-emerald-500 peer-checked:bg-brand-soft peer-checked:text-brand hover:border-brand/40">
            {o}
          </span>
        </label>
      ))}
    </div>
  );
}
