// Login
import { Router } from "express";
import { api } from "../services/db.js";
import bcrypt from "bcryptjs";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verifica se é admin
    const [admin] = await api.execute(
      "SELECT * FROM admins WHERE email = ?",
      [email]
    );
    if (admin.length && bcrypt.compareSync(senha, admin[0].senha)) {
      return res.json({ tipo: "admin", email: admin[0].email, nome: admin[0].nome });
    }

    // Verifica se é usuário normal
    const [usuario] = await api.execute(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    if (usuario.length && bcrypt.compareSync(senha, usuario[0].senha)) {
      return res.json({ tipo: "usuario", email: usuario[0].email, nome: usuario[0].nome });
    }

    res.status(401).send("Usuário ou senha inválidos");

  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
