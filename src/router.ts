import { Router } from "express";
import { createMarca, deleteMarca, getMarcaById, updateMarca } from "./handlers/marca";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router()

// Routing
router.get("/", (req, res) => {
    res.send("Desde GET")
});

router.get('/:id',
    param('id').isInt().withMessage("ID no  valido"),
    handleInputErrors,
    getMarcaById
);

router.post('/',
    //Validation
    body('nombre').notEmpty().withMessage("El nombre de marca no puede ser vacio"),
    handleInputErrors,
    createMarca
);

router.put('/:id',
    param('id').isInt().withMessage("ID no  valido"),
    body('nombre').notEmpty().withMessage("El nombre de marca no puede ser vacio"),
    handleInputErrors,
    updateMarca
);

router.delete('/:id',
    param('id').isInt().withMessage("ID no  valido"),
    handleInputErrors,
    deleteMarca
)

export default router;