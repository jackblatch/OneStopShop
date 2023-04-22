"use client";

import { routes } from "@/lib/routes";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <SignIn path={routes.signIn} routing="path" signUpUrl={routes.signUp} />
);

export default SignInPage;
