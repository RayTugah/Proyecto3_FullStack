const mongoose=require('mongoose');
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dns.setDefaultResultOrder("ipv4first");
const fs=require('fs');
const path=require('path');
const dotenv=require('dotenv');
const Games=require('../models/Games');
dotenv.config({path:path.join(__dirname,'../../.env')});

const parseCSVLine=(line)=>{
    const result=[];
    let current='';
    let inQuotes=false;
    for(let i=0;i<line.length;i++){
        if(line[i]==='"'){inQuotes=!inQuotes;}
        else if(line[i]===','&&!inQuotes){result.push(current.trim());current='';}
        else{current+=line[i];}
    }
    result.push(current.trim());
    return result;
};

const seedGames=async()=>{
    try{
        await mongoose.connect(process.env.Mongo_URI);
        await Games.deleteMany({});//Limpiamos la colección antes de insertar,esto nos permite actualizar la colección
        const csvData=fs.readFileSync(path.join(__dirname,'../data/CSV/Games.csv'),'utf-8');
        const lines=csvData.trim().split('\n');
        const headers=lines[0].split(',').map(h=>h.replace(/"/g,'').trim());
        const games=lines.slice(1).map(line=>{
            const values=parseCSVLine(line);
            return {
                id:parseInt(values[0]?.trim()),//El id lo convertimos a entero
                title:values[1]?.trim(),
                genre:values[2]?.trim(),
                description:values[3]?.trim(),
                price:parseFloat(values[4]?.trim()) || 0,
                image:values[5]?.trim(),
                releaseDate:new Date(values[6]?.trim()),
                developer:values[7]?.trim(),
                publisher:values[8]?.trim(),
                rating:parseFloat(values[9]?.trim()) || 0,
                platform:values[10]?.trim(),
                minspecs:{
                    os:values[11]?.trim() || undefined,
                    cpu:values[12]?.trim() || undefined,
                    ram:parseFloat(values[13]?.trim()) || undefined,
                    gpu:values[14]?.trim() || undefined,
                    storage:parseFloat(values[15]?.trim()) || undefined
                },
                recSpecs:{
                    os:values[16]?.trim() || undefined,
                    cpu:values[17]?.trim() || undefined,
                    ram:parseFloat(values[18]?.trim()) || undefined,
                    gpu:values[19]?.trim() || undefined,
                    storage:parseFloat(values[20]?.trim()) || undefined
                }
            };
        });
        await Games.insertMany(games);
        console.log('Juegos insertados correctamente ✅');
        process.exit();
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

seedGames();
