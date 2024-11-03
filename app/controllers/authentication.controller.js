import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { getConnection } from "../ConexionDB/connectionSQLServer.js";

dotenv.config();

async function login(req, res) {
  const user = req.body.user;
  const password = req.body.password;

  // Verifica que se proporcionen los campos necesarios
  if (!user || !password) {
    return res.status(400).json({ status: "Error", message: "Los campos están incompletos" });
  }

  let pool;
  try {
    pool = await getConnection();
    if (!pool) {
      return res.status(500).json({ status: "Error", message: "No se pudo conectar a la base de datos." });
    }

    const result = await pool.request()
      .input('usuario', user)
      .query('SELECT * FROM Usuarios WHERE usuario = @usuario');
    
    const usuarioAResvisar = result.recordset[0];
    if (!usuarioAResvisar) {
      return res.status(400).json({ status: "Error", message: "Usuario no encontrado" });
    }

    const loginCorrecto = await bcryptjs.compare(password, usuarioAResvisar.clave);
    if (!loginCorrecto) {
      return res.status(400).json({ status: "Error", message: "Contraseña incorrecta" });
    }

    const token = jsonwebtoken.sign(
      { user: usuarioAResvisar.usuario },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false, // Cambia a true si usas HTTPS
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    });

    res.json({ status: "ok", message: "Usuario loggeado", redirect: "/admin" });
  } catch (error) {
    console.error("Error en login: ", error);
    res.status(500).json({ status: "Error", message: "Error interno del servidor" });
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

async function register(req, res) {
  const user = req.body.user;
  const password = req.body.password;
  const email = req.body.email;

  // Verifica que se proporcionen los campos necesarios
  if (!user || !password || !email) {
    return res.status(400).json({ status: "Error", message: "Los campos están incompletos" });
  }

  let pool;
  try {
    pool = await getConnection();
    if (!pool) {
      return res.status(500).json({ status: "Error", message: "No se pudo conectar a la base de datos." });
    }

    // Verificar si el usuario ya existe
    const result = await pool.request()
      .input('usuario', user)
      .query('SELECT * FROM Usuarios WHERE usuario = @usuario');

    const usuarioAResvisar = result.recordset[0];
    if (usuarioAResvisar) {
      return res.status(400).json({ status: "Error", message: "Este usuario ya existe" });
    }

    // Encriptar la contraseña
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // Insertar nuevo usuario en la base de datos
    await pool.request()
      .input('usuario', user)
      .input('clave', hashPassword)
      .input('email', email)
      .query('INSERT INTO Usuarios (usuario, clave, email) VALUES (@usuario, @clave, @email)');

    return res.status(201).json({ status: "ok", message: `Usuario ${user} agregado`, redirect: "/" });
  } catch (error) {
    console.error("Error en registro: ", error);
    res.status(500).json({ status: "Error", message: "Error interno del servidor" });
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

export const methods = {
  login,
  register
};
