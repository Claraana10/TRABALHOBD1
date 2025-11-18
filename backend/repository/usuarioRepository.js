import { db } from "../services/db.js";

export async function buscarPorEmail(email) {
    const [rows] = await db.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [email]
    );
    return rows[0];
}

export async function criarUsuario(nome, email, senhaHash) {
    const [result] = await db.query(
        "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
        [nome, email, senhaHash]
    );
    return result.insertId;
}

export async function listarUsuarios() {
    const [rows] = await db.query("SELECT id, nome, email FROM usuarios");
    return rows;
}

export async function contarUsuarios() {
    const [rows] = await db.query("SELECT COUNT(*) AS total FROM usuarios");
    return rows[0].total;
}
