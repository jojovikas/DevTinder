/*
1. Create a repository
2. initialize the repository 
3. node_modeuls, pakage.json, package-lock.json
4. install express
5. create a server

*/

const express = require("express");

const app = express();

app.use("/contact", (req, res) => {
  res.send("this is our contact us page");
});

app.use("/service", (req, res) => {
  res.send("This is our  Service page");
});

app.use("/about", (req, res) => {
  res.send("this is about us page");
});

app.listen(8888, () => {
  console.log("Server Start 8888");
});
