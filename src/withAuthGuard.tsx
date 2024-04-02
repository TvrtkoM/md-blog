import { ComponentType, useEffect } from "react";
import { useUserContext } from "./providers/UserProvider";
import { usePathname, useRouter } from "next/navigation";

export default function withAuthGuard(Component: ComponentType) {
  const AuthGuard = () => {
    const { user, isLoading } = useUserContext();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (isLoading) {
        return;
      }
      if (!user) router.push(`/auth/login?next=${pathname}`);
    }, [user, isLoading, pathname, router]);

    if (isLoading || !user) {
      return null;
    }

    return <Component />;
  };
  return AuthGuard;
}
