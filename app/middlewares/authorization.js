import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { getConnection } from "../ConexionDB/connectionSQLServer.js";

dotenv.config();

async function soloAdmin(req, res, next) {
  const decodificada = await revisarCookie(req);
  if (!decodificada) return res.redirect("/");

  // Asumimos que todos los usuarios tienen rol de admin
  next();
}

async function soloPublico(req, res, next) {
  const logueado = await revisarCookie(req); // Asegúrate de usar await
  if (logueado) {
      return res.redirect("/admin");
  } else {
      return next();
  }
}

async function revisarCookie(req) {
  try {
    // Verificar si hay cookies en la cabecera
    if (!req.headers.cookie) {
      console.warn("No hay cookies en la solicitud.");
      return false;
    }

    const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt="));
    
    if (!cookieJWT) {
      console.warn("No se encontró la cookie 'jwt'.");
      return false;
    }

    // Extraer el valor de la cookie JWT
    const jwtToken = cookieJWT.slice(4); // Obtenemos solo el token, omitiendo "jwt="
    const decodificada = jsonwebtoken.verify(jwtToken, process.env.JWT_SECRET);
    
    // Verificamos que el usuario existe en la base de datos
    const pool = await getConnection();
    if (!pool) {
      console.error("No se pudo obtener el pool de conexiones.");
      return false;
    }
    
    const result = await pool.request()
        .input('usuario', decodificada.user)
        .query('SELECT * FROM Usuarios WHERE usuario = @usuario');
    
    const usuarioAResvisar = result.recordset[0];
    if (!usuarioAResvisar) {
      console.warn("Usuario no encontrado en la base de datos.");
      return false;
    }

    return decodificada;
  } catch (error) {
    console.error("Error en revisarCookie: ", error);
    return false;
  }
}

export const methods = {
  soloAdmin,
  soloPublico,
};
