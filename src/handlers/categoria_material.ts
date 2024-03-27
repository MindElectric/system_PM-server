import { Request, Response } from "express";
import CategoriaMaterial from "../model/Categoria_Material.model";
import { createEntity, deleteEntity, getAll, getById, updateEntity } from "./rest_functions";

export const getCategoriaMaterial = async (req: Request, res: Response) => {
    getAll(CategoriaMaterial, req, res);
}

export const getCategoriaMaterialbyId = async (req: Request, res: Response) => {
    getById(CategoriaMaterial, req, res);
}

export const createCategoria_Material = async (req: Request, res: Response) => {
    createEntity(CategoriaMaterial, req, res);
}

export const updateCategoriaMaterial = async (req: Request, res: Response) => {
    updateEntity(CategoriaMaterial, req, res);
}

export const deleteCategoriaMaterial = async (req: Request, res: Response) => {
    deleteEntity(CategoriaMaterial, req, res);
}