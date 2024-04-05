"use client";
import LoginUserForm from "@/components/forms/LoginUserForm";
import Heading2 from "@/components/ui/Heading2";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const NewUserMessage = () => {
  const searchParams = useSearchParams();
  const newUser = searchParams.get("new-user");

  return (
    newUser && (
      <section className="mb-4 text-sm text-slate-700">
        Sucessfully registered <strong>{newUser}</strong>! You may log in now.
      </section>
    )
  );
};

const LoginPage = () => {
  return (
    <>
      <Suspense>
        <NewUserMessage />
        <Heading2>Log in</Heading2>
        <LoginUserForm />
      </Suspense>
    </>
  );
};

export default LoginPage;
