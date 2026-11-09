import type { Config } from "tailwindcss";

/**
 * Tokens, not hex literals. The palette was previously re-typed as raw hex in
 * ~25 files, so a single brand change meant a project-wide find-and-replace and
 * drift was inevitable (three different greys were in use for "secondary text").
 */
const config: Config = {
   content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         colors: {
            // Ground: three steps, so a raised surface reads as raised without
            // needing a border to prove it.
            ink: {
               DEFAULT: "#0a0a0a",
               raised: "#121212",
               overlay: "#171717",
               line: "rgba(255,255,255,0.09)",
               lineStrong: "rgba(255,255,255,0.16)",
            },
            // Text ramp. Every step clears 4.5:1 against `ink`, so any of them
            // is safe for body copy: DEFAULT 17.8:1, soft 11.4:1, muted 7.3:1,
            // faint 5.7:1. `faint` was #6e6e69 (3.86:1) and failed AA wherever
            // it carried real text -- footer, breadcrumbs, counts.
            cream: {
               DEFAULT: "#f2f2ef",
               soft: "#c9c9c4",
               muted: "#9a9a94",
               faint: "#8a8a85",
            },
            lime: {
               DEFAULT: "#dcff1a",
               soft: "#e9ff6e",
               dim: "rgba(220,255,26,0.14)",
            },
            // Status hues for permit/drone/fee signal. Tinted toward the
            // palette rather than stock red/amber/green.
            signal: {
               go: "#8fe388",
               warn: "#ffce5c",
               stop: "#ff7a6b",
            },
         },
         fontFamily: {
            sans: ["var(--font-sans)", "system-ui", "sans-serif"],
         },
         borderRadius: {
            card: "14px",
            panel: "18px",
         },
         boxShadow: {
            // Offset + soft blur. A zero-offset halo is decoration, not depth.
            raised: "0 1px 2px rgba(0,0,0,0.5), 0 8px 24px -12px rgba(0,0,0,0.9)",
            lifted: "0 4px 8px rgba(0,0,0,0.45), 0 18px 40px -16px rgba(0,0,0,0.95)",
            glow: "0 6px 20px -6px rgba(220,255,26,0.4)",
         },
         transitionTimingFunction: {
            // Exponential ease-out: fast departure, long settle. One curve for
            // the whole site so motion reads as a system.
            out: "cubic-bezier(0.16, 1, 0.3, 1)",
         },
         keyframes: {
            enter: {
               from: { opacity: "0", transform: "translateY(14px)" },
               to: { opacity: "1", transform: "translateY(0)" },
            },
            sheet: {
               from: { opacity: "0", transform: "translateY(-8px) scale(0.99)" },
               to: { opacity: "1", transform: "translateY(0) scale(1)" },
            },
         },
         animation: {
            enter: "enter 0.7s cubic-bezier(0.16,1,0.3,1) both",
            sheet: "sheet 0.25s cubic-bezier(0.16,1,0.3,1) both",
         },
      },
   },
   plugins: [],
};
export default config;
