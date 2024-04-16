import React, { PropsWithChildren } from "react";

const PostFooter = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="mt-6 border-t border-stone-400 flex justify-between pt-2 text-xs text-stone-700">
      {children}
    </div>
  );
};

export default PostFooter;
