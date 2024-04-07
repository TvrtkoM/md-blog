import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

const Heading2 = ({
  children,
  className = ""
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <h2
      className={cn(
        "text-xl font-semibold pb-3 border-b border-stone-400 mb-6",
        className
      )}
    >
      {children}
    </h2>
  );
};

export default Heading2;
