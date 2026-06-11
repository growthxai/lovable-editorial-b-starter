import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApplicationLayout from "./layouts/application-layout";
import WorkspaceLayout01 from "./layouts/workspace-layout-01";
import Landing from "./pages/landing";
import AppPage from "./pages/app";
import Workspace from "./pages/workspace";
import NotFound from "./pages/not-found";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<ApplicationLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<AppPage />} />
      </Route>
      <Route element={<WorkspaceLayout01 />}>
        <Route path="/workspace" element={<Workspace />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
