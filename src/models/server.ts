import express from "express";
import marcaRouter from "../routes/marca_route";
import materialRouter from "../routes/material_route";
import categoria_materialRouter from "../routes/categoria_material_route";
import proveedorRouter from "../routes/proveedor_route";
import areaRouter from "../routes/area_route";
import material_proveedorRouter from "../routes/material_proveedor_route";
import usuarioRouter from "../routes/user_route";
import loginRouter from "../routes/login"
import colors from "colors";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "../config/swagger";
import db from "../config/db";

//Conectar a base de datos
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.blue("Conexion exitosa a la base de datos"))
    } catch (error) {
        //console.log(error);
        console.log(colors.red("Hubo un error al conectar a la base de datos"))
    }
}
connectDB();

const server = express()

// Permitir conexiones
const corsOptions: CorsOptions = {
    exposedHeaders: ['x-total-count'],
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            // Permitir conexion origen
            callback(null, true)
        } else {
            // Denegar conexion origne
            callback(new Error('Error de CORS'))
        }
    }
}
//server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json());


server.use(morgan("dev"))

//Routes API
server.use("/api/marca", marcaRouter);
server.use("/api/material", materialRouter);
server.use("/api/categoria_material", categoria_materialRouter);
server.use('/api/proveedor', proveedorRouter);
server.use('/api/area', areaRouter);
server.use('/api/material_proveedor', material_proveedorRouter)
server.use("/api/usuario", usuarioRouter)
server.use("/api/login", loginRouter)

//DOCS
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server;