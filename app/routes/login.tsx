import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import type { FirebaseOptions } from "firebase/app";
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useRef, useState } from "react";
import { firebaseConfig } from "~/firebase.config";
import { createUserSession, getUserSession } from "~/utils/session.server";

interface ErrorResponse {
  code: string;
  message: string;
}

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const idToken = formData.get("idToken")!.toString();
    const displayName = formData.get("displayName")!.toString();

    return createUserSession({ idToken, displayName }, "/");
  } catch (error) {
    return json(
      {
        code: "login/general",
        message: "There was a problem logging in",
      },
      { status: 500 },
    );
  }
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<{ displayName: string; firebaseConfig: FirebaseOptions }> => {
  const session = await getUserSession(request);
  const displayName: string = await session.get("displayName");

  return {
    displayName,
    firebaseConfig,
  };
};

export default function Login() {
  const [error, setError] = useState<ErrorResponse | null>(null);
  const submit = useSubmit();
  const { firebaseConfig } = useLoaderData();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const idTokenRef = useRef<HTMLInputElement>(null);
  const displayNameRef = useRef<HTMLInputElement>(null);

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async evt => {
    evt.preventDefault();

    try {
      initializeApp(firebaseConfig);
      const auth = getAuth();
      // TODO: add an env check for USE_EMULATOR
      // https://remix.run/docs/en/v1.0.6/guides/envvars#browser-environment-variables
      if (!auth.emulatorConfig) {
        console.log("connectAuthEmulator");
        connectAuthEmulator(auth, "http://localhost:9099");
      }

      const { user } = await signInWithEmailAndPassword(auth, emailRef.current!.value, passwordRef.current!.value);
      const idToken = await user.getIdToken();

      await signOut(auth);

      idTokenRef.current!.value = idToken;
      displayNameRef.current!.value = user.displayName ?? "";

      submit(evt.target as HTMLFormElement);
    } catch (error) {
      setError(error as ErrorResponse);
    }
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Login</h1>
      <section>
        <Form method="post" onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" ref={emailRef} />
          <br />

          <label htmlFor="email">Password:</label>
          <input type="password" id="password" name="password" ref={passwordRef} />

          <input type="hidden" name="idToken" ref={idTokenRef} />
          <input type="hidden" name="displayName" ref={displayNameRef} />
          <br />
          <button type="submit">Login</button>
          {error?.code && (
            <p>
              <em>Login failed: {error.message}</em>
            </p>
          )}
        </Form>
      </section>
    </div>
  );
}
