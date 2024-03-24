"use client";
import { useUserContext } from "@/providers/UserProvider";

export default function Home() {
  const userContext = useUserContext();
  return <main className="">Logged in as {userContext.user?.name}</main>;
}
