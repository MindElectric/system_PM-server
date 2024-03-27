import { Request, Response } from "express"
import Material from "../model/Material.model"
import Marca from "../model/Marca.model"
import Area from "../model/Area.model"
import CategoriaMaterial from "../model/Categoria_Material.model"
import Proveedor from "../model/Proveedor.model"
import MaterialProveedor from "../model/Material_Proveedor.model"

export const getMaterial = async (req: Request, res: Response) => {
    try {
        // Consulta para obtener todos los datos de material
        const material = await Material.findAll(
            {
                include: [
                    { model: Marca, as: 'marca' },
                    { model: Area, as: 'area' },
                    { model: CategoriaMaterial, as: 'categoriaMaterial' },
                    {
                        model: Proveedor,
                        as: 'proveedores',
                        through: { as: "MaterialProveedor" }
                    }
                ]
            }
        )


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
        const material = await Material.findByPk(id, {
            include: [
                { model: Marca, as: 'marca' },
                { model: Area, as: 'area' },
                { model: CategoriaMaterial, as: 'categoriaMaterial' },
                {
                    model: Proveedor,
                    as: 'proveedores',
                    through: { as: "MaterialProveedor" }
                }
            ]
        });

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


//TODO: Posiblemente cambiar esto
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