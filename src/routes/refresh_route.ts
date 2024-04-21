import { Router } from "express";
import { handleRefreshToken } from "../handlers/refreshToken";

const router = Router();

router.get('/',
    handleRefreshToken
)


export default router;