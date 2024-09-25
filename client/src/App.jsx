import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import NotfoundPage from "./components/pages/NotFoundPage";
import TransactionPage from "./components/pages/TransactionPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./components/routes/protectedRoutes";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" index={true} element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotfoundPage />} />

        <Route element={<ProtectedRoutes />}>
          <Route index={true} path="/" element={<HomePage />} />
          <Route path="/transaction" element={<TransactionPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
