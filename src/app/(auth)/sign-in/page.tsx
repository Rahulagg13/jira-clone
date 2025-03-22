import React from "react";

import { SignInCard } from "@/components/auth/sign-in-card";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";

const SignInPage = async () => {
  const user = await auth();
  if (user) redirect("/");
  return (
    <div>
      <SignInCard />
    </div>
  );
};

export default SignInPage;
