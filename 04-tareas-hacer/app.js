require("colors");

const { saveDB, readDB } = require("./helpers/saveFile.js");
const Tasks = require("./models/tasks");
const {
	inquirerMenu,
	pause,
	readInput,
	eraseTasks,
	confirm,
	showList,
} = require("./helpers/inquirer");

const main = async () => {
	let opt = "";
	const tasks = new Tasks();

	const tasksDB = readDB();

	if (tasksDB) {
		// cargar tareas
		tasks.loadTaskFromArr(tasksDB);
	}

	do {
		// Imprimir el menú
		opt = await inquirerMenu();

		switch (opt) {
			case "1":
				// crear opcion
				const desc = await readInput("Description:");
				tasks.createTask(desc);
				break;

			case "2":
				tasks.listCompleted();
				break;

			case "3": // listar completadas
				tasks.listCompleted(true);
				break;

			case "4": // listar pendientes
				tasks.listWaitingCompleted(false);
				break;

			case "5": // completado | pendiente
				const ids = await showList(tasks.listArr);
				tasks.toggleCompleted(ids);
				break;

			case "6": // Borrar
				const id = await eraseTasks(tasks.listArr);
				if (id !== "0") {
					const ok = await confirm("Are you sure?");
					if (ok) {
						tasks.eraseTask(id);
						console.log("Task successfully deleted");
					}
				}
				break;
		}

		saveDB(tasks.listArr);

		await pause();
	} while (opt !== "0");

	// pause();
};

main();
