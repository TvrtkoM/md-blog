import useMeQuery from "@/queries/useMeQuery";
import { UserResponseData } from "@/zod-schemas/user";
import { createContext, PropsWithChildren, useContext } from "react";

interface UserContextData {
  user: UserResponseData | undefined;
  isLoading: boolean;
}

const UserContext = createContext<UserContextData | null>(null);

export default function UserProvider({ children }: PropsWithChildren<{}>) {
  const { data: me, isLoading } = useMeQuery();

  return (
    <UserContext.Provider value={{ user: me, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (ctx == null) {
    throw Error("useUserContext must be used inside UserProvider");
  }
  return ctx;
};