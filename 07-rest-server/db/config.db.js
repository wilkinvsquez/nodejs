const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("Successful Connection");
  } catch (error) {
    console.log(error);
    throw new Error("Connection failed!!");
  }
};

module.exports = {
  dbConnection,
};
