"use client";
import RegisterUserForm from "@/components/forms/RegisterUserForm";

const RegistrationPage = () => {
  return (
    <>
      <h2 className="text-xl font-semibold pb-3 border-b border-stone-400">
        Registration
      </h2>
      <RegisterUserForm />
    </>
  );
};

export default RegistrationPage;
