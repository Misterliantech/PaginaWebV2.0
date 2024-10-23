import { usuarios } from "../controllers/authentication.controller.js";
import {getConnection, mssql} from "./ConexionDB/connectionSQLServer.js";

async function agregarUsuario(usuario, clave) {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('usuario', sql.VarChar, usuario)
            .input('clave', sql.VarChar, clave)
            .query('INSERT INTO Usuarios (usuario, clave) VALUES (@usuario, @clave)');
        console.log('Usuario agregado:', result.rowsAffected);
    } catch (err) {
        console.error('Error al agregar usuario:', err);
    }
}

async function obtenerUsuarios() {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .query('SELECT usuario FROM Usuarios');
        console.log('Usuarios existentes:', result.recordset);
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
    }
}
