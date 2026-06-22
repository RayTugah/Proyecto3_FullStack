const mongoose=require('mongoose');
const fs=require('fs');
const path=require('path');
const dotenv=require('dotenv');
const Reviews=require('../models/Reviews');
const Game=require('../models/Games');
const Usuario=require('../models/Users');
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

const seedReviews=async()=>{
    try{
        await mongoose.connect(process.env.Mongo_URI);
        await Reviews.deleteMany({});
        const csvData=fs.readFileSync(path.join(__dirname,'../data/CSV/Reviews.csv'),'utf-8');
        const lines=csvData.trim().split('\n');
        const headers=lines[0].split(',').map(h=>h.replace(/"/g,'').trim());
        const games=await Game.find({});
        const users=await Usuario.find({});
        const reviews=lines.slice(1).map(line=>{
            const values=parseCSVLine(line);
            const gameDoc=games.find(g=>g.title===values[3]?.trim());
            const userDoc=users.find(u=>u.id===parseInt(values[2]?.trim()));
            if(!gameDoc||!userDoc) return null;
            return{
                id:parseInt(values[0]?.trim()),
                game:gameDoc._id,
                user:userDoc._id,
                rating:parseInt(values[5]?.trim()) || 1,
                comment:values[7]?.trim()
            };
        }).filter(r=>r!==null);
        await Reviews.insertMany(reviews);
        console.log('Reseñas insertadas correctamente ✅');
        process.exit();
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

seedReviews();


