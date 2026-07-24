import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth/auth-provider";
import { DEFAULT_AUTHED_ROUTE } from "@/lib/auth/constants";

/**
 * /auth/callback — where OAuth and email-confirmation links land. AuthProvider's
 * onAuthStateChange resolves the session; once resolved we send the user INTO the app
 * (DEFAULT_AUTHED_ROUTE), never back to `/`. This is the fix for the recurring
 * "signed in but stranded on the marketing homepage" bug. See auth-and-navigation.md.
 */
export default function AuthCallback() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    navigate(user ? DEFAULT_AUTHED_ROUTE : "/sign-in", { replace: true });
  }, [user, loading, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent opacity-40" />
    </div>
  );
}
