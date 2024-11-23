
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
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went Wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findOneAndDelete({ _id: userId });
    // const user = await User.findOneAndDelete(userId);
    res.send("User Delete Done");
  } catch (err) {
    console.log("User Not found");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

console.log(userId);


  try {

    const ALLOWED_UPDATES = ["userId", "photoUrl", "gender", "skills", "about"]
  
    const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k))
  
    if(!isUpdateAllowed) {
      throw new Error("Update Not Allowed")
    }
    
    if(data?.skills.length > 10){
      throw new Error("Put only 10 skill here")
    }

    // const user = await User.findByIdAndUpdate({ _id: userId }, data);
    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    res.send("user Update");
  } catch (err) {
    res.status(400).send("Update Faild" + err.message);
  }
});

/*
app.patch("/user", async (req, res) => {
  const userEmail = req.body.eamilId;
  const data = req.body;
  console.log(userEmail);
  // console.log(data);

  try {
    const user = await User.findByIdAndUpdate(
      { eamilId: userEmail }, // Find user by eamilId
      data,
      { new: true } // Option to return the updated document
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send("User updated successfully");
  } catch (err) {
    res.status(404).send("Something Went wrong");
  }

  // const user = User.findByIdAndUpdate(userEmail, data);
});
*/