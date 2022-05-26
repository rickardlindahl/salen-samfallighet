import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserSession } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }): Promise<{ email: string }> => {
  const session = await requireUserSession(request);

  const email: string = await session.get("email");

  return {
    email,
  };
};

export default function Index() {
  const { email } = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      {email && <p>Hello, {email}</p>}
    </div>
  );
}
