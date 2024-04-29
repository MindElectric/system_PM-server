import { Request, Response } from "express";
import Rol from "../model/Rol.model";
import { getAll } from "./rest_functions";

export const getRol = (req: Request, res: Response) => {
    getAll(Rol, req, res)
}