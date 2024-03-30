import { Request, Response } from "express"
import MaterialProveedor from "../model/Material_Proveedor.model"
import Proveedor from "../model/Proveedor.model"
import Material from "../model/Material.model";
import { createEntity, deleteEntity, updateEntity } from "./rest_functions";

export const getMaterialProveedor = async (req: Request, res: Response) => {
    const materialProveedores = await MaterialProveedor.findAll({
        include: [
            {
                model: Material,
                as: 'material'
            },
            {
                model: Proveedor,
                as: 'proveedor'
            }
        ]
    });

    if (!materialProveedores) {
        return res.status(404).json({
            error: 'Material no encontrado'
        })
    }
    res.json({ data: materialProveedores });
}

export const getMaterialProveedorById = async (req: Request, res: Response) => {
    const { id_proveedor, id_material } = req.params;

    const materialProveedores = await MaterialProveedor.findOne({
        where: {
            id_proveedor: id_proveedor,
            id_material: id_material
        },
        include: [
            {
                model: Material,
                as: 'material'
            },
            {
                model: Proveedor,
                as: 'proveedor'
            }
        ]
    });

    if (!materialProveedores) {
        return res.status(404).json({
            error: 'Material no encontrado'
        })
    }
    res.json({ data: materialProveedores });
}

export const createMaterialProveedor = (req: Request, res: Response) => {
    createEntity(MaterialProveedor, req, res)
}

export const updateMaterialProveedor = async (req: Request, res: Response) => {
    const { id_proveedor, id_material } = req.params;
    const materialProveedores = await MaterialProveedor.findOne({
        where: {
            id_proveedor: id_proveedor,
            id_material: id_material
        },
    })

    if (!materialProveedores) {
        return res.status(404).json({
            error: 'Material no encontrado'
        })
    }

    //Borrar primero
    await materialProveedores.destroy()

    // Actualizar
    const actualizadoMaterialProveedores = await MaterialProveedor.create(req.body)
    res.status(201).json({ data: actualizadoMaterialProveedores });
}

// export const deleteMaterialProveedor = async (req: Request, res: Response) => {
//     const { id_proveedor, id_material } = req.params;
//     const materialProveedores = await MaterialProveedor.findOne({
//         where: {
//             id_proveedor: id_proveedor,
//             id_material: id_material
//         },
//     })

//     if (!materialProveedores) {
//         return res.status(404).json({
//             error: 'Material no encontrado'
//         })
//     }

//     await materialProveedores.destroy()
//     res.json({ data: "Entidad Eliminado" })


// }