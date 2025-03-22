"use client";
import { useTransition } from "react";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DottedSeparator } from "./dotted-separator";
import { LoaderCircle, LogOut } from "lucide-react";
import { handleLogout } from "@/actions/auth/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UserButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { data: userAuth } = useSession();
  if (!userAuth || !userAuth.user) return null;
  const { username, email } = userAuth.user;
  const avatarFallback = username
    ? username[0].toUpperCase()
    : email[0].toUpperCase();

  const onSubmit = () => {
    startTransition(async () => {
      try {
        await handleLogout();
        toast.success("User Signed Out Successfully");
        router.push("/sign-in");
      } catch (error) {
        console.log("logout", error);
        toast.error("Unable to logout user. Please try again.");
      }
    });
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col justify-center items-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] border border-neutral-300">
            <AvatarFallback className="bg-neutral-200 text-xl font-medium text-neutral-500 flex items-center justify-center">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {username || "User"}
            </p>
            <p className="text-xs  text-neutral-500">{email}</p>
          </div>
        </div>
        <DottedSeparator className="mb-1" />
        <DropdownMenuItem
          onClick={onSubmit}
          className="group h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer"
        >
          {isPending ? (
            <LoaderCircle className="size-4" />
          ) : (
            <>
              <LogOut className="size-4 mr-2 group-hover:text-accent-foreground" />
              Log out
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
