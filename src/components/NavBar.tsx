"use client";
import { cn } from "@/lib/utils";
import { useUserContext } from "@/providers/UserProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

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

const NavBar = () => {
  const { user } = useUserContext();
  const path = usePathname();
  return (
    <div className="h-11 w-full bg-slate-700 shadow-lg">
      <div className="container h-full max-w-screen-xl px-4">
        <div className="flex items-center h-full text-gray-200 space-x-4 text-sm">
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
          <NavBarItem
            label="Create Post"
            selected={path === "/post/create"}
            path="/post/create"
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
