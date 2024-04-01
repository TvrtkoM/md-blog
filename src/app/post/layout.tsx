import MainContainer from "@/components/MainContainer";
import React, { PropsWithChildren } from "react";

const PostLayout = ({ children }: PropsWithChildren<{}>) => {
  return <MainContainer>{children}</MainContainer>;
};

export default PostLayout;
