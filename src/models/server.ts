import express from "express";
import marcaRouter from "../routes/marca_route";
import materialRouter from "../routes/material_route";
import categoria_materialRouter from "../routes/categoria_material_route";
import proveedorRouter from "../routes/proveedor_route";
import areaRouter from "../routes/area_route";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import db from "../config/db";

//Conectar a base de datos
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue("Conexion exitosa a la base de datos"))
    } catch (error) {
        console.log(error);
        console.log(colors.red("Hubo un error al conectar a la base de datos"))
    }
}
connectDB();

const server = express()

// Permitir conexiones
const corsOptions: CorsOptions = {
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
server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json());

server.use("/api/marca", marcaRouter);
server.use("/api/material", materialRouter);
server.use("/api/categoria_material", categoria_materialRouter);
server.use('/api/proveedor', proveedorRouter);
server.use('/api/area', areaRouter);


export default server;