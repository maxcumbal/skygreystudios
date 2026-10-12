const teamMembers = [
  { name: 'Erich Joshua Cisneros', role: 'Founder · Creative Director', image: '/images/erich_team.jpeg' },
  { name: 'Lina Rk', role: 'Social Media Managerin', image: '/images/lina_team.jpeg' },
  { name: 'Dardan Cisneros', role: 'Cutter', image: '/images/dardan_team.jpeg' },
  { name: 'Jennifer Ast', role: 'Sales Assistentin', image: '/images/jennifer_team.jpeg' },
  { name: 'Maksim', role: '', image: '/images/maksim_team.jpeg' },
];

export function Team() {
  return (
    <section id="team" aria-labelledby="team-heading" className="bg-black px-6 pb-24 pt-10 text-white sm:pb-32">
      <div className="mx-auto max-w-[1500px]">
        <h2 id="team-heading" className="mb-12 text-[clamp(3.5rem,10vw,10rem)] font-black uppercase leading-[0.85] tracking-[-0.075em] sm:mb-16">THE TEAM<span className="text-white/35">.</span></h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-5">
          {teamMembers.map((member) => (
            <article key={member.name} className="group min-w-0">
              <div className="overflow-hidden bg-neutral-950">
                <img src={member.image} alt={member.name} loading="lazy" className="aspect-[3/4] w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.045]" />
              </div>
              <h3 className="mt-4 text-sm font-semibold leading-snug sm:text-base">{member.name}</h3>
              {member.role && <p className="mt-1 text-xs text-white/50 sm:text-sm">{member.role}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
