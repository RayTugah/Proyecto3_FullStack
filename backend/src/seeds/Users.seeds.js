const mongoose=require('mongoose');
const fs=require('fs');//Fs es nos permite trabajar cojn diferentes archivos, en este caso lo vamos a usar para leer el archivo CSV que contiene los datos de los usuarios
const path=require('path');//Nos permite guardar la ruta del archivo CSV de manera correcta, independientemente del sistema operativo que estemos usando
const bcrypt=require('bcrypt');//Nos permite encriptar las contraseñas,una vez que hemos hecho el seeds
const dotenv=require('dotenv');//Permite cargar variables de entorno del archivo .env, en este caso lo vamos a usar para cargar la URI de la base de datos y la clave secreta para el JWT.
const Usuario=require('../models/Users');
dotenv.config({path:path.join(__dirname,'../../.env')});//Nos permite cargar la variavle de entrono que está respectiva carpeta raiz

const seedUsers=async()=>{
    try{
        await mongoose.connect(process.env.Mongo_URI);//Primero nos conectamos con la BDA
        await Usuario.deleteMany({});//Limpiamos la colección antes de insertar
        const csvData=fs.readFileSync(path.join(__dirname,'../data/CSV/Users.csv'),'utf-8');//Luego transformamos el xlsx en csv
        const lines=csvData.trim().split('\n');//Separamos el csv mediante un split y vamos saltando lineas
        const headers=lines[0].split(',').map(h=>h.replace(/"/g,'').trim());//Obtenemos los headers del csv, para eso necesitamos hacer un split por comas y luego eliminar las comillas y los espacios en blanco
        const users=lines.slice(1).map(line=>{
            const values=line.split(',');//Loegos separamos las lienas con comas
            return {
                id:parseInt(values[0]?.trim()),//El id lo convertimos a entero
                nombre:values[1]?.trim(),
                email:values[2]?.trim(),
                avatar:values[3]?.trim(),
                city:values[4]?.trim(),
                country:values[5]?.trim(),
                bio:values[6]?.trim(),
                password:values[8]?.trim()
            };
        });
        for(const user of users){
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(user.password,salt);
            user.password=hashedPassword;
        }
        await Usuario.insertMany(users);
        console.log('Usuarios insertados correctamente ✅');
        process.exit();
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

seedUsers();


