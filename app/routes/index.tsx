import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { User } from "~/types/user";
import { getUserFromSession, requireUserSession } from "~/utils/session.server";

interface LoaderData {
  user: User;
}

export const loader: LoaderFunction = async ({ request }) => {
  const session = await requireUserSession(request);
  const user = await getUserFromSession(session);

  return json<LoaderData>({ user });
};

const Index = () => {
  const { user } = useLoaderData() as LoaderData;

  return (
    <section className="flex grow justify-center items-center">
      <div className="container px-6 py-12 h-full">
        <h1>Welcome to Remix</h1>
        {user && <p>Hello, {user.email}</p>}
        <Link to="/posts">Posts</Link>
      </div>
    </section>
  );
};

export default Index;
