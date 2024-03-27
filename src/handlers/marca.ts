import { Request, Response } from "express"
//import { check, validationResult } from "express-validator";
import Marca from "../model/Marca.model";
import { createEntity, deleteEntity, getAll, getById, updateEntity } from "./rest_functions";

export const createMarca = async (req: Request, res: Response) => {
    createEntity(Marca, req, res);
}

export const getMarca = (req: Request, res: Response) => {
    getAll(Marca, req, res)
}

export const getMarcaById = (req: Request, res: Response) => {
    getById(Marca, req, res)
}

export const updateMarca = (req: Request, res: Response) => {
    updateEntity(Marca, req, res);
}

export const deleteMarca = async (req: Request, res: Response) => {
    deleteEntity(Marca, req, res);
}