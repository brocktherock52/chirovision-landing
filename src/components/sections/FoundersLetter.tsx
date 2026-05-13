import { Reveal } from "@/components/shared/Reveal";

export function FoundersLetter() {
  return (
    <section className="relative overflow-hidden bg-canvas py-20 sm:py-28">
      <div className="container">
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-2xl border hairline-strong bg-white/[0.02] p-8 sm:p-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-teal">
              A letter from the founder
            </p>
            <h2 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl md:text-4xl text-balance">
              I built ChiroVision because nobody else was going to.
            </h2>

            <div className="prose prose-invert mt-6 max-w-none text-[17px] leading-relaxed text-dim">
              <p>
                I have been at the table for forty years. I have read tens of thousands of films,
                marked them with my own pencil, sat next to patients and shown them what their
                spine is actually doing. For most of that time the software I had to use was
                either built by engineers who never saw a patient, or it lived on a single
                exam-room computer and could not be trusted with anything sensitive. So I built
                the tool I wanted. Local-only image processing. Real measurements. A workflow
                that respects how chiropractors actually read films. A billing form that does
                not make you switch tabs. If it helps one of your patients understand their
                care plan, my forty years were worth it.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border hairline-strong bg-teal/10 font-mono text-sm font-medium text-teal">
                EF
              </div>
              <div>
                <p className="font-display text-base font-semibold text-ink">
                  Dr. Eric Hal Feintuch, D.C., CCSD
                </p>
                <p className="text-xs text-dim">
                  Founder, Picture Perfect Health, LLC
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
