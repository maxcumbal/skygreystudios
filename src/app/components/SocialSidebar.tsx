import { Instagram } from 'lucide-react';

/** A single, understated social link shared by the site pages. */
export function SocialSidebar() {
  return (
    <aside className="fixed right-5 bottom-6 z-40 hidden lg:block" aria-label="Social Media">
      <a
        href="https://instagram.com/skygreystudios"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="SKYGREY Studios auf Instagram besuchen (öffnet in neuem Tab)"
        title="Instagram"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white/75 backdrop-blur-md transition-all duration-300 hover:border-white/60 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        <Instagram size={19} strokeWidth={1.7} aria-hidden="true" />
      </a>
    </aside>
  );
}
