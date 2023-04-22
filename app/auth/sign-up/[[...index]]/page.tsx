"use client";

import { routes } from "@/lib/routes";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <SignUp path={routes.signUp} routing="path" signInUrl={routes.signIn} />
);

export default SignUpPage;
