var express = require('express');
var router = express.Router();
const userModel=require('./users');
const postModel=require('./posts');
const passport=require('passport');
const localStrategy=require('passport-local');
const upload=require('./multer');

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Home | My Blog' });
});

router.post('/registerUser',(req,res)=>{
  const newUser = new userModel({
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email
  });
  
  userModel.register(newUser, req.body.password)
    .then(function(registeredUser){
      passport.authenticate('local')(req, res, function(){
        req.flash("success", "Registration Successful!");
        res.redirect('/home');
      })
    })
    .catch(function(error){
     console.log(error);
      res.redirect('/login');
    })
});

router.post('/loginUser',passport.authenticate('local',{
   successRedirect:'/home',
   failureRedirect :'/register',
   filureFlash:false
}),(req,res)=>{
   
})

router.get('/logout',(req,res,next)=>{
  req.logOut(function(err){
    if(err) return next(err)
      res.redirect('/login');
  })
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
     return next()
  }
  res.redirect('/')
}


router.get('/about',isLoggedIn,(req,res)=>{
  res.render('about')
});

router.get('/login',(req,res)=>{
  res.render('login')
})

router.get('/register',(req,res)=>{
  res.render('register')
})

router.get('/contact',isLoggedIn,(req,res)=>{
  res.render('contact')
})

router.get('/profile',isLoggedIn,async(req,res)=>{
  const user=await userModel.findOne({_id:req.user._id})
  .populate("posts")
 
  res.render('profile',{user:user})
});

router.get('/home',isLoggedIn,(req,res)=>{
  res.render('home',{title:"Home | My Blog"})

})

router.post('/upload',upload.single('multerImage'),async(req,res)=>{
  try{
 const newPost=await postModel.create({
  image:req.file.filename,
  title:req.body.title,
  content:req.body.content,
  author:req.user._id
 });
 const user=await userModel.findOne({_id:req.user._id})
 console.log(user)
 user.posts.push(newPost._id);
 await user.save()
 res.redirect('/profile');
}catch(err){
  console.log(err);
  res.send(err);

}

 
})
module.exports = router;
