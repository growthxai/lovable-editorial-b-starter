import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { SidebarAccountFooter } from "./sidebar-account-footer";

// The shadcn sidebar primitives need SidebarProvider context that's irrelevant here.
// Stub them to passthroughs so the test isolates the one thing this component decides:
// which leave affordance renders for the current route.
vi.mock("@/components/base/sidebar", () => ({
  SidebarFooter: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
  SidebarMenu: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
  SidebarMenuItem: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
  SidebarSeparator: () => <hr />,
  SidebarMenuButton: ({
    asChild,
    children,
    ...props
  }: { asChild?: boolean; children?: ReactNode } & Record<string, unknown>) =>
    asChild ? <>{children}</> : <button {...props}>{children}</button>,
}));

// useAuth() throws outside <AuthProvider>; the authed branch only needs signOut.
vi.mock("@/lib/auth/auth-provider", () => ({
  useAuth: () => ({ signOut: vi.fn() }),
}));

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <SidebarAccountFooter />
    </MemoryRouter>,
  );
}

describe("SidebarAccountFooter", () => {
  it("shows Exit demo, not Sign out, on /demo routes", () => {
    renderAt("/demo/dashboard");
    expect(screen.getByText("Exit demo")).toBeInTheDocument();
    expect(screen.queryByText("Sign out")).not.toBeInTheDocument();
  });

  it("shows Sign out, not Exit demo, on authenticated routes", () => {
    renderAt("/dashboard");
    expect(screen.getByText("Sign out")).toBeInTheDocument();
    expect(screen.queryByText("Exit demo")).not.toBeInTheDocument();
  });
});
