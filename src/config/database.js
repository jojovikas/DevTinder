const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    // "mongodb+srv://vikasfrontenddeveloper007:uibw7wBKqNoyj55d@cluster0.9qr3m.mongodb.net/devTinder"
    "mongodb+srv://vikasfrontenddeveloper007:eRUFhSKlJ6zyEmdQ@cluster0.9qr3m.mongodb.net/devTinder"
  );
};





module.exports = connectDB;
