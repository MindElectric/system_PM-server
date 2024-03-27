import { Request, Response } from "express";
import Proveedor from "../model/Proveedor.model";
import { createEntity, deleteEntity, getAll, getById, updateEntity } from "./rest_functions";


export const getProveedor = (req: Request, res: Response) => {
    getAll(Proveedor, req, res);
}

export const getProveedorbyId = (req: Request, res: Response) => {
    getById(Proveedor, req, res);
}

export const createProveedor = (req: Request, res: Response) => {
    createEntity(Proveedor, req, res);
}

export const updateProveedor = (req: Request, res: Response) => {
    updateEntity(Proveedor, req, res);
}

export const deleteProveedor = async (req: Request, res: Response) => {
    deleteEntity(Proveedor, req, res);
}