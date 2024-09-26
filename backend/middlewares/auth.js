const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  
  let token;
  if (req.headers.authorization){
    token = req.headers.authorization.split(" ")[1];
    // console.log(token);
  }
  if(!token){
    res.status(401).json({ message: "you are not logged" });
    
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
  const currentUser = await User.findById(decoded.userId );
  if(!currentUser){
    if (!token) return res.status(401).json({ message: "the user deos not belong to this token" });
  }
  try{
    req.user=currentUser;
    next(); 
  }catch(error){
      res.status(401).json({ message: "Token is not valid" });
  }
};
