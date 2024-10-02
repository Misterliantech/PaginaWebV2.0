import express from "express";
import path from 'path';
import { fileURLToPath } from "url";
const _dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication } from "./controllers/authentication.controller.js";

//Server

const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto", app.get("port"));

//Configuracion

app.use(express.static(_dirname + "/public"));

//Rutas

app.get("/",(req,res) => res.sendFile(_dirname + "/pages/login.html"));
app.get("/register",(req,res) => res.sendFile(_dirname + "/pages/register.html"));
app.get("/admin",(req,res) => res.sendFile(_dirname + "/pages/admin/admin.html"));
app.get("/admin",(req,res) => res.sendFile(_dirname + "/pages/admin/admin.html"));
app.get("/api/login", authentication.login);
app.get("/api/register", authentication.register);