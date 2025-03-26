import CreateWorkspaceForm from "@/components/workspaces/create-workspace-form";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
const Home = async () => {
  const user = await auth();

  if (!user) redirect("/sign-in");

  return (
    <div className="bg-neutral-500 p-4 h-full">
      <CreateWorkspaceForm />
    </div>
  );
};

export default Home;
