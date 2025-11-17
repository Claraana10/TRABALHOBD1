import { Router } from "express";
import * as controller from "../controller/usuarioController.js";

const router = Router();

router.post("/register", controller.cadastrarUsuario);
router.post("/login", controller.loginUsuario);
router.get("/all", controller.listar);
router.get("/count", controller.contar);

export default router;
