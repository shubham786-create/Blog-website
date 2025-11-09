const mongoose=require('mongoose');
const plm=require('passport-local-mongoose');

 mongoose.connect('mongodb://127.0.0.1:27017/MyDatabase');

 const userSchema=mongoose.Schema({
  fullname:String,
  username:String,
  email:String,
  password:String,
  posts:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts"
    }
  ],
  createdAt:{
    type:String,
    default:new Date()
  }
 });

 userSchema.plugin(plm);

 module.exports=mongoose.model("users",userSchema);


