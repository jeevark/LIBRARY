const jwt =require('jsonwebtoken')

const ACCESS_TOKEN = 'fbvglafghzdhdirgfasdlfger';

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    //console.log(token);
    if(!token){
      return res.Status(403).send(err);
    }
    jwt.verify(token,ACCESS_TOKEN,(err,user)=>{
      if(err){
        res.Status(403).send("verify Error.........")
      }
      //console.log(user)
      req.user =user; 
      next();
    })
  }

  module.exports = { authenticateToken,ACCESS_TOKEN }
