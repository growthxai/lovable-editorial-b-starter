import { Outlet } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function WorkspaceLayout() {
  return (
    <SidebarProvider>
      <SidebarInset className="h-svh max-h-svh">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
