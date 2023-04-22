"use client";

import { routes } from "@/lib/routes";
import { SignIn } from "@clerk/nextjs";

const SignInWrapper = () => (
  <>
    <SignIn path={routes.signIn} routing="path" signUpUrl={routes.signUp} />
  </>
);

export default SignInWrapper;
