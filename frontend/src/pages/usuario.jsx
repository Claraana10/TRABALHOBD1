export default function Usuario() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
  
    return (
      <div className="usuario-container">
        <h1>Bem-vindo, {usuario?.nome}</h1>
        <p>Este é o painel do usuário comum.</p>
      </div>
    );
  }
  