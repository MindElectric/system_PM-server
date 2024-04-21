import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

require('dotenv').config();

// Extend the Request interface to include 'usuario' property
declare global {
    namespace Express {
        interface Request {
            usuario?: string;
            rol?: string[]
        }
    }
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"]
    if (!authHeader?.startsWith("Bearer ")) {
        // console.log("Not allowed")
        return res.sendStatus(401)
    };
    //console.log(authHeader) // Bearer token
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            // Check if decoded is an object and has a 'username' property
            if (typeof decoded === 'object' && 'userinfo' in decoded) {
                req.usuario = (decoded as JwtPayload).userinfo.username;
                req.rol = (decoded as JwtPayload).userinfo.rol
                next();
            } else {
                return res.status(403); //invalid token
            }
        }
    )
}

