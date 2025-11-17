import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function entrar() {
    try {
      const resposta = await api.post("/usuario/login", { email, senha });
      alert("Login OK!");

      localStorage.setItem("usuario", email);
      navigate("/admin");

    } catch (err) {
      alert(err.response?.data || "Erro ao fazer login.");
    }
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", width:"300px", margin:"20px auto" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        onChange={e => setSenha(e.target.value)}
      />

      <button onClick={entrar}>Entrar</button>

      <p>
        Não tem conta? <a href="/cadastro">Cadastrar</a>
      </p>
    </div>
  );
}
