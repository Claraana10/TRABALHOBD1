import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function entrar() {
    setErro("");

    if (!email || !senha) {
      setErro("Preencha email e senha.");
      return;
    }

    try {
      try {
        const resposta = await api.post("/usuario/login", { email, senha });
        localStorage.setItem("usuario", JSON.stringify(resposta.data));
        navigate("/admin");
        return;
      } catch (errUsuario) {
        const resposta = await api.post("/admin/login", { email, senha });
        localStorage.setItem("usuario", JSON.stringify(resposta.data));
        navigate("/admin");
        return;
      }
    } catch (err) {
      setErro(err.response?.data || "Email ou senha incorretos.");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-titulo">Login</h2>

        {erro && <div className="login-erro">{erro}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="login-input"
        />

        <button onClick={entrar} className="login-botao">
          Entrar
        </button>

        <p className="login-link">
          Não tem conta? <Link to="/cadastro" className="login-anchor">Cadastrar</Link>
        </p>
      </div>
    </div>
  );
}