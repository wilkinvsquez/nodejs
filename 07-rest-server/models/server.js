const express = require("express");
var cors = require("cors");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		// Middlewares
		//this.middlewares();
		//Routes
		this.routes();
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.static("public"));
	}

	routes() {
		this.app.use("/api/users", require("../routes/user"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Running on http://localhost:${this.port}`);
		});
	}
}

module.exports = { Server };
