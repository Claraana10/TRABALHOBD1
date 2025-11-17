import { db } from "../routes/db.js";

// Buscar por email
export async function buscarPorEmail(email) {
    const [rows] = await db.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [email]
    );
    return rows[0];
}

// Criar usuário
export async function criarUsuario(nome, email, senhaHash) {
    const [result] = await db.query(
        "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
        [nome, email, senhaHash]
    );
    return result.insertId;
}

// Listar todos
export async function listarUsuarios() {
    const [rows] = await db.query("SELECT id, nome, email FROM usuarios");
    return rows;
}

// Contar
export async function contarUsuarios() {
    const [rows] = await db.query("SELECT COUNT(*) AS total FROM usuarios");
    return rows[0].total;
}
