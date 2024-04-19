import { Router } from "express";

import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";
import { createNewUsuario, getUsuario } from "../handlers/usuario";

const router = Router();

router.get("/", getUsuario)

router.post("/",
    body('username').notEmpty().withMessage("El nombre de usuario no puede ser vacia"),
    body('password').notEmpty().withMessage("La contraseña no puede ser vacia"),
    handleInputErrors,
    createNewUsuario)



export default router;