import * as repo from "../repository/usuarioRepository.js";
import bcrypt from "bcryptjs";

export async function cadastrarUsuario(req, res) {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).send("Preencha todos os campos.");
    }

    const existe = await repo.buscarPorEmail(email);
    if (existe) {
        return res.status(400).send("Usuário já cadastrado com este email.");
    }

    const hash = await bcrypt.hash(senha, 10);

    try {
        await repo.criarUsuario(nome, email, hash);
        return res.status(201).send("Usuário cadastrado com sucesso.");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Erro ao cadastrar usuário.");
    }
}

export async function loginUsuario(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send("Preencha email e senha.");
    }

    try {
        const usuario = await repo.buscarPorEmail(email);
        if (!usuario) {
            return res.status(401).send("Email ou senha incorretos.");
        }

        const ok = await bcrypt.compare(senha, usuario.senha);
        if (!ok) {
            return res.status(401).send("Email ou senha incorretos.");
        }

        return res.json({ 
            tipo: "usuario", 
            email: usuario.email, 
            nome: usuario.nome,
            id: usuario.id
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Erro ao fazer login.");
    }
}

export async function listar(req, res) {
    try {
        const usuarios = await repo.listarUsuarios();
        return res.json(usuarios);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Erro ao listar usuários.");
    }
}

export async function contar(req, res) {
    try {
        const total = await repo.contarUsuarios();
        return res.json({ total });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Erro ao contar usuários.");
    }
}