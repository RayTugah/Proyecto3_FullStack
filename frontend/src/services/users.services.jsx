//Vamos a traer los servicios de usuarios, para eso necesitamos crear una carpeta llamada services y dentro de ella un archivo llamado users.services.jsx
//En este archivo vamos a crear las funciones que se comunicarán con el backend, para eso necesitamos usar axios
import axios from 'axios';

//Vamos a crear una función para registrar un usuario, para eso necesitamos usar el método post de axios
const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;

export const registerUser=async(userData)=>axios.post(`${BASE_URL}/registro`,userData);

export const loginUser=async(userData)=>axios.post(`${BASE_URL}/login`,userData);

export const editUser=async(id,userData,token)=>axios.put(`${BASE_URL}/edit/${id}`,userData,{
    headers:{Authorization:`Bearer ${token}`}
});
export const deleteUser=async(id,token)=>axios.delete(`${BASE_URL}/delete/${id}`,{
    headers:{Authorization:`Bearer ${token}`}
});
export const addGameToLibrary=async(id,gameId,token)=>axios.post(`${BASE_URL}/${id}/library/${gameId}`,{},{
    headers:{Authorization:`Bearer ${token}`}
});
export const removeGameFromLibrary=async(id,gameId,token)=>axios.delete(`${BASE_URL}/${id}/library/${gameId}`,{
    headers:{Authorization:`Bearer ${token}`}
});
export const getLibrary=async(id,token)=>axios.get(`${BASE_URL}/${id}/library`,{
    headers:{Authorization:`Bearer ${token}`}
});
