import { Request, Response } from "express"
import { Op } from "sequelize"
import Material from "../model/Material.model"
import Marca from "../model/Marca.model"
import Area from "../model/Area.model"
import CategoriaMaterial from "../model/Categoria_Material.model"
import Proveedor from "../model/Proveedor.model"
import { Sequelize } from "sequelize-typescript"

interface properties {
    next?: object,
    previous?: object,
    data?: any[]
}

export const getMaterial = async (req: Request, res: Response) => {
    try {
        //Paginacion
        const page: number = Number(req.query.page);
        const limit: number = Number(req.query.limit);

        const search: string = req.query.search?.toString() || "";
        const category: string = req.query.category?.toString() || "All";

        const max: boolean = req.query.max ? req.query.max === 'true' : false;
        const min: boolean = req.query.min ? req.query.min === 'true' : false;




        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        let whereClause = {};

        //Busqueda para que sea case-insensitive
        if (search) {
            whereClause = {
                ...whereClause,
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.fn('lower', Sequelize.col('codigo')),
                        { [Op.like]: `%${search.toLowerCase()}%` }
                    )
                ]
            };
        };

        // Filtrar por categorias
        if (category !== 'All') {
            whereClause['id_categoria_material'] = category;
        }

        // Filter maximo
        if (max) {
            whereClause['cantidad'] = { [Op.gt]: Sequelize.col('maximo') };
        }

        // Filter minimo
        if (min) {
            whereClause['cantidad'] = { [Op.lt]: Sequelize.col('minimo') };
        }



        // Consulta para obtener todos los datos de material
        const material = await Material.findAll(
            {
                where: whereClause,
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

        const results: properties = {}

        // No mostrar si no hay mas articulos por mostrar
        if (endIndex < material.length) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        //No mostrar si esta en la pagina 1
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }


        results.data = material.slice(startIndex, endIndex)
        res.set('x-total-count', material.length.toString())
        res.json(
            results);

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
        const material = await Material.create(req.body);
        res.status(201).json({ data: material });
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

export const updateCantidad = async (req: Request, res: Response) => {
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
        material.cantidad = req.body.cantidad
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