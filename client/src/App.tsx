import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import AppErrorBoundary from "./components/AppErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import BoardView from "./pages/BoardView";
import LoginPage from "./pages/LoginPage";
import DetailView from "./pages/DetailView";
import RegisterPage from "./pages/RegisterPage";

export function AppRoutes() {
  const { pathname } = useLocation();
  return (
    <AppErrorBoundary resetKey={pathname}>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <BoardView />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/applications/:id"
          element={
            <ProtectedRoute>
              <DetailView />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
    </AppErrorBoundary>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
