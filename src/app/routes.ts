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
import { Transcription } from "./pages/Transcription";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { PasswordResetSuccess } from "./pages/PasswordResetSuccess";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";
import { NotFound } from "./pages/NotFound";

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
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/reset-password",
    Component: ResetPassword,
  },
  {
    path: "/password-reset-success",
    Component: PasswordResetSuccess,
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
    path: "/terms",
    Component: Terms,
  },
  {
    path: "/privacy",
    Component: Privacy,
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
  {
    path: "/transcription/:taskId",
    Component: Transcription,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);