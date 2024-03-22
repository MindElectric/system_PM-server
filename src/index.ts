import server from "./models/server"
import colors from "colors";

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(colors.cyan.bold(`REST API en el puerto ${port}`))
})