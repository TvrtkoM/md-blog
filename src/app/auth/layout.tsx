import AuthContainer from "@/components/containers/AuthContainer";
import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren<{}>) => {
  return <AuthContainer>{children}</AuthContainer>;
};

export default AuthLayout;
