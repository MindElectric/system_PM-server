import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Marca',
                description: 'Operaciones API relacionadas a marcas'
            }
        ],
        info: {
            title: 'REST API Sistema Pequeños Momentos',
            version: "1.0.0",
            description: "API Docs para marcas"
        }
    },
    apis: ['./src/routes/marca_route.ts'] //Agregar comas para mas archivos
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec