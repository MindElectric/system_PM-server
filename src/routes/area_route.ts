import { Router } from "express";

import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";
import { createArea, deleteArea, getArea, getAreabyId, updateArea } from "../handlers/area";

const router = Router();

router.get('/', getArea);

router.get('/:id',
    param('id').isInt().withMessage("ID no  valido"),
    handleInputErrors,
    getAreabyId
);

router.post(
    '/',
    // Validation
    body('nombre').notEmpty().withMessage("El nombre de proveedor no puede ser vacia"),
    handleInputErrors,
    createArea
)

router.put('/:id',
    param('id').isInt().withMessage("ID no  valido"),
    body('nombre').notEmpty().withMessage("El nombre de proveedor no puede ser vacia"),
    handleInputErrors,
    updateArea
);

router.delete('/:id',
    param('id').isInt().withMessage("ID no  valido"),
    handleInputErrors,
    deleteArea
)


export default router;