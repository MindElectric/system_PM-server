import { Router } from "express";

import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";
import { activeUsuario, createNewUsuario, getUsuario, getUsuarioById, updateUsuario } from "../handlers/usuario";

import { ROLES_LIST } from "../config/roles_list";
import { verifyRol } from "../middleware/verifyRol";

const router = Router();

router.get("/", getUsuario)

router.get("/:id",
    param('id').isInt().withMessage("ID no valido"),
    handleInputErrors,
    getUsuarioById
);

router.post("/",
    //Solo administradores
    //verifyRol(ROLES_LIST.Admin),
    body('username').notEmpty().withMessage("El nombre de usuario no puede ser vacia"),
    body('password').notEmpty().withMessage("La contraseña no puede ser vacia"),
    body('id_area').isInt().withMessage("La contraseña no puede ser vacia"),
    body('id_rol').isInt().withMessage("La contraseña no puede ser vacia"),
    body('isActive').isBoolean().notEmpty().withMessage("isActive no puede ser vacia"),
    handleInputErrors,
    createNewUsuario)

router.put("/:id",
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    updateUsuario

)

router.patch('/:id',
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    activeUsuario
)



export default router;