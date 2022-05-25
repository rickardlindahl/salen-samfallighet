import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

declare global {
  interface Window {
    ENV: {
      USE_FIREBASE_EMULATOR: boolean;
    };
  }
}

export async function loader() {
  return json({
    ENV: {
      USE_FIREBASE_EMULATOR: process.env.USE_FIREBASE_EMULATOR === "true",
    },
  });
}

export default function App() {
  const data: { ENV: Window["ENV"] } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
