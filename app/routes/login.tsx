import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useSubmit } from "@remix-run/react";
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useRef, useState } from "react";
import { getFirebaseConfig } from "~/firebase.config";
import { createUserSession } from "~/utils/session.server";

interface ErrorResponse {
  code: string;
  message: string;
}

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const idToken = formData.get("idToken")!.toString();
    const email = formData.get("email")!.toString();

    return createUserSession({ idToken, email }, "/");
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

const Login = () => {
  const [error, setError] = useState<ErrorResponse | null>(null);
  const submit = useSubmit();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const idTokenRef = useRef<HTMLInputElement>(null);

  const handleLogin: React.FormEventHandler<HTMLFormElement> = async evt => {
    evt.preventDefault();

    try {
      initializeApp(getFirebaseConfig(window.ENV.USE_FIREBASE_EMULATOR));
      const auth = getAuth();

      if (window.ENV.USE_FIREBASE_EMULATOR && !auth.emulatorConfig) {
        connectAuthEmulator(auth, "http://localhost:9099");
      }

      const { user } = await signInWithEmailAndPassword(auth, emailRef.current!.value, passwordRef.current!.value);
      const idToken = await user.getIdToken();

      await signOut(auth);

      idTokenRef.current!.value = idToken;

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
          <input type="email" id="email" name="email" ref={emailRef} />
          <br />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" ref={passwordRef} />

          <input type="hidden" name="idToken" ref={idTokenRef} />
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
};

export default Login;
