import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import NotfoundPage from "./components/pages/NotFoundPage";
import TransactionPage from "./components/pages/TransactionPage";
import Header from "./components/UI/Header";
function App() {
  const authUser = true;
  return (
    <>
      {authUser && <Header />}
      <Routes>
        <Route index={true} path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </>
  );
}

export default App;
