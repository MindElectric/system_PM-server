import express from "express";
import {
    marcaRouter,
    materialRouter,
    categoria_materialRouter,
    proveedorRouter,
    areaRouter,
    material_proveedorRouter,
    usuarioRouter,
    loginRouter,
    refreshRouter,
    logoutRouter
} from '../routes/routes';
import colors from "colors";
import morgan from "morgan";
import { allowedOrigins } from "../config/allowedOrigins";
import cors, { CorsOptions } from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "../config/swagger";
import db from "../config/db";
import { credentials } from "../middleware/credentials";
import { verifyJWT } from "../middleware/verifyJWT";
import cookieParser from "cookie-parser";

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
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            // Permitir conexion origen
            callback(null, true)
        } else {
            // Denegar conexion origne
            callback(new Error('Error de CORS'))
        }
    }
}

server.use(credentials)

server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json());


// Middleware for cookies
server.use(cookieParser());

server.use(morgan("dev"))

//Routes API
server.use("/api/usuario", usuarioRouter);
server.use("/login", loginRouter);
server.use("/api/refresh", refreshRouter);
server.use("/logout", logoutRouter);

server.use(verifyJWT);
server.use("/api/marca", marcaRouter);
server.use("/api/material", materialRouter);
server.use("/api/categoria_material", categoria_materialRouter);
server.use('/api/proveedor', proveedorRouter);
server.use('/api/area', areaRouter);
server.use('/api/material_proveedor', material_proveedorRouter)

//DOCS
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server;