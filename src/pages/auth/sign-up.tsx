import { useState, type FormEvent } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth/auth-provider";
import { DEFAULT_AUTHED_ROUTE } from "@/lib/auth/constants";
import { SocialAuthButtons } from "@/components/base/social-auth-buttons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * /sign-up — SSO (branded) + email/password. Email confirmation returns through
 * /auth/callback (emailRedirectTo), NOT the homepage. See auth-and-navigation.md.
 */
export default function SignUp() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  if (!loading && user) return <Navigate to={DEFAULT_AUTHED_ROUTE} replace />;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      // Confirmation link returns INTO the app, never the marketing homepage.
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    setSent(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Start in seconds.</p>
        </div>

        {sent ? (
          <div className="rounded-lg border bg-muted/40 p-6 text-center">
            <p className="text-sm">Check your email to confirm your account, then sign in.</p>
            <Button variant="ghost" className="mt-4" onClick={() => navigate("/sign-in")}>Back to sign in</Button>
          </div>
        ) : (
          <>
            <SocialAuthButtons mode="signup" />
            <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              or sign up with email
              <span className="h-px flex-1 bg-border" />
            </div>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" disabled={busy} className="w-full">{busy ? "Creating…" : "Create account"}</Button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Have an account? <Link to="/sign-in" className="font-medium text-foreground hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
