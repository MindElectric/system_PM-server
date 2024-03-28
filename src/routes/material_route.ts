import { Router } from "express";

import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";
import { createMaterial, deleteMaterial, getMaterial, getMaterialById, updateMaterial } from "../handlers/material";

const router = Router();

// Routing Material
router.get('/', getMaterial
);

router.get('/:id',
    param('id').isInt().withMessage("ID no valido"),
    handleInputErrors,
    getMaterialById
);

router.post('/',
    //Validation
    body('descripcion').notEmpty().withMessage("La descripción no puede ser vacía"),
    body('cantidad').isInt().notEmpty().withMessage("La cantidad no puede ser vacía"),
    body('codigo').notEmpty().withMessage("El código no puede ser vacío"),
    body('costo').notEmpty().withMessage("El costo no puede ser vacío"),
    body('id_marca').notEmpty().withMessage("El id de marca no puede ser vacío").isInt().withMessage("El id de marca debe ser un número entero"),
    body('id_area').notEmpty().withMessage("El id de área no puede ser vacío").isInt().withMessage("El id de área debe ser un número entero"),
    body('id_proveedor').notEmpty().withMessage("El id de proveedor no puede ser vacío").isInt().withMessage("El id de proveedor debe ser un número entero"),
    body('id_categoria_material').notEmpty().withMessage("El id de categoría de material no puede ser vacío").isInt().withMessage("El id de categoría de material debe ser un número entero"),
    handleInputErrors,
    createMaterial
);

router.put("/:id",
    param('id').isInt().withMessage("ID no valido"),
    handleInputErrors,
    updateMaterial
);

router.delete('/:id',
    param('id').isInt().withMessage("ID no valido"),
    handleInputErrors,
    deleteMaterial
)

export default router;