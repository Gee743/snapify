import Link from "next/link";

/**
 * A link, not a div with onClick. The previous version was unreachable by
 * keyboard and could not be middle-clicked or opened in a new tab.
 */
const Logo = ({ className = "" }: { className?: string }) => (
   <Link
      href="/"
      aria-label="Snapify home"
      className={`group flex shrink-0 items-center gap-2.5 text-[19px] font-semibold tracking-[-0.03em] text-cream ${className}`}
   >
      <svg
         width="30"
         height="30"
         viewBox="0 0 56 56"
         aria-hidden="true"
         className="transition-transform duration-500 ease-out group-hover:rotate-[-6deg]"
      >
         <rect width="56" height="56" rx="16" fill="#dcff1a" />
         <path
            d="M17 24v-7h7M39 24v-7h-7M17 32v7h7M39 32v7h-7"
            stroke="#0a0a0a"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
         />
         <circle cx="28" cy="28" r="4" fill="#0a0a0a" />
      </svg>
      Snapify
   </Link>
);

export default Logo;
