/**
 * The single source of truth for post-auth navigation.
 *
 * After a successful sign-in / sign-up confirmation / OAuth callback, the user lands
 * HERE — the app's first authenticated screen — never `/` (the marketing landing page).
 * Change this to the template's real default authed route (e.g. "/dashboard").
 *
 * See docs/design/auth-and-navigation.md. Single-page tools (the Tool Starter shape)
 * have no auth and must not import this.
 */
export const DEFAULT_AUTHED_ROUTE = "/app";
