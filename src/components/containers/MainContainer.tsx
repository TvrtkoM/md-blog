import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

const MainContainer = ({
  children,
  className = ""
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <section
      className={cn("container max-w-screen-xl mt-10 mb-10 px-4", className)}
    >
      {children}
    </section>
  );
};

export default MainContainer;
