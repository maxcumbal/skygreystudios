export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-black px-6 py-24 text-white sm:py-32">
      <div className="mx-auto grid max-w-[1500px] items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="overflow-hidden bg-neutral-950">
          <img src="/images/about.jpeg" alt="Einblick in die Filmproduktion bei SKYGREY Studios" loading="lazy" className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]" />
        </div>
        <div>
          <h2 id="about-heading" className="mb-10 text-[clamp(3.5rem,9vw,9rem)] font-black uppercase leading-[0.85] tracking-[-0.075em]">ABOUT<span className="text-white/35">.</span></h2>
          <p className="max-w-xl text-xl leading-relaxed text-white/85 sm:text-2xl">Ich bin Erich Joshua, Filmemacher und Gründer von SKYGREY Studios.</p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">Ich konzipiere und produziere authentische, emotionale Filme für Unternehmen und Marken.</p>
        </div>
      </div>
    </section>
  );
}
