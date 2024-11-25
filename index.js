//referenciamos a express
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import connection from "./database/db.js";
dotenv.config({ path: "./env/.env" });
import cors from "cors";
import cookieSession from "cookie-session";

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

// cookie-session
app.use(
    cookieSession({
        name: "session",
        secret: process.env.SESSION_SECRET || "secret",
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    })
);

// Usar las rutas
import router from "./routes/router.js";
app.use("/", router);



app.listen(port, () => {
    console.log(`SERVER corriendo en http://localhost:${port}`);
}); //metodo de express

process.on('uncaughtException', (err) => {
    console.error('Excepción no capturada:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesa rechazada sin manejar:', promise, 'Razón:', reason);
});


