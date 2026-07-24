import { useEffect, useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth/auth-provider";
import { DEFAULT_AUTHED_ROUTE } from "@/lib/auth/constants";
import { SocialAuthButtons } from "@/components/base/social-auth-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * /sign-in — SSO (branded) + email/password. On success lands on the app's default
 * authed route, NEVER `/`. See docs/design/auth-and-navigation.md.
 */
export default function SignIn() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Already authenticated → go to the app, not this page.
  if (!loading && user) return <Navigate to={from ?? DEFAULT_AUTHED_ROUTE} replace />;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (err) {
      setError(
        err.message.includes("Email not confirmed")
          ? "Please confirm your email before signing in."
          : "Invalid email or password.",
      );
      return;
    }
    navigate(from ?? DEFAULT_AUTHED_ROUTE, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">Welcome back.</p>
        </div>

        <SocialAuthButtons mode="signin" />

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or continue with email
          <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-xs text-muted-foreground hover:underline">Forgot?</Link>
            </div>
            <Input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" disabled={busy} className="w-full">{busy ? "Signing in…" : "Sign in"}</Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          No account? <Link to="/sign-up" className="font-medium text-foreground hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
