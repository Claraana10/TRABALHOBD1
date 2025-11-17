import * as repo from "../repository/adminRepository.js";
import bcrypt from "bcryptjs";

export async function cadastrarAdmin(req, res) {
    const { nome, email, senha } = req.body;

    const existe = await repo.buscarPorEmail(email);
    if (existe)
        return res.status(400).send("Admin já existe.");

    const hash = await bcrypt.hash(senha, 10);

    await repo.criarAdmin(nome, email, hash);

    return res.send("Admin cadastrado com sucesso");
}

export async function loginAdmin(req, res) {
    const { email, senha } = req.body;

    const adm = await repo.buscarPorEmail(email);
    if (!adm)
        return res.status(400).send("Admin não encontrado.");

    const ok = await bcrypt.compare(senha, adm.senha);
    if (!ok)
        return res.status(400).send("Senha incorreta.");

    return res.send("Login Admin OK");
}
