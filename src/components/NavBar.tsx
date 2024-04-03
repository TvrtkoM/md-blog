"use client";
import { cn } from "@/lib/utils";
import { useUserContext } from "@/providers/UserProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { Button } from "./ui/Button";

interface NavBarItemProps {
  label: string;
  selected: boolean;
  path: string;
}

const NavBarItem: FC<NavBarItemProps> = ({ label, selected, path }) => {
  return (
    <Link
      href={path}
      className={cn("text-gray-200", {
        underline: selected
      })}
    >
      {label}
    </Link>
  );
};

const AuthNav: FC = () => {
  const path = usePathname();
  const { user } = useUserContext();

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <>
          <div>Logged in as {user.name}</div>
          <Button variant="ghost" className="h-6">
            Log out
          </Button>
        </>
      ) : (
        <>
          <NavBarItem
            label="Log in"
            selected={path === "/auth/login"}
            path="/auth/login"
          />
          <NavBarItem
            label="Register"
            selected={path === "/auth/register"}
            path="/auth/register"
          />
        </>
      )}
    </div>
  );
};

const NavBar = () => {
  const path = usePathname();

  return (
    <div className="h-11 w-full bg-slate-700 shadow-lg">
      <div className="container h-full max-w-screen-xl px-4">
        <div className="flex items-center justify-between h-full text-gray-200 text-sm">
          <div>
            <NavBarItem
              label="Create Post"
              selected={path === "/post/create"}
              path="/post/create"
            />
          </div>
          <div className="ml-auto">
            <AuthNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
