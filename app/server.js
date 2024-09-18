import express from "express";
import path from 'path';
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import {methods as authentication} from "./controllers/authentication.js"

//Server
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto #",app.get("port"));

//Rutas
app.get("/", (req, res)=> res.sendFile(__dirname + "/pages/login.html"))
app.get("/register", (req, res)=> res.sendFile(__dirname + "/pages/register.html"))
app.get("/catalogo/catalogo", (req, res)=> res.sendFile(__dirname + "/pages/catalogo/catalogo.html"))
app.get("/api/register",authentication.register);
app.get("/api/login",authentication.login);

//Configuracion

app.use(express.static(__dirname + "/public"));