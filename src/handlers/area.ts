import { Request, Response } from "express";
import Area from "../model/Area.model";
import { createEntity, deleteEntity, getAll, getById, updateEntity } from "./rest_functions";

export const getArea = (req: Request, res: Response) => {
    getAll(Area, req, res)
}

export const getAreabyId = (req: Request, res: Response) => {
    getById(Area, req, res);
}

export const createArea = (req: Request, res: Response) => {
    createEntity(Area, req, res);
}

export const updateArea = (req: Request, res: Response) => {
    updateEntity(Area, req, res);
}

export const deleteArea = (req: Request, res: Response) => {
    deleteEntity(Area, req, res);
}