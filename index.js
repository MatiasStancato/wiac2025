//referenciamos a express
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import connection from "./database/db.js";
dotenv.config({ path: "./env/.env" });
import cors from "cors";

const app = express(); //
//para capturar los datos del formulario
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//invocamos a dotenv
const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//seteamos el directorio public
app.use("/resources", express.static("public"));
app.use("/resources", express.static(__dirname + "/public"));

//establecemos el motor de plantillas ejs
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//bcryptjs
import bcryptjs from "bcryptjs";

//express-session
import session from "express-session";
app.use(
    session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,    
    })
);

// Usar las rutas
import router from "./routes/router.js";
app.use("/", router);



app.listen(port, () => {
    console.log(`SERVER corriendo en http://localhost:${port}`);
}); //metodo de express
