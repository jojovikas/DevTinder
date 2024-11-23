const express = require("express");

const authRouters = express.Router();

const {validateSignUpData} = require("../utils/validation")
const User = require("../models/user");
const bcrypt = require('bcrypt')





authRouters.post("/signup", async (req, res) => {
    console.log(req.body);
    // creating a new instance of the user model
   
  
    try {
  
      //validation of data
      validateSignUpData(req)
      const {firstName, lastName,emailId, password} = req.body;
  
  
      
      const passwordHash = await bcrypt.hash(password, 10)
      console.log( passwordHash);
      // here 10 is the number of saltRounds
      //creating a new instance of user Model
      // const user = new User(req.body);   === This is the wrong way to instance of user model below in correct way 
      const user = new User(
        {firstName, lastName, emailId, password: passwordHash}
      ); 
  
  
      
      await user.save();
      res.send("User Added Successfully");
    } catch (err) {  
      
      // console.error("Email Already Register ")
      res.status(400).send("Email Already Exists");
      
    }
  });

  authRouters.post("/login", async (req, res)=>{
    // res.send("Working Properly")
    
    try{
      const {emailId, password} =  req.body;
      // Debug the login request data
      console.log("Debug: Login Request Data:", req.body);
  
  
      const user = await User.findOne({ emailId: emailId })
  
      // Find the user
      // const user = await User.findOne({ emailId });
      console.log("Debug: User Found:", user);
  
      if(!user){
        throw new Error("Email ID NOT IN OUR DB")
      }
      
      // compare our password withh our db collection
      const isPasswordValid = await user.validatePassword(password);
      console.log("Debug: Is Password Valid:", isPasswordValid);
  
  
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
  
  
      // if(isPasswordValid){
      //   // All Code Regarding Cookies
  
      //   //create a JWT Token
      //   const token = await user.getJwt();
      //   // console.log(token);
        
  
  
      //   //Add the token to cookes and send the response back to user
      //   res.cookie("token", token, { httpOnly: true });
  
  
      //    res.send("Login Successfully")
      // }
      // else{
      //   throw new Error("Data is no va")
      // }
  
      // Generate the JWT token
      const token = await user.getJwt(); // Ensure this is awaited
      console.log("Debug: JWT Token in Login Route:", token);
  
      // Set the token as a cookie
      res.cookie("token", token, { httpOnly: true });
      res.send("Login Successful");
  
      
  
    }catch (err) {
      console.error("Debug: Error in Login:", err.message);
      res.status(400).send("ERROR: " + err.message);
    }
  
  
  } )
  

  module.exports = authRouters;
