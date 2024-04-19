import { Router } from "express";

import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";
import { userLogin } from "../handlers/usuario";

const router = Router();

router.post("/",
    body('username').notEmpty().withMessage("El nombre de usuario no puede ser vacia"),
    body('password').notEmpty().withMessage("La contraseña no puede ser vacia"),
    handleInputErrors,
    userLogin
)

export default router;