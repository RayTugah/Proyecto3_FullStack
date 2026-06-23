const Usuario=require('../models/Users');
const Games=require('../models/Games');
const {uploadToCloudinary}=require('../middlewares/uploads');

const DeleteUser=async(req,res)=>{
    try{
        const user=await Usuario.findOne({id:parseInt(req.params.id)});
        if(!user){
            return res.status(404).json({message:'Usuario no encontrado'});
        }
        await Usuario.findOneAndDelete({id:parseInt(req.params.id)});
        return res.status(200).json({message:'Usuario eliminado correctamente'});
    }catch(error){
        return res.status(500).json({message:'Error del servidor'});
    }
}
const EditUser=async(req,res)=>{
    try{
        const user=await Usuario.findOne({id:parseInt(req.params.id)});
        if(!user){
            return res.status(404).json({message:'Usuario no encontrado'});
        }
        if(req.file){
            const avatarUrl=await uploadToCloudinary(req.file.buffer,'avatars');
            req.body.avatar=avatarUrl;
        }
        const updatedUser=await Usuario.findOneAndUpdate({id:parseInt(req.params.id)},req.body,{new:true});
        return res.status(200).json({message:'Usuario actualizado correctamente',updatedUser});
    }catch(error){
        return res.status(500).json({message:'Error del servidor'});

    }
}
//Vamos a crear una función para que el usuario pueda guardar un juego en la biblioteca, para eso necesitamos usar el método findByIdAndUpdate de mongoose
const addGameToLibrary=async(req,res)=>{
    try{
        const {id, gameId}=req.params;

        const game=await Games.findOne({id:parseInt(gameId)});
        if(!game){
            return res.status(404).json({message:'Juego no encontrado'});
        }
        const user=await Usuario.findOne({id:parseInt(id)});
        if(!user){
            return res.status(404).json({message:'Usuario no encontrado'});
        }
        if(user.library.some(g=>g.toString()===game._id.toString())){
            return res.status(400).json({message:'El juego ya está en la biblioteca'});
        }
        await Usuario.findOneAndUpdate({id:parseInt(id)},{$addToSet:{library:game._id}},{new:true});
        return res.status(200).json({message:'Juego agregado a la biblioteca correctamente'});
    }catch(error){
        return res.status(500).json({message:'Error del servidor',error:error.message});
    }
}
const RemoveGameFromLibrary=async(req,res)=>{
    try{
        const {id, gameId}=req.params;
        const game=await Games.findOne({id:parseInt(gameId)});
        if(!game){
            return res.status(404).json({message:'Juego no encontrado'});
        }
        const user=await Usuario.findOne({id:parseInt(id)});
        if(!user){
            return res.status(404).json({message:'Usuario no encontrado'});
        }
        if(!user.library.some(g=>g.toString()===game._id.toString())){
            return res.status(400).json({message:'El juego no está en la biblioteca'});
        }
        await Usuario.findOneAndUpdate({id:parseInt(id)},{$pull:{library:game._id}},{new:true});
        return res.status(200).json({message:'Juego eliminado de la biblioteca correctamente'});
    }catch(error){
        return res.status(500).json({message:'Error del servidor',error:error.message});
    }
}
const getLibrary=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await Usuario.findOne({id:parseInt(id)}).populate('library');
        if(!user){
            return res.status(404).json({message:'Usuario no encontrado'});
        }
        if(user.library.length===0){
            return res.status(404).json({message:'La biblioteca está vacía'});
        }
        return res.status(200).json(user.library);
    }catch(error){
        return res.status(500).json({message:'Error del servidor',error:error.message});
    }
}

module.exports={DeleteUser, EditUser, addGameToLibrary, RemoveGameFromLibrary, getLibrary};