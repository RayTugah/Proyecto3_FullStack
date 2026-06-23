const Usuario=require('../../models/Users');
const bcrypt=require('bcrypt');

const registerUser=async(req,res)=>{
    const {nombre,email,password}=req.body;
    try{
        //Primero vamos a verificar si el usuario ya existe, para eso necesitamos usar el método findOne de mongoose
        const userExists=await Usuario.findOne({email});
        if(userExists){
            return res.status(400).json({message:'El usuario ya existe'});
        }
        //Si el usuario no existe, vamos a crear un nuevo usuario, para eso necesitamos usar el método create de mongoose
        const lastUser=await Usuario.findOne().sort({id:-1});
        const nextId=lastUser ? lastUser.id+1 : 1;
        const user=await Usuario.create({
            id:nextId,
            nombre,
            email,
            password: await bcrypt.hash(password, 10)
            //Esto nos permite encriptar la contraseña antes de guardarla en la base de datos
        });
        //Si el usuario se crea correctamente, vamos a devolver un mensaje de éxito
        if(user){
            return res.status(201).json({message:'Usuario creado correctamente'});
        }else{
            return res.status(400).json({message:'Error al crear el usuario'});
        }
    }catch(error){
        return res.status(500).json({message:'Error del servidor'});
    }
}

module.exports={registerUser};