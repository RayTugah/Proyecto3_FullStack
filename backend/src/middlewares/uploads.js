//Aquí vamos a añadir la portada de la biblioteca de juegos del usuario y también fotos de perfil del usuario
const multer=require('multer');
const cloudinary=require('cloudinary').v2;

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

// Multer guarda el archivo en memoria como buffer
const storage=multer.memoryStorage();
const upload=multer({
    storage,
    limits:{fileSize:5*1024*1024},// 5MB máximo
    fileFilter:(req,file,cb)=>{
        if(file.mimetype.startsWith('image/')){
            cb(null,true);
        }else{
            cb(new Error('Solo se permiten imágenes'),false);
        }
    }
});

// Sube el buffer de multer a Cloudinary y devuelve la URL
const uploadToCloudinary=(buffer,folder)=>{
    return new Promise((resolve,reject)=>{
        const stream=cloudinary.uploader.upload_stream(
            {folder},
            (error,result)=>{
                if(error) reject(error);
                else resolve(result.secure_url);
            }
        );
        stream.end(buffer);
    });
};

module.exports={upload,uploadToCloudinary};