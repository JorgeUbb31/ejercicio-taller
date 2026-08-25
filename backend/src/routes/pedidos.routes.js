"use strict";
import { Router } from "express";
import { 
    isAdmin,
    isClient,
    isTrabajador
} from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
    getPedidos,
    createPedidos,
    updatePedidos,
    deletePedidos
} from "../controllers/pedidos.controller.js";

const router = Router();

router.use(authenticateJwt);

router
    .get("/", getPedidos, isTrabajador)
    .get("/:id", getPedidos, isClient)
    .post("/", createPedidos)
    .put("/:id", updatePedidos)
    .delete("/:id", deletePedidos);

export default router;