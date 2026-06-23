//Vamos a crear una ruta para registrar un usuario, para eso necesitamos crear una carpeta llamada routes y dentro de ella un archivo llamado Users.route.js
const express=require('express');
const router=express.Router();
const {registerUser}=require('../controllers/auth/Register');
const {loginUser}=require('../controllers/auth/Login');
const {EditUser,DeleteUser,addGameToLibrary,getLibrary,RemoveGameFromLibrary}=require('../controllers/Users.controller');
const {verifyToken}=require('../middlewares/auth.middleware');
const {upload}=require('../middlewares/uploads');


//Rutas públicas
router.post('/registro',registerUser);
router.post('/login',loginUser);

//Rutas protegidas (requieren token)
router.put('/edit/:id',verifyToken,upload.single('avatar'),EditUser);
router.delete('/delete/:id',verifyToken,DeleteUser);
router.post('/:id/library/:gameId',verifyToken,addGameToLibrary);
router.delete('/:id/library/:gameId',verifyToken,RemoveGameFromLibrary);
router.get('/:id/library',verifyToken,getLibrary);

module.exports=router;
