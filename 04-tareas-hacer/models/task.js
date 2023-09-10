const { v4: uuidv4 } = require("uuid");
class task {
	id = "";
	desc = "";
	completed = null;
	constructor(desc) {
		this.id = uuidv4();
		this.desc = desc;
		this.completed = null;
	}
}

module.exports = task;
