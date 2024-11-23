const express = require('express')
const requestRoutes = express.Router();

const {userAuth} = require('../middleware/auth')


//api  for sending a connection requeset 

requestRoutes.post("/sendingConnectionRequest", userAuth, (req, res)=>{
    try{
      //sending a conection request 
    const user = req.user;
   
    res.send(user.firstName+ ' can send the connection request')
    }catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  
  })

  module.exports = requestRoutes;