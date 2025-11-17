import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/login'
import Cadastro from './pages/cadastro'; 
import Admin from "./pages/admin";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
