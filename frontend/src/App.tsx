import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/Home";
import AskBrain from "./pages/AskBrain";
import Documents from "./pages/Documents";
import KnowledgeGraph from "./pages/KnowledgeGraph";
import Tasks from "./pages/Tasks";
import Analytics from "./pages/Analytics";
import Admin from "./pages/Admin";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/common/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="" element={<Navigate to="home" replace />} />
                  <Route path="home" element={<Home />} />
                  <Route path="askbrain" element={<AskBrain />} />
                  <Route path="documents" element={<Documents />} />
                  <Route path="knowledge" element={<KnowledgeGraph />} />
                  <Route path="tasks" element={<Tasks />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="admin" element={<Admin />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Fallback Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}