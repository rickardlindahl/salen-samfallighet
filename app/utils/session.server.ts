import type { Session } from "@remix-run/node";
import { createCookieSessionStorage, json, redirect } from "@remix-run/node";
import type { User } from "~/types/user";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secure: true,
    secrets: [sessionSecret],
    sameSite: "lax", // to help with CSRF
    path: "/",
    maxAge: 60 * 60 * 24 * 5, // 5 days
    httpOnly: true,
  },
});

export const getUserSession = (request: Request): Promise<Session> => {
  return getSession(request.headers.get("Cookie"));
};

export const getUserFromSession = async (session: Session): Promise<User> => {
  const [email, idToken] = await Promise.all<[string, string]>([session.get("email"), session.get("idToken")]);

  return {
    email,
    idToken,
  };
};

export async function requireUserSession(request: Request) {
  const session = await getUserSession(request);

  if (!session.has("idToken")) {
    throw redirect("/login");
  }

  return session;
}

export async function createUserSession(user: User, redirectTo?: string) {
  try {
    const session = await getSession();
    session.set("idToken", user.idToken);
    session.set("email", user.email);

    if (redirectTo) {
      return redirect(redirectTo, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    return json(
      { status: "success" },
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
        status: 201,
      },
    );
  } catch (error) {
    return json(
      {
        errorCode: "session/create",
        errorMessage: "Could not create session: " + error,
      },
      {
        status: 500,
      },
    );
  }
}
