import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Landing from "@/pages/marketing/Landing";
import Auth from "@/pages/Auth";
import AppLayout from "@/layouts/AppLayout";
import { LogoMark } from "@/components/Logo";

const Dashboard = lazy(() => import("@/pages/app/Dashboard"));
const Chat = lazy(() => import("@/pages/app/Chat"));
const ImageStudio = lazy(() => import("@/pages/app/ImageStudio"));
const Writer = lazy(() => import("@/pages/app/Writer"));
const Workflows = lazy(() => import("@/pages/app/Workflows"));
const Library = lazy(() => import("@/pages/app/Library"));
const Team = lazy(() => import("@/pages/app/Team"));
const Billing = lazy(() => import("@/pages/app/Billing"));
const Settings = lazy(() => import("@/pages/app/Settings"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export function PageLoader() {
  return (
    <div className="grid h-[60vh] place-items-center">
      <div className="relative">
        <span className="absolute inset-0 animate-pulse-ring rounded-xl bg-primary/40" />
        <LogoMark className="h-10 w-10" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Auth mode="login" />} />
          <Route path="/signup" element={<Auth mode="signup" />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="chat" element={<Chat />} />
            <Route path="studio" element={<ImageStudio />} />
            <Route path="writer" element={<Writer />} />
            <Route path="workflows" element={<Workflows />} />
            <Route path="library" element={<Library />} />
            <Route path="team" element={<Team />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}
