const validator = require('validator')


const validateSignUpData = (req) =>{
    const {firstName, lastName, emailId, password} = req.body;
    console.log("this is log section");
    if(!firstName || !lastName) {
        // if first name and last name is not present throw the error 
        throw new Error("Please enter Your Name")
    }
    else if(!validator.isEmail(emailId)) {
        throw new Error("Enter Valid Email ID")  
       }
       else if(!validator.isStrongPassword(password)){
        throw new Error("Enter a Strong Password")
       }
    
}



module.exports = {
    validateSignUpData
}