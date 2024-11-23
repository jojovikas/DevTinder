const express = require('express')
const profileRouters = express.Router();

const {userAuth} = require('../middleware/auth')


profileRouters.get("/profile", userAuth, async (req, res)=>{

    try{
      const user = req.user;
      res.send(user)
    
    }catch(err){
      res.status(400).send("Error" + err.message)
    }
  
  })


  module.exports = profileRouters;
  