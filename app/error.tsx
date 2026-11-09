"use client";

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface ErrorStateProps {
   error: Error & { digest?: string };
   reset: () => void;
}

/**
 * Route error boundary. Next.js supplies `reset` to re-render the segment; the
 * previous version dropped it, so a transient failure left the visitor on a
 * dead "Uh oh" screen with no way forward but the browser's back button.
 */
const ErrorState: React.FC<ErrorStateProps> = ({ error, reset }) => {
   useEffect(() => {
      console.error(error);
   }, [error]);

   return (
      <EmptyState
         title="Something went wrong"
         subTitle="We could not load this page. It is usually temporary — trying again often works."
         onRetry={reset}
         showReset
      />
   );
};

export default ErrorState;
