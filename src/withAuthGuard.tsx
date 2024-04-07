import { ComponentType, useEffect } from "react";
import { useUserContext } from "./providers/UserProvider";
import { usePathname, useRouter } from "next/navigation";

export default function withAuthGuard<P extends object>(
  Component: ComponentType<P>
) {
  const AuthGuard = (props: P) => {
    const { user, isLoading } = useUserContext();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (isLoading) {
        return;
      }
      if (!user) router.push(`/auth/login?next=${pathname}`);
    }, [user, isLoading, router, pathname]);

    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };
  return AuthGuard;
}
