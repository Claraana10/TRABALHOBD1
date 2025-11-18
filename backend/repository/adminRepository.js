import { db } from "../services/db.js";

export async function buscarPorEmail(email) {
    const [rows] = await db.query(
        "SELECT * FROM admins WHERE email = ?",
        [email]
    );
    return rows[0];
}

export async function criarAdmin(nome, email, senhaHash) {
    const [result] = await db.query(
        "INSERT INTO admins (nome, email, senha) VALUES (?, ?, ?)",
        [nome, email, senhaHash]
    );
    return result.insertId;
}
