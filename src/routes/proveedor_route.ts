import { Router } from "express";

import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";
import { createProveedor, deleteProveedor, getProveedor, getProveedorbyId, updateProveedor } from "../handlers/proveedor";

const router = Router();

router.get('/', getProveedor)

router.get('/:id',
    param('id').isInt().withMessage("ID no valido"),
    handleInputErrors,
    getProveedorbyId
);


router.post(
    '/',
    // Validation
    body('nombre').notEmpty().withMessage("El nombre de proveedor no puede ser vacia"),
    body('contacto').notEmpty().withMessage("El contacto no puede ser vacio"),
    handleInputErrors,
    createProveedor
)

router.put('/:id',
    param('id').isInt().withMessage("ID no valido"),
    body('nombre').notEmpty().withMessage("El nombre de proveedor no puede ser vacia"),
    body('contacto').notEmpty().withMessage("El contacto de proveedor no puede ser vacia"),
    handleInputErrors,
    updateProveedor
);

router.delete('/:id',
    param('id').isInt().withMessage("ID no valido"),
    handleInputErrors,
    deleteProveedor
)





export default router;