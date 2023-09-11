const { Schema, model } = require("mongoose");
const userSchema = Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Password is required"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    require: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  status: {
    type: Boolean,
    require: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("User", userSchema);
