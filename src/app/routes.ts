import { createBrowserRouter } from "react-router";
import { Auth } from "./pages/Auth";
import { SignUp } from "./pages/SignUp";
import { GoogleAuth } from "./pages/GoogleAuth";
import { AppleAuth } from "./pages/AppleAuth";
import { Onboarding } from "./pages/Onboarding";
import { Consent } from "./pages/Consent";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { TaskExecution } from "./pages/TaskExecution";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Auth,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/auth/google",
    Component: GoogleAuth,
  },
  {
    path: "/auth/apple",
    Component: AppleAuth,
  },
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/consent",
    Component: Consent,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/profile",
    Component: Profile,
  },
  {
    path: "/task/:taskId",
    Component: TaskExecution,
  },
]);