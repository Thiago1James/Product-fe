import { Route, Routes } from "react-router-dom";
import RegisterForm from "./components/forms/RegisterForm";
import Admin from "./pages/Admin";
import ProdCadAdmin from "./pages/create";
import Home from "./pages/Home";
import LoginScreen from "./pages/Login";



export default function Router({ setUser }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginScreen setUser={setUser} />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/create" element={<ProdCadAdmin />} />
    </Routes>
  );
}
