import { Request, Response } from "express";

interface properties {
    next?: object,
    previous?: object,
    data?: any[]
}

export const getAll = async (model: any, req: Request, res: Response) => {
    const entity = await model.findAll()

    if (!entity) {
        return res.status(404).json({
            error: 'Entidad no encontrado'
        })
    }

    const data = entity
    res.json({ data: data });
}


export const getAllPaginate = async (model: any, req: Request, res: Response) => {
    try {
        //Pagination
        const page: number = Number(req.query.page)
        const limit: number = Number(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const entity = await model.findAll()

        if (!entity) {
            return res.status(404).json({
                error: 'Entidad no encontrado'
            })
        }

        const results: properties = {}

        // No mostrar si no hay mas articulos por mostrar
        if (endIndex < entity.length) {
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


        results.data = entity.slice(startIndex, endIndex)
        res.json(results);
    } catch (error) {
        console.log(error);
    }
}

export const getById = async (model: any, req: Request, res: Response) => {
    try {
        //console.log(req.params.id)
        const { id } = req.params;
        //Revisar si la entidad exista
        const entity = await model.findByPk(id);

        if (!entity) {
            return res.status(404).json({
                error: 'Entidad no encontrado'
            })
        }
        res.json({ data: entity });

    } catch (error) {
        console.log(error);
    }
}

export const createEntity = async (model: any, req: Request, res: Response) => {
    try {
        const entity = await model.create(req.body);
        res.status(201).json({ data: entity });
    } catch (error) {
        console.log(error);
    }
}

export const updateEntity = async (model: any, req: Request, res: Response) => {
    try {
        const { id } = req.params;
        //Revisar si la marca exista
        const entity = await model.findByPk(id);

        if (!entity) {
            return res.status(404).json({
                error: 'Entidad no encontrado'
            })
        }


        // Actualizar
        await entity.update(req.body);
        await entity.save()

        res.json({ data: entity });
    } catch (error) {
        console.log(error);
    }
};

export const deleteEntity = async (model: any, req: Request, res: Response) => {
    try {
        const { id } = req.params;
        //Revisar si la entidad existe
        const entity = await model.findByPk(id);

        if (!entity) {
            return res.status(404).json({
                error: 'Entidad no encontrado'
            })
        }

        await entity.destroy()
        res.json({ data: "Entidad Eliminado" })

    } catch (error) {
        console.log(error);
    }
}