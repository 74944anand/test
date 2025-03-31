import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useUserDetails = () => {
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!session?.user?.email) {
        setError("No session or email found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/auth/getUserByEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: session.user.email }),
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.error || "Failed to fetch user data");
          return;
        }

        setUserId(data.id);
        localStorage.setItem("userId", data.id);
      } catch (err) {
        setError("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [session]);

  return { userId, loading, error };
};

export default useUserDetails;
