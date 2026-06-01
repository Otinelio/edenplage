import type { ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";

export function SiteShell({ children }: { children: ReactNode }) {
  const loc = useLocation();
  // Hide chrome on standalone routes
  const hideChrome =
    loc.pathname.startsWith("/spot/") ||
    loc.pathname.startsWith("/reception") ||
    loc.pathname.startsWith("/admin");

  if (hideChrome) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--seafoam)]">
      <Navbar />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
