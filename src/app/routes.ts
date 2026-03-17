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
import { Loader } from "./components/Loader";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminUsers } from "./pages/admin/AdminUsers";
import { AdminUserProfile } from "./pages/admin/AdminUserProfile";
import { AdminPayoutQueue } from "./pages/admin/AdminPayoutQueue";
import { AdminTransactions } from "./pages/admin/AdminTransactions";
import { AdminTaskManagement } from "./pages/admin/AdminTaskManagement";
import { AdminSettings } from "./pages/admin/AdminSettings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Auth,
    HydrateFallback: Loader,
  },
  {
    path: "/signup",
    Component: SignUp,
    HydrateFallback: Loader,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
    HydrateFallback: Loader,
  },
  {
    path: "/reset-password",
    Component: ResetPassword,
    HydrateFallback: Loader,
  },
  {
    path: "/password-reset-success",
    Component: PasswordResetSuccess,
    HydrateFallback: Loader,
  },
  {
    path: "/auth/google",
    Component: GoogleAuth,
    HydrateFallback: Loader,
  },
  {
    path: "/auth/apple",
    Component: AppleAuth,
    HydrateFallback: Loader,
  },
  {
    path: "/onboarding",
    Component: Onboarding,
    HydrateFallback: Loader,
  },
  {
    path: "/consent",
    Component: Consent,
    HydrateFallback: Loader,
  },
  {
    path: "/terms",
    Component: Terms,
    HydrateFallback: Loader,
  },
  {
    path: "/privacy",
    Component: Privacy,
    HydrateFallback: Loader,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    HydrateFallback: Loader,
  },
  {
    path: "/profile",
    Component: Profile,
    HydrateFallback: Loader,
  },
  {
    path: "/task/:taskId",
    Component: TaskExecution,
    HydrateFallback: Loader,
  },
  {
    path: "/transcription/:taskId",
    Component: Transcription,
    HydrateFallback: Loader,
  },
  {
    path: "/loader",
    Component: Loader,
  },
  {
    path: "*",
    Component: NotFound,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
    HydrateFallback: Loader,
  },
  {
    path: "/admin/users",
    Component: AdminUsers,
    HydrateFallback: Loader,
  },
  {
    path: "/admin/users/:userId",
    Component: AdminUserProfile,
    HydrateFallback: Loader,
  },
  {
    path: "/admin/payout-queue",
    Component: AdminPayoutQueue,
    HydrateFallback: Loader,
  },
  {
    path: "/admin/transactions",
    Component: AdminTransactions,
    HydrateFallback: Loader,
  },
  {
    path: "/admin/task-management",
    Component: AdminTaskManagement,
    HydrateFallback: Loader,
  },
  {
    path: "/admin/settings",
    Component: AdminSettings,
    HydrateFallback: Loader,
  },
]);