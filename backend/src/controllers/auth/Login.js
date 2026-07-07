//Ahora vamos con el login, para eso necesitamos crear un nuevo archivo llamado Login.js en la carpeta controllers/auth
const Usuario=require('../../models/Users');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        //Primero vamos a verificar si el usuario existe, para eso necesitamos usar el método findOne de mongoose
        const user=await Usuario.findOne({email});
        if(!user){
            return res.status(400).json({message:'El usuario no existe'});
        }
        //Si el usuario existe, vamos a verificar si la contraseña es correcta, para eso necesitamos usar el método compare de bcrypt
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:'Contraseña incorrecta'});
        }
        //Si la contraseña es correcta, generamos el token JWT
        const token=jwt.sign(
            {id:user._id, email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        );
        //Aquí se generará un token JWT que contendrá el id y el email del usuario, además de una fecha de expiración de 24 horas
        return res.status(200).json({
            message:'Usuario logueado correctamente',
            token,
            user:{
                _id:user._id,
                nombre:user.nombre,
                email:user.email,
                avatar:user.avatar
            }
        });
    } catch(error) {
  console.error("Error en login:", error);
  return res.status(500).json({
    message: "Error del servidor",
    error: error.message
  });
    }
}

module.exports={loginUser};