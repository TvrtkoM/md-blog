import AuthContainer from "@/components/AuthContainer";
import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren<{}>) => {
  return <AuthContainer>{children}</AuthContainer>;
};

export default AuthLayout;
