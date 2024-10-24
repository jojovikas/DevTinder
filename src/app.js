/*
1. Create a repository
2. initialize the repository 
3. node_modeuls, pakage.json, package-lock.json
4. install express
5. create a server

*/

const express = require("express");

const app = express();

// app.use("/user", (req, res) => {
//   res.send("Master");
// });

app.get("/user", (req, res) => {
  res.send({ firstName: "Vikas", lastName: "Kumar" });
});

app.post("/user", (req, res) => {
  res.send("Data POST Succesfully");
});

app.delete("/user", (req, res) => {
  res.send("Data Delete Succesfully");
});

app.listen(8888, () => {
  console.log("Server Start 8888");
});
