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
        default:"https://images.unsplash.com/vector-1776244476031-db2aa624a2a0?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
    },
        library:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game'
        }]
},{
    timestamps:true
});

const Usuario=mongoose.model("Usuario",usuarioSchema);

module.exports=Usuario;