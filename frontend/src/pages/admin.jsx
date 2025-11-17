import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [usuarios, setUsuarios] = useState([]);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("usuario")) {
      navigate("/");
    }
    carregar();
  }, []);

  async function carregar() {
    try {
      const lista = await api.get("/usuario/all");
      const count = await api.get("/usuario/count");

      setUsuarios(lista.data);
      setTotal(count.data.total);
    } catch (err) {
      alert("Erro ao carregar usuários");
    }
  }

  function sair() {
    localStorage.removeItem("usuario");
    navigate("/");
  }

  return (
    <div style={{ width:"600px", margin:"20px auto" }}>
      <h1>Painel Admin</h1>
      <h3>Total de usuários: {total}</h3>

      <button onClick={sair} style={{ marginBottom:"15px" }}>
        Sair
      </button>

      <ul>
        {usuarios.map(u => (
          <li key={u.id}>
            {u.nome} — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
