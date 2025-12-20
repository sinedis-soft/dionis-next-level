// components/green-card/GreenCardInfoBlocks.tsx
import Image from "next/image";
import type { GreenCardPageDictionary } from "@/dictionaries/greenCardPage";
import DeferredHydration from "@/components/DeferredHydration";

export default function GreenCardInfoBlocks({
  dict,
  coverageImageSrc = "/green-card/coverage.webp", // поставь свой путь (можно пока заглушку)
}: {
  dict: Pick<GreenCardPageDictionary, "howItWorks" | "coverage">;
  coverageImageSrc?: string;
}) {
  return (
    <>
      {/* HOW IT WORKS */}
      <DeferredHydration rootMargin="800px" minDelayMs={150}>
        <section className="py-12 sm:py-16 bg-white [overflow-anchor:none]" aria-labelledby="how-it-works-heading">
          <div className="max-w-6xl mx-auto px-4">
            <h2
              id="how-it-works-heading"
              className="text-2xl sm:text-3xl font-semibold text-[#1A3A5F] text-center"
            >
              {dict.howItWorks.title}
            </h2>

            <p className="mt-2 text-center text-gray-600">
              {dict.howItWorks.subtitle}
            </p>

            {/* линия + шаги */}
            <div className="mt-10">
              <div className="hidden md:block relative">
                <div className="absolute left-0 right-0 top-[18px] h-px bg-gray-200" />
                <div className="grid grid-cols-4 gap-6">
                  {dict.howItWorks.steps.map((s, idx) => (
                    <div key={idx} className="text-center">
                      <div className="mx-auto h-9 w-9 rounded-full bg-[#0F2742] text-white flex items-center justify-center text-sm font-semibold">
                        {idx + 1}
                      </div>
                      <div className="mt-3 text-sm font-extrabold text-[#1A3A5F]">
                        {s.title}
                      </div>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                        {s.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* мобильный вид */}
              <div className="md:hidden grid gap-4">
                {dict.howItWorks.steps.map((s, idx) => (
                  <article key={idx} className="card bg-white border border-gray-200 shadow-sm p-5">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 h-9 w-9 rounded-full bg-[#0F2742] text-white flex items-center justify-center text-sm font-semibold">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-sm font-extrabold text-[#1A3A5F]">
                          {s.title}
                        </div>
                        <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                          {s.text}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </DeferredHydration>

      {/* COVERAGE */}
      <DeferredHydration rootMargin="800px" minDelayMs={150}>
        <section className="py-12 sm:py-16 bg-white [overflow-anchor:none]" aria-labelledby="coverage-heading">
          <div className="max-w-6xl mx-auto px-4">
            <article className="rounded-2xl bg-[#0f2238] text-white overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
                {/* left */}
                <div className="p-6 sm:p-10">
                  <h2 id="coverage-heading" className="text-2xl sm:text-3xl font-semibold">
                    {dict.coverage.title}
                  </h2>

                  <div className="mt-8 space-y-6">
                    {dict.coverage.items.map((it, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="mt-1 h-8 w-8 shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
                            <span className="block h-2 w-2 rounded-full bg-[#EBCA45]" />
                        </div>
                        <div>
                            <div className="text-sm font-extrabold">
                                {it.title}
                            </div>
                            <p className="mt-1 text-sm text-white/80 leading-relaxed">
                                {it.text}
                            </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* right */}
                <div className="p-6 sm:p-10 flex items-center justify-center">
                    <div className="w-full max-w-md aspect-[4/3] bg-white/5 flex items-center justify-center relative">
                        <Image
                        src="/green-card/map2.png"
                        alt={dict.coverage.imageAlt}
                        fill
                        className="object-cover opacity-90"
                        sizes="(min-width: 1024px) 520px, 90vw"
                        priority={false}
                        />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </DeferredHydration>
    </>
  );
}
