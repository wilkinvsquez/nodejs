const inquirer = require("inquirer");
require("colors");

const questions = [
	{
		type: "list",
		name: "opcion",
		message: "What would you like to do?",
		choices: [
			{
				value: "1",
				name: `${"1.".green} Crear task`,
			},
			{
				value: "2",
				name: `${"2.".green} List tasks`,
			},
			{
				value: "3",
				name: `${"3.".green} List completed tasks`,
			},
			{
				value: "4",
				name: `${"4.".green} List pending tasks`,
			},
			{
				value: "5",
				name: `${"5.".green} Complete task(s)`,
			},
			{
				value: "6",
				name: `${"6.".green} Erase task`,
			},
			{
				value: "0",
				name: `${"0.".green} Exit`,
			},
		],
	},
];

const inquirerMenu = async () => {
	console.clear();
	console.log("==========================".green);
	console.log("  Select an option".white);
	console.log("==========================\n".green);

	const { opcion } = await inquirer.prompt(questions);

	return opcion;
};

const pause = async () => {
	const question = [
		{
			type: "input",
			name: "enter",
			message: `Press ${"enter".green} to continue`,
		},
	];

	console.log("\n");
	await inquirer.prompt(question);
};

const readInput = async message => {
	const question = [
		{
			type: "input",
			name: "desc",
			message,
			validate(value) {
				if (value.length === 0) {
					return "Please write something";
				}
				return true;
			},
		},
	];

	const { desc } = await inquirer.prompt(question);
	return desc;
};

const eraseTasks = async (taskList = []) => {
	const choices = taskList.map((task, i) => {
		const idx = `${i + 1}.`.green;

		return {
			value: task.id,
			name: `${idx} ${task.desc}`,
		};
	});

	choices.unshift({
		value: "0",
		name: "0.".green + " Cancel",
	});

	const questions = [
		{
			type: "list",
			name: "id",
			message: "erase",
			choices,
		},
	];

	const { id } = await inquirer.prompt(questions);
	return id;
};

const confirm = async message => {
	const question = [
		{
			type: "confirm",
			name: "ok",
			message,
		},
	];

	const { ok } = await inquirer.prompt(question);
	return ok;
};

const showList = async (taskList = []) => {
	const choices = taskList.map((task, i) => {
		const idx = `${i + 1}.`.green;

		return {
			value: task.id,
			name: `${idx} ${task.desc}`,
			checked: task.completadoEn ? true : false,
		};
	});

	const question = [
		{
			type: "checkbox",
			name: "ids",
			message: "choices",
			choices,
		},
	];

	const { ids } = await inquirer.prompt(question);
	return ids;
};

module.exports = {
	inquirerMenu,
	pause,
	readInput,
	eraseTasks,
	confirm,
	showList,
};
