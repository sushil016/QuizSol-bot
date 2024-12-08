import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useAdmin() {
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch("/api/auth/check-admin");
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
      }
      setLoading(false);
    };

    checkAdminStatus();
  }, [session]);

  return { isAdmin, loading };
} 