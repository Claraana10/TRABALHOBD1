import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function cadastrar() {
    try {
      await api.post("/usuario/register", { nome, email, senha });

      alert("Usuário cadastrado!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data || "Erro ao cadastrar.");
    }
  }

  return (
    <div style={{ display:"flex", flexDirection:"column", width:"300px", margin:"20px auto" }}>
      <h2>Cadastro</h2>

      <input placeholder="Nome" onChange={e => setNome(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" onChange={e => setSenha(e.target.value)} />

      <button onClick={cadastrar}>Cadastrar</button>

      <p>
        Já tem conta? <a href="/">Entrar</a>
      </p>
    </div>
  );
}
