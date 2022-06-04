var jwt= require('jsonwebtoken');
const JWT_SECRET="Harryisagoodboy"
const fetchuser=(req,res,next)=>{
 //Get the user from the jwt token and add id to request object
 const token= req.header('auth-token');
 if(!token)
 {
     res.status(400).send("bad request")
 }
 

try{
const data=jwt.verify(token,JWT_SECRET)
req.user=data.user;
next();
}
catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured")
}

}
module.exports=fetchuser;
