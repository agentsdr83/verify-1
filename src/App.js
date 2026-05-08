import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MobileVerify from "./MobileVerify";
import EmailVerify from "./EmailVerify";
import Success from "./Success";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/mobile" />} />
        <Route path="/mobile" element={<MobileVerify />} />
        <Route path="/email" element={<EmailVerify />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}