import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRef } from "react";
import { Button, Input } from "react-daisyui";
import { auth } from "~/utils/firebase.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get("email")!.toString();

  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.log("Error: ", (err as Error).message);
  }

  return redirect("/login");
};

const Reset = () => {
  const emailRef = useRef<HTMLInputElement>(null);

  return (
    <section className="flex grow justify-center items-center">
      <div className="container px-6 py-12 h-full">
        <div className="flex flex-col justify-center items-center flex-wrap h-full g-6">
          <div className="w-10/12 lg:w-8/12 xl:w-6/12">
            <div className="mb-6">
              <h1 className="text-4xl">Forgot password?</h1>
            </div>
            <Form method="post">
              <div className="pb-6">Enter the email address associated with your account</div>
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

              <Button type="submit" className="w-full px-4 py-2">
                Reset password
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reset;
