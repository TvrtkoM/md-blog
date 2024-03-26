import React, { PropsWithChildren } from "react";

const MainContainer = ({ children }: PropsWithChildren<{}>) => {
  return (
    <section className="container max-w-screen-xl mt-10 px-4">
      <div className="bg-stone-300 rounded-lg text-stone-700 shadow-md px-6 py-7 border border-indigo-200">
        {children}
      </div>
    </section>
  );
};

export default MainContainer;
