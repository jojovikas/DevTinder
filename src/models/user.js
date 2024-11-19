const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 10,
      trim: true
    },
    lastName: {
      type: String,
      trim: true
    },
    eamilId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate: {
        validator: function (value) {
          // Check if the gender is one of the accepted values
          return ["male", "female", "others"].includes(value.toLowerCase());
        },
        message: (props) => `${props.value} is not a valid gender. Accepted values are male, female, or others.`,
      },
    },
    about: {
      type: String,
      default: "I Am a Default value of about section",
    },
    photoUrl: {
      type: String, 
      default: "https://t4.ftcdn.net/jpg/07/08/47/75/360_F_708477508_DNkzRIsNFgibgCJ6KoTgJjjRZNJD4mb4.jpg"
    },
    skills:{
      type: [String]

    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
