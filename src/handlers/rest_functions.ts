import { Request, Response } from "express";

export const getAll = async (model: any, req: Request, res: Response) => {
    try {
        const entity = await model.findAll()

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

export const getById = async (model: any, req: Request, res: Response) => {
    try {
        //console.log(req.params.id)
        const { id } = req.params;
        //Revisar si la entidad exista
        const entity = await model.findByPk(id);

        if (!entity) {
            return res.status(404).json({
                error: 'Marca no encontrado'
            })
        }
        res.json({ data: entity });

    } catch (error) {
        console.log(error);
    }
}

export const createEntity = async (model: any, req: Request, res: Response) => {
    try {
        const entity = model.create(req.body);
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
        //Revisar si la marca existe
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