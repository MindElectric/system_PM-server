import express from "express";
import inventarioRouter from "../routes/marca_route";
import materialRouter from "../routes/material_route";
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
//server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json());

server.use("/api/marca", inventarioRouter);
server.use("/api/material", materialRouter);

export default server;