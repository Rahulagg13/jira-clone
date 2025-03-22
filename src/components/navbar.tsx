import MobileSidebar from "./mobile-Sidebar";
import UserButton from "./user-button";

const Navbar = () => {
  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="hidden flex-col lg:flex">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="text-muted-foreground">
          Monitor all your projects and tasks in one place
        </p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
};

export default Navbar;
