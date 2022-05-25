import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { FirebaseOptions } from "firebase/app";
import { firebaseConfig } from "~/firebase.config";
import { requireUserSession } from "~/utils/session.server";

export const loader: LoaderFunction = async ({
  request,
}): Promise<{ displayName: string; firebaseConfig: FirebaseOptions }> => {
  const session = await requireUserSession(request);

  const displayName: string = await session.get("displayName");

  return {
    displayName,
    firebaseConfig,
  };
};

export default function Index() {
  const { displayName: username } = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      {username && <p>Hello, {username}</p>}
    </div>
  );
}
