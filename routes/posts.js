const mongoose=require("mongoose");

const postSchema=mongoose.Schema({
    image:String,
    title:String,
    content:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    createdAt:{
            type:String,
            default:new Date()
    }
});

module.exports=mongoose.model("posts",postSchema);