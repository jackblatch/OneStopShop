"use client";

import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <SignUp path="/auth/sign-up" routing="path" signInUrl="/auth/sign-in" />
);

export default SignUpPage;
