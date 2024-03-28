import { Router } from "express";
import { createMarca, deleteMarca, getMarca, getMarcaById, updateMarca } from "../handlers/marca";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const router = Router()

/** 
* @swagger
* components: 
*   schemas:
*       Marca:
*           type: object
*           properties:
*               id: 
*                   type: integer
*                   description: El id de la marca
*                   example: 1
* 
*               nombre:
*                   type: string
*                   description: El nombre de la marca
*                   example: FIERO
*/

/**
 * @swagger
 * /api/marca:
 *      get:
 *          summary: Obtiene la lista de marcas
 *          tags:
 *              - Marca
 * 
 *          description: Retorna una lista de marcas
 *          responses:
 *              200:
 *                  description: Successfull Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Marca'
 *  
 */

// Routing
router.get("/", getMarca);


/**
 * @swagger
 * /api/marca/{id}:
 *  get:
 *      summary: Obtener marca por su id
 *      tags:
 *          - Marca
 * 
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: El ID del producto a retornar
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      $ref: '#/components/schemas/Marca'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404: 
 *              description: Marca not found
 * 
 * 
 */
router.get('/:id',
    param('id').isInt().withMessage("ID no valido"),
    handleInputErrors,
    getMarcaById
);

/**
 * @swagger
 * /api/marca:
 *  post:
 *      summary: Crea una nueva marca
 *      tags:
 *          - Marca
 * 
 *      description: Returns a new marca in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nombre:
 *                              type: string
 *                              example: FIERO
 *      responses:
 *          201:
 *              description: Successfull Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Marca'
 *          400:
 *              description: Bad Request - Invalid Input Data
 * 
 */

router.post('/',
    //Validation
    body('nombre').notEmpty().withMessage("El nombre de marca no puede ser vacio"),
    handleInputErrors,
    createMarca
);

/**
 * @swagger
 * /api/marca/{id}:
 *  put:
 *      summary: Actualiza una marca hecha por el usuario
 *      tags:
 *          - Marca
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: El ID del producto a retornar
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nombre:
 *                              type: string
 *                              example: FIERO
 * 
 *      responses:
 *          200:
 *              description: Successfull Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Marca'
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data
 *          404:
 *              description: Marca Not Found          
 * 
 */

router.put('/:id',
    param('id').isInt().withMessage("ID no valido"),
    body('nombre').notEmpty().withMessage("El nombre de marca no puede ser vacio"),
    handleInputErrors,
    updateMarca
);

/**
 * @swagger
 * /api/marca/{id}:
 *  delete:
 *      summary: Borrar una marca por su id
 *      tags:
 *          - Marca
 *      description: Eliminates a marca
 *      parameters:
 *        - in: path
 *          name: id
 *          description: El ID del producto a eliminar
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successfull Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: "Marca eliminada"
 *      
 */

router.delete('/:id',
    param('id').isInt().withMessage("ID no valido"),
    handleInputErrors,
    deleteMarca
)

export default router;