import { Router } from "express";
import { handleLogout } from "../handlers/refreshToken";


const router = Router();

router.get('/',
    handleLogout
)


export default router;