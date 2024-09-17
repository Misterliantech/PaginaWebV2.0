import express from "express";
import path from 'path';
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

//Server
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto #",app.get("port"));

//Rutas
app.get("/", (req, res)=> res.sendFile(__dirname + "/pages/login.html"))
app.get("/register", (req, res)=> res.sendFile(__dirname + "/pages/register.html"))

//Configuracion

app.use(express.static(__dirname + "/public"));