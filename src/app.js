const express = require("express");
const app = express();
const connectDB = require("./config/database");
const port = 3001;

const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // creating a new instance of the user model
  const user = new User({
    firstName: "Vikas",
    lastName: "Kumar",
    eamilId: "vikas@007.com",
    password: "vikas@123",
  });

  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error Saving the user :", +err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Data Connection established...");
    app.listen(port, () => {
      console.log(`Server Start ${port} `);
    });
  })
  .catch((err) => {
    console.error("Data cannot be connected...");
  });
