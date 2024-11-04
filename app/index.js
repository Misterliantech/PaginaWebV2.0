import express from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';

import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import {methods as authentication} from "./controllers/authentication.controller.js"
import {methods as authorization} from "./middlewares/authorization.js";
import { error } from "console";

const app = express();
app.set("port",4000);
app.listen(app.get("port"), () => {
  console.log("Servidor corriendo en puerto", app.get("port"));
});

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cors({
  origin: '*', // Permitir todos los orígenes
  credentials: true, // Esto permite el envío de cookies
}));
app.use(cookieParser());

app.get("/",authorization.soloPublico,(req,res)=> res.sendFile(__dirname + "/pages/login.html"));
app.get("/register",authorization.soloPublico,(req,res)=> res.sendFile(__dirname + "/pages/register.html"));
app.get("/logout", authorization.soloAdmin, (req, res) => {
  res.clearCookie('jwt');
  res.redirect("/");
  });
app.get("/soporte", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/admin/soporte.html"));
app.get("/proyectos", authorization.soloAdmin, (req, res) => res.sendFile(__dirname + "/pages/admin/proyectos.html"));
app.get("/admin",authorization.soloAdmin,(req,res)=> res.sendFile(__dirname + "/pages/admin/admin.html"));
app.post("/api/login",authentication.login);
app.post("/api/register",authentication.register);