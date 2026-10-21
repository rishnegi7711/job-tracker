import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import BoardView from "./pages/BoardView";
import LoginPage from "./pages/LoginPage";
import DetailView from "./pages/DetailView";
import RegisterPage from "./pages/RegisterPage";
import LoginPrototype from "./pages/prototype/LoginPrototype";
import { env } from "./env";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        {env.DEV && (
          <Route path="/prototype/login" element={<LoginPrototype />} />
        )}
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
    </BrowserRouter>
  );
}

export default App;
