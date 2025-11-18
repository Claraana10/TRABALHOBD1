import { Router } from "express";
import * as controller from "../controller/adminController.js";

const router = Router();

router.post("/register", controller.cadastrarAdmin);
router.post("/login", controller.loginAdmin);
router.get("/usuarios", controller.listarUsuarios);
router.get("/usuarios/count", controller.contarUsuarios);

export default router;
