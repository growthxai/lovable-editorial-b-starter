# Auth & Navigation — the contract

This is the **canonical, non-negotiable** contract for authentication and post-auth
navigation in every template. It exists because the same auth defects shipped over
and over: off-brand SSO buttons, OAuth that errors on click, and — most importantly —
**users landing on the marketing homepage after signing in instead of inside the app.**

**Auth is shipped code, not something you re-author.** The base starter provides the
whole auth subsystem (`AuthProvider`, `ProtectedRoute`, the `/sign-in`, `/sign-up`,
`/auth/callback` pages, and the branded `SocialAuthButtons`). **Use it. Do not rewrite
it, do not restyle the SSO buttons, do not simulate auth.** Your job per template is to
point the protected routes at the app's real screens and set the app's default authed
route — not to reinvent sign-in.

---

## 0. Does this template even have auth? (read this first)

Two template shapes, and they are opposite:

| Shape | Examples | Auth? |
|-------|----------|-------|
| **Multi-page app** (has a landing page AND an authed product behind it) | analytics dashboard, flashcards, budget tracker | **Yes** — full auth per this doc. |
| **Single-page tool** (the product IS the whole page, no landing, state in the URL) | mortgage / loan / payoff calculator (the **Tool Starter** shape) | **NO auth. NO sign-in. NO redirect.** |

**Single-page tools must not add authentication at all.** The tool is the product from
the first pixel; there is no landing page to leave and no app to "enter," so there is
nothing to sign into and nothing to redirect to. Adding a sign-in screen or any
post-load redirect to a calculator is a defect. If the spec doesn't describe a landing
page + a separate authed product, it's a single-page tool — stop here.

Everything below applies to **multi-page apps only.**

---

## 1. The one rule that keeps getting broken: redirect to the APP, never home

In our templates, **`/` is the marketing landing page — it is NOT the app.** After a
successful sign-in, sign-up confirmation, or OAuth callback, the user must land on the
**app's default authenticated route** (e.g. `/dashboard`, `/app`, `/goals` — whatever
this template's first in-app screen is), signed in. Landing back on `/` is the single
most-reported bug and is always a FAIL.

Concretely:
- **OAuth** redirects through **`/auth/callback`**, which resolves the session and then
  navigates to the app's default authed route (honoring a saved `from`). It must
  **never** use `redirect_uri: window.location.origin` — that does a full-page load of
  `/` and strands the signed-in user on the landing page.
- **Email sign-in** navigates to `from ?? <defaultAuthedRoute>` on success.
- **Email sign-up** passes `emailRedirectTo: ${origin}/auth/callback` so the
  confirmation link returns into the app, not the homepage.
- **An already-authenticated user** who hits `/`, `/sign-in`, or `/sign-up` is
  redirected to the app's default authed route.

Set the template's default authed route in ONE place (a `DEFAULT_AUTHED_ROUTE`
constant) and reference it from the callback, the sign-in/up handlers, and the
already-authed redirects.

---

## 2. SSO buttons: use the branded component, never hand-roll

Render `<SocialAuthButtons>` from `@/components/base/social-auth-buttons` on **both**
`/sign-in` and `/sign-up`. Do **not** build "Continue with Google/Apple" buttons by
hand and do **not** style them with the template's theme color — that is an
off-brand violation flagged repeatedly.

- **Google** follows https://developers.google.com/identity/branding-guidelines
  (official 4-color "G", neutral surface + approved border, approved wording).
- **Apple** follows the "Sign in with Apple" HIG (Apple logo, black-on-white /
  white-on-black).

The component is provider-aware: **only render a provider that is actually configured.**
A button that only ever errors (`missing OAuth secret`) must never ship (§3).

---

## 3. OAuth providers must be configured — or the button doesn't render

Buttons are built before providers exist; providers are enabled **after** the build by
the cloud step (`configure_social_auth`). Rules:
- Wire OAuth to the **Lovable managed broker** (`lovable.auth.signInWithOAuth`), never
  `supabase.auth.signInWithOAuth` (that path throws `missing OAuth secret`).
- Only pass providers to `SocialAuthButtons` that the project has configured.
- If a provider isn't configured, don't render its button. Never ship a control whose
  only outcome is an error.

