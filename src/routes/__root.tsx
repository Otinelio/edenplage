import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteShell } from "@/components/SiteShell";
import { SplashScreen } from "@/components/SplashScreen";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--seafoam)] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-[family-name:var(--font-heading)] text-[var(--ocean)]">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-[var(--ocean)]">Page introuvable</h2>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-full bg-[var(--coral)] px-5 py-2.5 text-sm font-semibold text-white hover:scale-105 transition-transform">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--seafoam)] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-[var(--ocean)]">Cette page n'a pas pu se charger</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">Une erreur est survenue. Réessayez ou retournez à l'accueil.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-[var(--coral)] px-5 py-2.5 text-sm font-semibold text-white">
            Réessayer
          </button>
          <a href="/" className="rounded-full border border-[var(--ocean)] px-5 py-2.5 text-sm font-semibold text-[var(--ocean)]">
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#1A3A5C" },
      { title: "Eden Plage — Le paradis au bord de la mer · Lomé, Togo" },
      { name: "description", content: "Restaurant-bar de bord de mer à Lomé. Grillades, cocktails maison et soirées face à l'océan, Boulevard du Mono." },
      { property: "og:title", content: "Eden Plage — Le paradis au bord de la mer · Lomé, Togo" },
      { property: "og:description", content: "Restaurant-bar de bord de mer à Lomé. Grillades, cocktails maison et soirées face à l'océan, Boulevard du Mono." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Eden Plage" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Eden Plage — Le paradis au bord de la mer · Lomé, Togo" },
      { name: "twitter:description", content: "Restaurant-bar de bord de mer à Lomé. Grillades, cocktails maison et soirées face à l'océan, Boulevard du Mono." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5f871266-feaf-4e43-9d0a-a3d888184a87/id-preview-246a130f--0cc40dd9-7aeb-4540-ad79-4b98c381ec93.lovable.app-1779284053926.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5f871266-feaf-4e43-9d0a-a3d888184a87/id-preview-246a130f--0cc40dd9-7aeb-4540-ad79-4b98c381ec93.lovable.app-1779284053926.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SplashScreen />
      <SiteShell>
        <Outlet />
      </SiteShell>
    </QueryClientProvider>
  );
}
