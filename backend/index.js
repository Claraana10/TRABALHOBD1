import express from "express";
import cors from "cors";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const server = express();
server.use(cors());
server.use(express.json());

server.use("/usuario", usuarioRoutes);
server.use("/admin", adminRoutes);

server.listen(5000, () => console.log("API rodando 🚀"));
