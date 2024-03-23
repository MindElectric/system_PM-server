import { Request, Response } from "express"
import Material from "../model/Material.model"

export const getMaterial = async (req: Request, res: Response) => {
    try {
        const material = await Material.findAll()

        if (!material) {
            return res.status(404).json({
                error: 'Material no encontrado'
            })
        }
        res.json({ data: material });

    } catch (error) {
        console.log(error);
    }
}


export const getMaterialById = async (req: Request, res: Response) => {
    try {
        //console.log(req.params.id)
        const { id } = req.params;
        //Revisar si la marca exista
        const material = await Material.findByPk(id);

        if (!material) {
            return res.status(404).json({
                error: 'Material no encontrado'
            })
        }
        res.json({ data: material });

    } catch (error) {
        console.log(error);
    }
};

export const createMaterial = async (req: Request, res: Response) => {
    try {
        const material = Material.create(req.body);
        res.json({ data: material });
    } catch (error) {
        console.log(error);
    }
}

export const updateMaterial = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        //Revisar si el material existe
        const material = await Material.findByPk(id);

        if (!material) {
            return res.status(404).json({
                error: 'Material no encontrado'
            })
        }


        // Actualizar
        await material.update(req.body);
        await material.save();

        res.json({ data: material });
    } catch (error) {
        console.log(error);
    }
}

export const deleteMaterial = async (req: Request, res: Response) => {
    const { id } = req.params;
    //Revisar si la marca existe
    const material = await Material.findByPk(id);

    if (!material) {
        return res.status(404).json({
            error: 'Material no encontrado'
        })
    }

    await material.destroy()
    res.json({ data: "Material Eliminado" })
}