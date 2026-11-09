import Link from "next/link";
import Container from "./components/Container";

export const metadata = {
   title: "Page not found",
   robots: { index: false, follow: true },
};

const NotFound = () => {
   return (
      <main className="flex min-h-[calc(100vh-6rem)] items-center bg-[#0a0a0a] pb-16 pt-4 text-[#f5f5f5]">
         <Container>
            <div className="mx-auto max-w-xl py-20 text-center">
               <p className="mb-3 text-[10px] font-semibold tracking-[0.2em] text-[#dcff1a]">
                  404
               </p>
               <h1 className="text-3xl font-semibold tracking-tight">
                  We couldn&apos;t find that place.
               </h1>
               <p className="mt-4 text-sm leading-6 text-[#929292]">
                  It may have been removed, or the link might be wrong. Browse the full list of
                  free public spaces instead.
               </p>
               <Link
                  href="/community"
                  className="mt-7 inline-flex rounded-lg bg-[#dcff1a] px-5 py-3 text-sm font-semibold text-[#0a0a0a] transition hover:brightness-105"
               >
                  Explore free spaces
               </Link>
            </div>
         </Container>
      </main>
   );
};

export default NotFound;
