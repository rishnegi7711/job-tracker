import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import BoardView from "./pages/BoardView";
import LoginPage from "./pages/LoginPage";
import DetailView from "./pages/DetailView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
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
