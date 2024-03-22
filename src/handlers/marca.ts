import { Request, Response } from "express"
//import { check, validationResult } from "express-validator";
import Marca from "../model/Marca.model";

export const createMarca = async (req: Request, res: Response) => {
    try {
        const marca = Marca.create(req.body);
        res.json({ data: marca });
    } catch (error) {
        console.log(error);
    }
}

export const getMarcaById = async (req: Request, res: Response) => {
    try {
        //console.log(req.params.id)
        const { id } = req.params;
        //Revisar si la marca exista
        const marca = await Marca.findByPk(id);

        if (!marca) {
            return res.status(404).json({
                error: 'Marca no encontrado'
            })
        }
        res.json({ data: marca });

    } catch (error) {
        console.log(error);
    }
}

export const updateMarca = async (req: Request, res: Response) => {
    try {
        console.log(req.params.id)
        const { id } = req.params;
        //Revisar si la marca exista
        const marca = await Marca.findByPk(id);

        if (!marca) {
            return res.status(404).json({
                error: 'Marca no encontrado'
            })
        }


        // Actualizar
        await marca.update(req.body);
        await marca.save()

        res.json({ data: marca });



    } catch (error) {
        console.log(error);
    }
}

export const deleteMarca = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        //Revisar si la marca existe
        const marca = await Marca.findByPk(id);

        if (!marca) {
            return res.status(404).json({
                error: 'Marca no encontrado'
            })
        }

        await marca.destroy()
        res.json({ data: "Producto Eliminado" })

    } catch (error) {
        console.log(error);
    }
}