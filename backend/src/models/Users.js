//Vamos a crear el modelo de usuario,para eso necesitamos instalar mongoose,una vez que tengamos mongoose, necesitamos crear una instancia de mongoose
const mongoose=require('mongoose');

const usuarioSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"https://res.cloudinary.com/dxjv0gq3f/image/upload/v1690911685/ByteStore/avatar-default_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1_1.png"
    },
    city:{
        type:String,
        default:""

    },
    country:{
        type:String,
        default:""
    },
    bio:{
        type:String,
        default:""
    }
},{
    timestamps:true
});

const Usuario=mongoose.model("Usuario",usuarioSchema);

module.exports=Usuario;