import { Router } from "express";
import * as controller from "../controller/adminController.js";

const router = Router();

router.post("/register", controller.cadastrarAdmin);
router.post("/login", controller.loginAdmin);

export default router;
