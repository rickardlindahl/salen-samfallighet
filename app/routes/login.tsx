import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useSubmit } from "@remix-run/react";
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useRef, useState } from "react";
import { Button, Input } from "react-daisyui";
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
    <section className="flex grow justify-center items-center">
      <div className="container px-6 py-12 h-full">
        <div className="flex flex-col justify-center items-center flex-wrap h-full g-6">
          <div className="w-10/12 lg:w-8/12 xl:w-6/12">
            <div className="mb-6">
              <h1 className="text-4xl">Login</h1>
            </div>
            <Form method="post" onSubmit={handleLogin}>
              <div className="mb-6">
                <Input
                  type="text"
                  placeholder="Email address"
                  ref={emailRef}
                  name="email"
                  required
                  className="form-control block w-full px-4 py-2 text-base"
                />
              </div>
              <div className="mb-6">
                <Input
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                  name="password"
                  required
                  className="form-control block w-full px-4 py-2 text-base"
                />
              </div>

              <input type="hidden" name="idToken" ref={idTokenRef} />

              <div className="flex justify-between items-center mb-6">
                <Link to="/reset">Forgot password?</Link>
              </div>
              <Button type="submit" className="w-full px-4 py-2">
                Sign in
              </Button>

              {error?.code && (
                <p>
                  <em>Login failed: {error.message}</em>
                </p>
              )}
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
