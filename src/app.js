const express = require("express");
const app = express();
const connectDB = require("./config/database");
const port = 3001;

const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // console.log(req.body);

  // creating a new instance of the user model
  const user = new User(req.body);

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
