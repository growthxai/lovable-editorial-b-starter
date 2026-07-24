import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth/auth-provider";
import { ProtectedRoute } from "@/components/protected-route";
import ApplicationLayout from "./layouts/application-layout";
import WorkspaceLayout01 from "./layouts/workspace-layout-01";
import Landing from "./pages/landing";
import AppPage from "./pages/app";
import Workspace from "./pages/workspace";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import ForgotPassword from "./pages/auth/forgot-password";
import AuthCallback from "./pages/auth/auth-callback";
import NotFound from "./pages/not-found";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* Public auth screens (no layout chrome). */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        <Route element={<ApplicationLayout />}>
          <Route path="/" element={<Landing />} />
          {/* Authenticated surface — ProtectedRoute → /sign-in, then back into the app. */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route element={<WorkspaceLayout01 />}>
          <Route
            path="/workspace"
            element={
              <ProtectedRoute>
                <Workspace />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
