import { lazy, Suspense, type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { SpaceBackground } from "@/components/layout/SpaceBackground";
import { Spinner } from "@/components/ui/Spinner";
import Landing from "@/pages/Landing";
import LearnMore from "@/pages/LearnMore";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ChatPage from "@/pages/ChatPage";
import SharePage from "@/pages/SharePage";

// Route-level code splitting for the data-heavy pages.
const ExplorerPage = lazy(() => import("@/pages/ExplorerPage"));
const SatellitesPage = lazy(() => import("@/pages/SatellitesPage"));
const SatelliteDetailPage = lazy(() => import("@/pages/SatelliteDetailPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function GuestRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/chat" replace />;
  return children;
}

const pageFallback = (
  <div className="flex min-h-screen items-center justify-center">
    <Spinner className="size-8" />
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SpaceBackground />
        <Suspense fallback={pageFallback}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
            <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
            <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
            <Route path="/chat/:threadId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
            <Route path="/explorer" element={<ProtectedRoute><ExplorerPage /></ProtectedRoute>} />
            <Route path="/satellites" element={<ProtectedRoute><SatellitesPage /></ProtectedRoute>} />
            <Route path="/satellites/:name" element={<ProtectedRoute><SatelliteDetailPage /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
            <Route path="/share/:token" element={<SharePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
