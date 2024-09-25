import bcryptjs from "bcryptjs";

const usuarios = [{
    user: "a",
    email: "a@a.com",
    password: "a"
}]


async function login(req,res) {

}

async function register(req,res){
    console.log(req.body);
    const user = req.body.user;
    const password = req.body.user;
    const email = req.body.user;
    if (!user || !password || !email){
        res.status(400).send({status: "Error", message: "Los campos estan incompletos"});
    }

    const usuarioRevisar = usuarios.find(usuario => usuario.user == user);

    if(usuarioRevisar){
        res.status(400).send({status: "Error", message: "Este usuario ya existe"});
    }

    const salt = await bcryptjs.genSaltalt(5);
    const hashPassword = await bcryptjs.hash(password,salt);
    const nuevoUsuario = {
        user, email, password: hashPassword
    }

    console.log(usuarios),
    usuarios.push(nuevoUsuario);
    res.status(201).send({status: "ok", message: "Usuario ${nuevoUsuario.user} agregado", redirect: "/"})
     
}

export const methods = {
    login,
    register
}