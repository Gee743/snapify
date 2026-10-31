"use client";

import { FormEvent, useState } from "react";

const AdminLogin = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError("");
      setIsLoading(true);

      try {
         const response = await fetch("/api/admin/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
         });
         const result = await response.json();

         if (!response.ok) {
            setError(result.error || "Could not sign in.");
            return;
         }
         window.location.reload();
      } catch {
         setError("Could not reach the server. Check your connection and try again.");
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <main className="relative isolate flex min-h-[calc(100vh-6rem)] items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-12 text-[#f5f5f5]">
         <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
               background:
                  "radial-gradient(520px 420px at 0% 100%, rgba(220,255,26,.14), transparent 70%)",
            }}
         />
         <section className="w-full max-w-md rounded-2xl border border-white/10 bg-[#101010] p-7 shadow-2xl sm:p-9">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-[#b8b8b8]">
               <span className="h-2 w-2 rounded-full bg-[#dcff1a]" />
               Snapify team
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">Admin sign in</h1>
            <p className="mt-2 text-sm text-[#929292]">
               Manage the public spaces featured on Snapify.
            </p>
            <form onSubmit={onSubmit} className="mt-7 space-y-4">
               <label className="block text-sm font-medium text-[#d4d4d4]">
                  Username
                  <input
                     autoComplete="username"
                     required
                     value={username}
                     onChange={(event) => setUsername(event.target.value)}
                     className="mt-2 w-full rounded-lg border border-white/10 bg-[#161616] px-3.5 py-3 text-sm text-white outline-none transition focus:border-[#dcff1a]"
                  />
               </label>
               <label className="block text-sm font-medium text-[#d4d4d4]">
                  Password
                  <input
                     type="password"
                     autoComplete="current-password"
                     required
                     value={password}
                     onChange={(event) => setPassword(event.target.value)}
                     className="mt-2 w-full rounded-lg border border-white/10 bg-[#161616] px-3.5 py-3 text-sm text-white outline-none transition focus:border-[#dcff1a]"
                  />
               </label>
               {error && (
                  <p role="alert" className="text-sm text-[#ff8a7a]">
                     {error}
                  </p>
               )}
               <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg bg-[#dcff1a] px-4 py-3 text-sm font-semibold text-[#0a0a0a] transition hover:brightness-105 disabled:cursor-wait disabled:opacity-60"
               >
                  {isLoading ? "Signing in..." : "Sign in"}
               </button>
            </form>
         </section>
      </main>
   );
};

export default AdminLogin;
