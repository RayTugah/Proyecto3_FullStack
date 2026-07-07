//Primeramente para incializar este proyecto necesitamos instalar dependencias para el servidor express,
//Lo primero en el backend es crear el servidor
const express = require('express');
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dns.setDefaultResultOrder("ipv4first");
//Una vez que tengamos express, necesitamos crear una instancia de express
const app=express();
const connectDB=require('./src/db/db');
//Ahora necesitamos configurar el puerto en el que se ejecutará nuestro servidor, para eso necesitamos importar dotenv
require('dotenv').config();
const usersRoutes=require('./src/routes/Users.route');
const gamesRoutes=require('./src/routes/Games.route');
const reviewsRoutes=require('./src/routes/Reviews.route');
//Vamos a intentar que el frontend se comunique con el servidor, para eso necesitamos instalar cors
const cors=require('cors');
app.use(cors());
//Ahora necesitamos configurar el puerto en el que se ejecutará nuestro servidor, para eso necesitamos importar dotenv
const PORT=process.env.PORT || 3000;

app.use(express.json());
app.use('/api/users', usersRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/reviews', reviewsRoutes);

//Conectamos a la base de datos
connectDB();

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el localhost:${PORT}🚀`);
})

app.get('/',(req,res)=>{
    res.send('Hola mundo desde el backend');
})

//Verificamos que la ruta funciona correctamente, para eso necesitamos instalar nodemon, para que se reinicie el servidor cada vez que hagamos un cambio en el código

