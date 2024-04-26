import { Request, Response } from "express"
import Notification from "../model/Notifications.model";
import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import Material from "../model/Material.model";
import Usuario from "../model/Usuario.model";
import { createEntity, deleteEntity } from "./rest_functions";



interface properties {
    next?: object,
    previous?: object,
    data?: any[]
}

export const getNotifications = async (req: Request, res: Response) => {
    try {
        //Paginacion
        const page: number = Number(req.query.page);
        const limit: number = Number(req.query.limit);

        const search: string = req.query.search?.toString() || "";
        const category: string = req.query.category?.toString() || "All";

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
        }
        if (category !== 'All') {
            whereClause['id_categoria_material'] = category;
        }



        // Consulta para obtener todos los datos de notificaciones
        const notification = await Notification.findAll(
            {
                where: whereClause,
                include: [
                    { model: Material, as: 'material' },
                    { model: Usuario, as: 'user' },
                    // { model: CategoriaMaterial, as: 'categoriaMaterial' },
                    // {
                    //     model: Proveedor,
                    //     as: 'proveedores',
                    //     through: { as: "MaterialProveedor" }
                    // }
                ]
            }
        )


        if (!notification) {
            return res.status(404).json({
                error: 'Material no encontrado'
            })
        }

        const results: properties = {}

        // No mostrar si no hay mas articulos por mostrar
        if (endIndex < notification.length) {
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


        results.data = notification.slice(startIndex, endIndex)
        res.set('x-total-count', notification.length.toString())
        res.json(
            results);

    } catch (error) {
        console.log(error);
    }
}

export const createNotification = async (req: Request, res: Response) => {
    createEntity(Notification, req, res)
}

export const deleteNotification = async (req: Request, res: Response) => {
    deleteEntity(Notification, req, res)
}