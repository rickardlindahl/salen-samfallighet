import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { Theme } from "react-daisyui";
import { Layout } from "./components/Layout";
import { SessionContext } from "./components/SessionContext";
import styles from "./styles/app.css";
import type { User } from "./types/user";
import { getUserFromSession, getUserSession } from "./utils/session.server";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Salen Samfällighetsförening",
  viewport: "width=device-width,initial-scale=1",
});

declare global {
  interface Window {
    ENV: {
      USE_FIREBASE_EMULATOR: boolean;
    };
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getUserSession(request);

  const user = await getUserFromSession(session);

  return json({
    isLoggedIn: session.has("idToken"),
    user,
    ENV: {
      USE_FIREBASE_EMULATOR: process.env.USE_FIREBASE_EMULATOR === "true",
    },
  });
};

interface LoaderData {
  ENV: Window["ENV"];
  isLoggedIn: boolean;
  user: User;
}

const App = () => {
  const { ENV, isLoggedIn, user }: LoaderData = useLoaderData();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Theme dataTheme="dark" className="font-sans flex flex-col min-h-screen">
          <SessionContext.Provider value={{ isLoggedIn, user: isLoggedIn ? user : undefined }}>
            <Layout>
              <Outlet />
            </Layout>
          </SessionContext.Provider>
        </Theme>
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default App;
