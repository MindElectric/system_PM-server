import { Request, Response, NextFunction } from "express"

export const verifyRol = (...allowedRoles) => {

    return (req: Request, res: Response, next: NextFunction) => {
        if (!req?.rol) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        // console.log(rolesArray);
        // console.log(req.rol);

        if (rolesArray.includes(req.rol)) {
            next();
        } else {
            res.sendStatus(403); // Forbidden
        }
    }
}