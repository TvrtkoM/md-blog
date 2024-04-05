import React, { PropsWithChildren } from "react";

const ContentFrame = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="bg-stone-300 rounded-lg text-stone-700 shadow-md px-6 py-7 border border-indigo-200">
      {children}
    </div>
  );
};

export default ContentFrame;
