const express = require('express');
const user = require('../models/User');
const router= express.Router();
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const fetchuser= require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

const JWT_SECRET='Harryisagoodboy'
//Router 1 for creating an user create a user using : post "/api/auth/CreateUser". Doesn't require auth
router.post('/Createuser',[
    body('email','Enter a correct mail').isEmail(),
    body('name','Enter a correct name').isAlpha(),
    body('password','enter a strong password') //isstrongpassword()
],
  async (req,res)=>{
    let success=1
    let tag=0
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=0
      tag=1
      return res.status(400).json({success,tag, errors: errors.array() });
    }
    try{
    //check whether email exists already
   let User=await user.findOne({email:req.body.email});
   if(User){
       success=0
       return res.status(400).json({success,tag,errors:{msg:"Sorry user already exists"}})
   }
   const salt=await bcrypt.genSalt(10);
   const secpass=await bcrypt.hash(req.body.password,salt)
   //create a new user
   User=await user.create({
        name: req.body.name,
        password: secpass, 
        email: req.body.email
    })
    const data={
        user:{
            id: User.id
        }
    }
    
    /*.then(user => res.json(user))
    .catch(err=> console.log(err))
    res.json({error:'Email alreay exists'})*/
    const authtoken=jwt.sign(data,JWT_SECRET);
    res.json({success,"token":authtoken})
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

//Router 2 for log in /Authenticate a auser using "/api/auth/login". No login required
router.post('/Login',[
    body('email','Enter a correct mail').isEmail(),
    body('password','password cannot be blank').exists()
],

async (req,res)=>{
  let success=false 
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    const {email,password}= req.body;
    try{
      let User = await user.findOne({email})
      if(!User){
        success=false
        return res.status(400).json({success,error:"no user exists" });
      }
      const passwordcompare= bcrypt.compare(password,User.password)
      if(!passwordcompare){
        success=false
        return res.status(400).json({success,error:"wrong password" });
      }
      const data={
        user :{
          id: User.id 
        }
      }
      const authtoken=jwt.sign(data,JWT_SECRET);
      success=true;
      res.json({success,"token" : authtoken})
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Some error occured")
  }
})
//Route 3 userinfo



router.post('/userinfo',fetchuser,
async (req,res)=>{
 

  try{
    userid=req.user.id;
    const User=await user.findById(userid).select("-password")
    res.send(User)
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured +1")
  }
})

module.exports= router