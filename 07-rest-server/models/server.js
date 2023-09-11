const express = require("express");
var cors = require("cors");
const { dbConnection } = require("../db/config.db");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";

    // Database Connection
    this.dbConnect();
    // Middlewares
    // this.middlewares();
    //Routes
    this.routes();
  }

  async dbConnect() {
    await dbConnection();
  }

  middlewares() {
    // * CORS
    this.app.use(cors());
    // * Read body
    this.app.use(express.json());

    // * Public directory
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Running on http://localhost:${this.port}`);
    });
  }
}

module.exports = { Server };
