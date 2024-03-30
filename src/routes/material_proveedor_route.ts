import { Router } from "express";

import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";
import { createMaterialProveedor, getMaterialProveedor, getMaterialProveedorById, updateMaterialProveedor } from "../handlers/material_proveedor";

const router = Router();

router.get('/', getMaterialProveedor)

router.get('/:id_proveedor/:id_material',
    param('id_proveedor').isInt().withMessage("ID no valido"),
    param('id_material').isInt().withMessage("ID no valido"),
    handleInputErrors,
    getMaterialProveedorById
)

router.post('/',
    body('id_proveedor').isInt().withMessage("ID no valido"),
    body('id_material').isInt().withMessage("ID no valido"),
    handleInputErrors,
    createMaterialProveedor
)

router.put('/:id_proveedor/:id_material',
    param('id_proveedor').isInt().withMessage("ID no valido"),
    param('id_material').isInt().withMessage("ID no valido"),
    body('id_proveedor').isInt().withMessage("ID no valido"),
    body('id_material').isInt().withMessage("ID no valido"),
    handleInputErrors,
    updateMaterialProveedor
)

// router.delete('/:id_proveedor/:id_material',
//     param('id_proveedor').isInt().withMessage("ID no valido"),
//     param('id_material').isInt().withMessage("ID no valido"),
//     handleInputErrors,
//     deleteMaterialProveedor
// )

export default router;