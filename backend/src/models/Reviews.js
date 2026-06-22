const mongoose=require('mongoose');
const {Schema}=mongoose;

const reviewSchema=new Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    game:{
         type:Schema.Types.ObjectId,    
        ref:'Game',
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:10
    },
    comment:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
const Review=mongoose.model('Review',reviewSchema);
module.exports=Review;