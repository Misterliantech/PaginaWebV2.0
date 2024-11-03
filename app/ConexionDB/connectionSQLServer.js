import mssql from "mssql";

const connectionSettings = {

    server: 'localhost',
    database: 'Credenciales',
    user: 'Quintero',
    password: "clave123",
    port: 1433,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

async function getConnection(){

    try {

        const pool = await mssql.connect(connectionSettings);
        console.log('Conexion establecida');
        return pool;
        
    } catch (error) {
        
        console.error('Error al obtener pool de conexiones', error);
        return null;

    }
}

export { getConnection };

