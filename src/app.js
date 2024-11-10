const express = require("express");
const app = express();
const connectDB = require("./config/database");
const port = 3001;

const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);

  // creating a new instance of the user model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error Saving the user :", +err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.eamilId;
  // console.log(userEmail);

  try {
    const users = await User.find({ eamilId: userEmail });

    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  // Fetch All users data
  try {
    const users = await dUser.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went Wrong");
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
