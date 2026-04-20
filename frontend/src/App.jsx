import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import MoodPlayerPage from "./pages/MoodPlayerPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors closeButton position="top-right" />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/player" element={<MoodPlayerPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;