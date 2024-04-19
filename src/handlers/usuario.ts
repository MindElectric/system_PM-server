import { Request, Response } from "express";
import Usuario from "../model/Usuario.model";
import Area from "../model/Area.model";
import Rol from "../model/Rol.model";

import * as bcrypt from 'bcrypt';


export const getUsuario = async (req: Request, res: Response) => {
    const user = await Usuario.findAll({
        include: [
            { model: Area, as: 'area' },
            { model: Rol, as: 'rol' }
        ]
    })

    if (!user) {
        return res.status(404).json({
            error: 'Usuario no encontrado'
        })
    }

    const data = user
    res.json({ data: data });
}


//Used in login
export const userLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await Usuario.findOne({
        where: {
            username
        }
    });

    if (!user) {
        return res.status(404).json({
            error: 'Usuario no encontrado'
        })
    }
    //evaluar contraseña
    const match = await bcrypt.compare(password, user.password);

    if (match) {
        //TODO: Crear jwt aqui
        res.json({ data: user })
    } else {
        res.sendStatus(401); // No autorizado
    }

}


// Registrar usuario
export const createNewUsuario = async (req: Request, res: Response) => {
    const { username, password, id_area, id_rol } = req.body

    //Checar si existe un usuario con el mismo nombre
    const duplicate = await Usuario.findOne({
        where: {
            username
        }
    })

    if (duplicate) return res.sendStatus(409)

    try {
        //encryptar contraseña
        const hashPassword = await bcrypt.hash(password, 10)
        const userObj = { "username": username, "password": hashPassword, "id_area": id_area, "id_rol": id_rol }
        //Crear usuario con la contraseña encriptada
        const newUser = await Usuario.create(userObj)
        res.status(201).json({ data: newUser })
    } catch (error) {

    }
}