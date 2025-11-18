import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/admin.scss";

export default function Admin() {
  const [usuarios, setUsuarios] = useState([]);
  const [total, setTotal] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioStr = localStorage.getItem("usuario");
    if (!usuarioStr) {
      navigate("/");
      return;
    }

    carregar();
  }, []);

  async function carregar() {
    try {
      setCarregando(true);
      const lista = await api.get("/admin/usuarios");
      const count = await api.get("/admin/usuarios/count");

      setUsuarios(lista.data);
      setTotal(count.data.total);
    } catch (err) {
      alert("Erro ao carregar dados. " + (err.response?.data || ""));
    } finally {
      setCarregando(false);
    }
  }

  function sair() {
    localStorage.removeItem("usuario");
    navigate("/");
  }

  const usuarioStr = localStorage.getItem("usuario");
  const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;

  return (
    <div className="admin-container">
      <div className="admin-card">
        <div className="admin-header">
          <h1 className="admin-titulo">Painel Administrativo</h1>
          {usuario && (
            <div className="admin-info">
              <span>Olá, {usuario.nome}</span>
              <span className="admin-badge">{usuario.tipo === "admin" ? "Admin" : "Usuário"}</span>
            </div>
          )}
          <button onClick={sair} className="admin-botao-sair">
            Sair
          </button>
        </div>

        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="admin-stat-numero">{carregando ? "..." : total}</div>
            <div className="admin-stat-label">Total de Usuários Cadastrados</div>
          </div>
        </div>

        <div className="admin-secao">
          <h2 className="admin-subtitulo">Lista de Usuários</h2>
          {carregando ? (
            <div className="admin-carregando">Carregando...</div>
          ) : usuarios.length === 0 ? (
            <div className="admin-vazio">Nenhum usuário cadastrado.</div>
          ) : (
            <div className="admin-lista">
              {usuarios.map((u) => (
                <div key={u.id} className="admin-item">
                  <div>
                    <strong>{u.nome}</strong>
                  </div>
                  <div className="admin-email">{u.email}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}