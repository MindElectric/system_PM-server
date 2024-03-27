import { Router } from "express";

import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";
import { createCategoria_Material, deleteCategoriaMaterial, getCategoriaMaterial, getCategoriaMaterialbyId, updateCategoriaMaterial } from "../handlers/categoria_material";


const router = Router();

router.get('/', getCategoriaMaterial);

router.get('/:id',
    param('id').isInt().withMessage("ID no  valido"),
    handleInputErrors,
    getCategoriaMaterialbyId
);

router.post('/',
    // Validation
    body('nombre').notEmpty().withMessage("El nombre de categoria no puede ser vacia"),
    handleInputErrors,
    createCategoria_Material
);

router.put('/:id',
    param('id').isInt().withMessage("ID no  valido"),
    body('nombre').notEmpty().withMessage("El nombre de categoria no puede ser vacia"),
    handleInputErrors,
    updateCategoriaMaterial
);

router.delete('/:id',
    param('id').isInt().withMessage("ID no  valido"),
    handleInputErrors,
    deleteCategoriaMaterial
)


export default router;