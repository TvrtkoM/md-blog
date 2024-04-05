import React, { PropsWithChildren } from "react";

const Heading2 = ({ children }: PropsWithChildren<{}>) => {
  return (
    <h2 className="text-xl font-semibold pb-3 border-b border-stone-400 mb-6">
      {children}
    </h2>
  );
};

export default Heading2;
