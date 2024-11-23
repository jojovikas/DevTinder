const User = require("../models/user")
const jwt = require("jsonwebtoken")


const userAuth = async (req, res, next) =>{
    try{
        // get the token
        const {token} = req.cookies;
       
        // Throw the Error if token is not present
        if(!token){
            throw new Error(" Token is not Valid")
            console.error("Token")
            
        }
        
        //varify the token
        const decodedObj = await jwt.verify(token, "DEV@Tinder$790")
        
        // extract id form the token
        const {_id} = decodedObj;
        
        //find the user using id
        const user = await User.findById(_id)
        if(!user){
            throw new Error("User Not Found")
        }
        // All Work done now next function run
        req.user = user;
        next()
      }catch(err){
       res.status(400).send("ERROR" + err.message)
      }
}

module.exports = {userAuth}