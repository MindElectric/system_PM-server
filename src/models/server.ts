import express from "express";
import inventarioRouter from "../router";
import materialRouter from "../routes";
import colors from "colors";
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

//Leer datos de formularios
server.use(express.json());

server.use("/api/marca", inventarioRouter);
server.use("/api/material", materialRouter);

export default server;