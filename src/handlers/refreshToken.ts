import { Request, Response } from "express";
import Usuario from "../model/Usuario.model";
import jwt from "jsonwebtoken"

export const handleRefreshToken = async (req: Request, res: Response) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.sendStatus(401);

    const refresh_token = cookies.jwt;

    const user = await Usuario.findOne({
        where: {
            refresh_token
        }
    });

    if (!user) {
        return res.sendStatus(403); //Forbidden
    }
    //evaluar jwt

    jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET,
        (err: any, decoded: { username: string; }) => {
            if (err || user.username !== decoded.username) return res.sendStatus(403);
            const rol = Object.values(user.rol);
            const accessToken = jwt.sign(
                {
                    "userinfo": {
                        "username": decoded.username,
                        "rol": rol
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );
            res.json({ accessToken })
        }
    )
}

export const handleLogout = async (req: Request, res: Response) => {
    // Delete accessToken on client
    const cookies = req.cookies

    if (!cookies?.jwt) return res.sendStatus(204);

    const refresh_token = cookies.jwt;

    // Is refresh token in DB?
    const user = await Usuario.findOne({
        where: {
            refresh_token
        }
    });

    if (!user) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: "none", secure: true })
        return res.sendStatus(204);
    }

    //Delete refresh token
    user.refresh_token = ''
    await user.save();
    res.clearCookie('jwt', { httpOnly: true, sameSite: "none", secure: true }) // add secure: true //Works only in https
    res.sendStatus(204)
}