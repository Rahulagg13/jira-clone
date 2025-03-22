"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

interface AuthLayout {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayout) => {
  const pathname = usePathname();
  const blurVariant = {
    initial: {
      opacity: 0,
      filter: "blur(10px)",
    },
    animate: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 25,
        stiffnes: 50,
        duration: 0.8,
        ease: "easeIn",
      },
    },
  };

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <motion.div
          key={pathname}
          variants={blurVariant}
          initial="initial"
          animate="animate"
        >
          <nav className="flex justify-between items-center">
            <Image src="/logo.svg" alt="logo" width={152} height={56} />
            <Button variant="secondary" asChild>
              <Link href={pathname === "/sign-up" ? "/sign-in" : "/sign-up"}>
                {pathname === "/sign-up" ? "Login" : " Sign Up"}
              </Link>
            </Button>
          </nav>
          <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
            {children}
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default AuthLayout;
