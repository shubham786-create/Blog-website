const multer=require('multer');
const{v4:uuidv4}=require('uuid');
const path=require('path');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'uploads/');
    },
    filename:(req,file,cb)=>{
        const uniquename=uuidv4()+path.extname(file.originalname);
        cb(null,uniquename);
    }
})

const upload=multer({storage:storage});
module.exports=upload;