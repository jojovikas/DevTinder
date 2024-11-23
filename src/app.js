const express = require("express");
const app = express();
const connectDB = require("./config/database");
const cookieParser = require('cookie-parser');
const authRouters = require("./routes/authRoute");
const profileRouters = require("./routes/profile");
const requestRoutes = require("./routes/request");




const port = 3001;
app.use(express.json());
app.use(cookieParser())

app.use('/', authRouters)
app.use('/', profileRouters)
app.use('/', requestRoutes)




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
