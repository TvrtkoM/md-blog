import React, { PropsWithChildren } from "react";

const MainContainer = ({ children }: PropsWithChildren<{}>) => {
  return (
    <section className="container max-w-screen-xl mt-10 px-4">
      {children}
    </section>
  );
};

export default MainContainer;
