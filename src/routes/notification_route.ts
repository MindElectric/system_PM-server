import { Router } from "express";

import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";
import { createNotification, deleteNotification, getNotifications } from "../handlers/notifications";

const router = Router()

router.get('/', getNotifications);

router.post('/',
    body('material_id').isInt().withMessage("Material id no valido"),
    body('user_id').isInt().withMessage("User id no valido"),
    body("type").notEmpty().withMessage("type no puede ser vacia"),
    handleInputErrors,
    createNotification);

router.delete('/:id',
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    deleteNotification
)


export default router