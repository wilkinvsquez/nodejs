const { saveDb } = require("../helpers/saveFile");
const task = require("./task");
const Task = require("./task");

class Tasks {
	_list = {
		abc: 123,
	};

	get listArr() {
		const list = [];
		Object.keys(this._list).forEach(key => {
			const task = this._list[key];
			list.push(task);
		});

		return list;
	}

	constructor() {
		this._list = {};
	}

	eraseTask(id = "") {
		if (this._list[id]) {
			delete this._list[id];
		}
	}

	loadTaskFromArr(tasks = []) {
		tasks.forEach(task => {
			this._list[task.id] = task;
		});
	}

	createTask(desc = "") {
		const task = new Task(desc);
		this._list[task.id] = task;
	}

	listCompleted() {
		this.listArr.forEach((task, i) => {
			const idx = `${i + 1}`.green;
			const { desc, completed } = task;
			const state = completed ? "Completed".green : "Pending".red;

			console.log(`${idx} ${desc} :: ${state}`);
		});
	}

	listWaitingCompleted(completed = true) {
		let counter = 0;
		this.listArr.forEach(task => {
			const { desc, completed } = task;
			const state = completed ? "Completed".green : "Pending".red;
			if (completed) {
				// mostrar completadas
				if (completed) {
					counter += 1;
					console.log(
						`${(counter + ".").green} ${desc} :: ${
							completed.green
						}`,
					);
				}
			} else {
				// mostrar pendientes
				if (!completed) {
					counter += 1;
					console.log(`${(counter + ".").green} ${desc} :: ${state}`);
				}
			}
		});
	}

	toggleCompleted(ids = []) {
		ids.forEach(id => {
			const task = this._list[id];
			if (!task.completed) {
				task.completed = new Date().toISOString();
			}
		});

		this.listArr.forEach(task => {
			if (!ids.includes(task.id)) {
				this._list[task.id].completed = null;
			}
		});
	}
}

module.exports = Tasks;
