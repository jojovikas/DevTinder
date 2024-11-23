const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 10,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    emailId: {
      type: String,
      // unique: true,
      // Unique index. If you specify `unique: true`
      // specifying `index: true` is optional if you do `unique: true`
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not Valid");
        }
      },
    },
    password: {
      type: String,
      unique: true,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password");
        }
      },
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
        message: (props) =>
          `${props.value} is not a valid gender. Accepted values are male, female, or others.`,
      },
    },
    about: {
      type: String,
      default: "I Am a Default value of about section",
    },
    photoUrl: {
      type: String,
      default:
        "https://t4.ftcdn.net/jpg/07/08/47/75/360_F_708477508_DNkzRIsNFgibgCJ6KoTgJjjRZNJD4mb4.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Enter a Valid URL");
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJwt = async function () {
  user = this;
  // Debug the user ID
  console.log("Debug: User ID in getJwt:", user._id);


  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "1h",
  });

   // Debug the generated token
   console.log("Debug: Generated JWT Token:", token);
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  user = this;
  passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
