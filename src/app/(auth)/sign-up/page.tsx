import React from "react";
import { redirect } from "next/navigation";

import { SignUpCard } from "@/components/auth/sign-up-card";
import { auth } from "@/server/auth";

const SignUpPage = async () => {
  const user = await auth();
  if (user) redirect("/");
  return (
    <div>
      <SignUpCard />
    </div>
  );
};

export default SignUpPage;
