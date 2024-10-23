import mssql from "mssql";

const connectionSettings = {

    server: "Quintero_Pinto\SQLEXPRESS",
    database: "nodelogin",
    user: "sa",
    password: "",
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

export async function getConnection(){

    try {

        return await mssql.connect(connectionSettings);

    }
    catch (error){
        console.error(error);
    }
}

export { mssql };

