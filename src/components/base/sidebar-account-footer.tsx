import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { IconLogout, IconX } from "@tabler/icons-react";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/base/sidebar";
import { useAuth } from "@/lib/auth/auth-provider";
import { EXIT_DEMO_ROUTE, useIsDemo } from "@/lib/demo";

/**
 * The sidebar footer's leave affordance — the ONE place that decides whether the
 * footer offers "Sign out" (authenticated `/*`) or "Exit demo" (public `/demo/*`).
 *
 * Demo has no session, so "Sign out" is meaningless there; visitors leave via
 * "Exit demo" — a plain navigation to the marketing landing (EXIT_DEMO_ROUTE).
 * The choice is driven solely by useIsDemo(); never re-branch on the route yourself.
 *
 * Layout (matches the reference footer): separator → leave affordance → account row.
 * Account display varies per template, so pass it as `account`; it renders below the
 * leave affordance. Ships in the base starter — use as-is, do not rebuild in page scope.
 *
 * See docs/design/auth.md.
 */
export function SidebarAccountFooter({ account }: { account?: ReactNode }) {
  const isDemo = useIsDemo();
  return (
    <SidebarFooter>
      <SidebarSeparator />
      <SidebarMenu>
        <SidebarMenuItem>
          {isDemo ? <ExitDemoButton /> : <SignOutButton />}
        </SidebarMenuItem>
        {account && <SidebarMenuItem>{account}</SidebarMenuItem>}
      </SidebarMenu>
    </SidebarFooter>
  );
}

function ExitDemoButton() {
  return (
    <SidebarMenuButton asChild>
      <Link to={EXIT_DEMO_ROUTE}>
        <IconX />
        <span>Exit demo</span>
      </Link>
    </SidebarMenuButton>
  );
}

function SignOutButton() {
  // useAuth() runs only in the authenticated tree — never on /demo/*, which may not be
  // wrapped in <AuthProvider>. Isolating it in its own conditionally-rendered component
  // is what keeps that safe (a hook can't be called conditionally inline).
  const { signOut } = useAuth();
  return (
    <SidebarMenuButton onClick={signOut}>
      <IconLogout />
      <span>Sign out</span>
    </SidebarMenuButton>
  );
}
