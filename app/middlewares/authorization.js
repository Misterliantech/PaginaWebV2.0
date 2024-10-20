import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import {usuarios} from "./../controllers/authentication.controller.js";

dotenv.config();

function soloAdmin(req, res, next, decodificada) {
  const logueado = revisarCookie(req);
  if (!logueado) return res.redirect("/");
  const usuario = usuarios.find(usuario => usuario.user === decodificada.user);
  if (usuario && usuario.rol === "admin") {
    next();
  } else {
    res.status(403).send("No tienes permiso para acceder a esta página");
  }
}

function soloPublico(req, res, next) {
  const logueado = revisarCookie(req);
  if (logueado) {
    return res.redirect("/admin");
  } else {
    return next();
  }
}

function revisarCookie(req) {
  try {
    const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
    const decodificada = jsonwebtoken.verify(cookieJWT, process.env.JWT_SECRET);
    const usuarioAResvisar = usuarios.find(usuario => usuario.user === decodificada.user);
    if (!usuarioAResvisar) {
      return false;
    }
    return decodificada;
  } catch {
    return false;
  }
}


export const methods = {
  soloAdmin,
  soloPublico,
}