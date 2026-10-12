import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  {
    href: '/immobilienfilme',
    title: 'IMMOBILIENFILME',
    image: '/images/immobilien-cover.jpeg',
    alt: 'Immobilienaufnahme mit Wendeltreppe und offenem Wohnbereich',
    position: 'center 46%',
  },
  {
    href: '/projekte',
    title: 'PROJEKTE',
    image: '/images/projekte-cover.jpeg',
    alt: 'Filmteam mit professionellem Kamerarig bei einer Produktion',
    position: 'center 58%',
  },
];

export function FilmProjects() {
  return (
    <section id="projects" className="bg-black px-6 py-24 text-white sm:px-12 lg:px-20 md:py-36">
      <div className="mb-10">
        <h2 className="text-[clamp(3rem,9vw,9rem)] font-black leading-none tracking-[-.07em]">
          WORK<span className="text-white/35">.</span>
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {categories.map((category) => (
          <Link
            key={category.href}
            to={category.href}
            className="group block cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            aria-label={`${category.title} ansehen`}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#111] sm:aspect-[5/4] md:aspect-[4/5] lg:aspect-[5/4]">
              <img
                src={category.image}
                alt={category.alt}
                loading="lazy"
                className="h-full w-full object-cover brightness-[.83] transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.045] group-hover:brightness-100 group-focus-visible:brightness-100 motion-reduce:transition-none"
                style={{ objectPosition: category.position }}
              />
            </div>
            <div className="flex items-center justify-between gap-4 pt-5">
              <h3 className="text-[clamp(1.2rem,2.5vw,2.5rem)] font-bold tracking-[-.045em]">
                {category.title}
              </h3>
              <ArrowUpRight
                aria-hidden="true"
                className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
