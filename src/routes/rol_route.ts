import { Router } from "express";

import { handleInputErrors } from "../middleware";
import { getRol } from "../handlers/rol";

const router = Router()

router.get('/', getRol)

export default router;