The pipeline's `cloud_apply`/`cloud_verify` gates enforce that every rendered provider
is actually configured; a violation fails the build.

---

## 4. AuthProvider + ProtectedRoute (shipped — use as-is)

- **`AuthProvider`** registers `onAuthStateChange` **before** `getSession()` (so an
  OAuth callback's `SIGNED_IN` event isn't missed), exposes `{ user, session, loading,
  signOut }`, and clears the React Query cache on sign-out (so the next user never sees
  the previous user's cached data).
- **`ProtectedRoute`** shows a loading state while `loading`, then redirects
  unauthenticated users to `/sign-in` preserving `from`. Wrap the app's route group in
  it. Do not gate on anything else.

---

## 5. Navigation & wayfinding (applies to the whole app, not just auth)

- **Every drill-down route** has an explicit way back to its parent (a back link,
  breadcrumb, or a clickable parent nav item) — the logo/wordmark being the only way
  back is a FAIL.
- **The brand/logo routes to the app home** (the default authed route) when signed in,
  to `/` when signed out — and it must actually reset, not be a same-route no-op.
- **Demo mode** (`/demo/*`, seeded, no auth) has an explicit **"Exit demo"** control
  that is NOT "Sign out".
- **Sign-out** returns to `/` (landing) or `/sign-in` — never a blank/broken state.

---

## 6. Environments — localhost / preview / published (verified)

The same code works in all three. `redirect_uri` is always
`${window.location.origin}/auth/callback`; `createLovableAuth({})` stays empty.

| Env | How OAuth resolves | Requirement |
|-----|--------------------|-------------|
| **Published** `<slug>.lovable.app` | edge fronts `/~oauth/initiate` → `oauth.lovable.app` | callback origin auto-allow-listed (site URL) — nothing to do |
| **Preview** `preview--<slug>.lovable.app` (iframe) | popup + `web_message`; tokens `postMessage`'d back | auto-allow-listed; providers must be **managed** (not legacy) or you get `legacy_flow` — fix by running `configure_social_auth` |
| **Local** `http://127.0.0.1:8080` | the Vite `lovable-oauth-shim` 302-redirects `/~oauth/initiate` → `oauth.lovable.app` | **run on `127.0.0.1`, NEVER `localhost`** (the broker rejects the `localhost` host); the project must allow-list `http://127.0.0.1:8080/**`; set `LOVABLE_PROJECT_ID` in `.env` |

**The hard rule:** for local dev, open the app at **`http://127.0.0.1:8080`**. `localhost`
can never be allow-listed by the broker; `127.0.0.1` is the only permitted `http://` host.
`vite.config.ts` binds to `127.0.0.1` for this reason. Do NOT replace the shim's 302
redirect with a transparent `server.proxy` — the broker's `__Host-` CSRF cookie needs the
real HTTPS origin and a proxy silently breaks callback validation.

**Lovable-side config (per project — the pipeline does this at build/backfill):**
1. `configure_social_auth` — enables the **managed** Google/Apple providers (Apple is OFF
   by default; enable it if the template offers SIWA). No per-project Google/Apple
   credentials are needed — Lovable uses a shared managed OAuth app.
2. Append `http://127.0.0.1:8080/**` to the project's `uri_allow_list`:
   `PATCH https://api.lovable.dev/projects/{id}/cloud/auth?env=prod` (GET the list first,
   append, PATCH the whole list — it's replaced wholesale; survives republish and also
   covers email-confirmation links). Preview + published origins are auto-allow-listed.

## Anti-patterns (all previously shipped — all FAILs)

```txt
❌ redirect_uri: window.location.origin        → user stranded on the landing page
❌ hand-rolled "Continue with Google" button   → off-brand; use <SocialAuthButtons>
❌ theme-colored ("primary") SSO button         → off-brand
❌ supabase.auth.signInWithOAuth(...)           → "missing OAuth secret"; use the lovable broker
❌ rendering an unconfigured provider's button  → only ever errors
❌ signUp without emailRedirectTo               → confirmation link lands on the homepage
❌ getSession() before onAuthStateChange        → OAuth SIGNED_IN event missed
❌ adding auth/redirects to a single-page tool  → the tool is the product; there's nothing to sign into
❌ logo/"home" that no-ops on the same route     → looks dead; must reset + scroll-to-top
```
