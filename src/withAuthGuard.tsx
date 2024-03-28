import { ComponentType, useEffect } from "react";
import { useUserContext } from "./providers/UserProvider";
import { usePathname, useRouter } from "next/navigation";

export default function withAuthGuard(Component: ComponentType) {
  return () => {
    const { user, isLoading } = useUserContext();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (isLoading) {
        return;
      }
      if (!user) router.push(`/auth/login?next=${pathname}`);
    }, [user, isLoading]);

    if (isLoading || !user) {
      return null;
    }

    return <Component />;
  };
}
