"use client";
import LoginUserForm from "@/components/forms/LoginUserForm";
import { useSearchParams } from "next/navigation";

const RegistrationPage = () => {
  const searchParams = useSearchParams();
  const newUser = searchParams.get("new-user");

  return (
    <>
      {newUser && (
        <section className="mb-4 text-sm text-slate-700">
          Sucessfully registered <strong>{newUser}</strong>! You may log in now.
        </section>
      )}
      <h2 className="text-xl font-semibold pb-3 border-b border-stone-400">
        Log in
      </h2>
      <LoginUserForm />
    </>
  );
};

export default RegistrationPage;
