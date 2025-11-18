import { useState } from "react";
import { api } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/cadastro.scss";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("usuario");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function cadastrar() {
    setErro("");
    
    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      const endpoint = tipo === "admin" ? "/admin/register" : "/usuario/register";
      await api.post(endpoint, { nome, email, senha });

      alert(`${tipo === "admin" ? "Admin" : "Usuário"} cadastrado com sucesso!`);
      navigate("/");
    } catch (err) {
      setErro(err.response?.data || "Erro ao cadastrar.");
    }
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h2 className="cadastro-titulo">Cadastro</h2>

        <div className="cadastro-radio-group">
          <label className="cadastro-label">
            <input
              type="radio"
              value="usuario"
              checked={tipo === "usuario"}
              onChange={(e) => setTipo(e.target.value)}
              className="cadastro-radio"
            />
            Usuário
          </label>
          <label className="cadastro-label">
            <input
              type="radio"
              value="admin"
              checked={tipo === "admin"}
              onChange={(e) => setTipo(e.target.value)}
              className="cadastro-radio"
            />
            Admin
          </label>
        </div>

        {erro && <div className="cadastro-erro">{erro}</div>}

        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="cadastro-input"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="cadastro-input"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="cadastro-input"
        />

        <button onClick={cadastrar} className="cadastro-botao">
          Cadastrar
        </button>

        <p className="cadastro-link">
          Já tem conta? <Link to="/" className="cadastro-anchor">Entrar</Link>
        </p>
      </div>
    </div>
  );
}