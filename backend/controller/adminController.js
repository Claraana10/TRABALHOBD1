import * as repo from "../repository/adminRepository.js";
import * as repoUsuario from "../repository/usuarioRepository.js";
import bcrypt from "bcryptjs";

export async function cadastrarAdmin(req, res) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).send("Preencha todos os campos.");
    }

    const existe = await repo.buscarPorEmail(email);
    if (existe) {
        return res.status(400).send("Admin já cadastrado com este email.");
    }

    const hash = await bcrypt.hash(senha, 10);

    try {
        await repo.criarAdmin(nome, email, hash);
        return res.status(201).send("Admin cadastrado com sucesso.");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Erro ao cadastrar admin.");
    }
}

export async function loginAdmin(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send("Preencha email e senha.");
    }

    try {
        const admin = await repo.buscarPorEmail(email);
        if (!admin) {
            return res.status(401).send("Email ou senha incorretos.");
        }

        const ok = await bcrypt.compare(senha, admin.senha);
        if (!ok) {
            return res.status(401).send("Email ou senha incorretos.");
        }

        return res.json({ 
            tipo: "admin", 
            email: admin.email, 
            nome: admin.nome,
            id: admin.id
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Erro ao fazer login.");
    }
}

export async function listarUsuarios(req, res) {
    try {
        const usuarios = await repoUsuario.listarUsuarios();
        return res.json(usuarios);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Erro ao listar usuários.");
    }
}

export async function contarUsuarios(req, res) {
    try {
        const total = await repoUsuario.contarUsuarios();
        return res.json({ total });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Erro ao contar usuários.");
    }
}