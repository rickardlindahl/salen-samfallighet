import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import { Theme } from "react-daisyui";
import { Layout } from "./components/Layout";
import styles from "./styles/app.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

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

export const loader: LoaderFunction = async () => {
  return json({
    ENV: {
      USE_FIREBASE_EMULATOR: process.env.USE_FIREBASE_EMULATOR === "true",
    },
  });
};

const App = () => {
  const data: { ENV: Window["ENV"] } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Theme dataTheme="dark" className="font-sans flex flex-col min-h-screen">
          <Layout>
            <Outlet />
          </Layout>
        </Theme>
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
};

export default App;
