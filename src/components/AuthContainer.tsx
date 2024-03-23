import React, { PropsWithChildren } from "react";

const AuthContainer = ({ children }: PropsWithChildren<{}>) => {
  return (
    <section className="container max-w-screen-sm mt-10">
      <div className="bg-stone-300 rounded-lg text-stone-700 shadow-lg px-6 py-7 border border-indigo-200">
        {children}
      </div>
    </section>
  );
};

export default AuthContainer;
