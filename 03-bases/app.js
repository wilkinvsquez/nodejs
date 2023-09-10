const { error, log } = require("console");
const fs = require("fs");
let res = "";

console.log("==============================");
console.log("         Tabla del 5");
console.log("==============================");

for (let i = 0; i <= 10; i++) {
	const element = 5;
	res += `${element} x ${i} = ${element * i}\n`;
}

console.log(res);
console.log("==============================");
console.log("     Fin de la tabla del 5");
console.log("==============================");

fs.writeFile("tabla-5.txt", res, err => {
	if (err) throw err;
	console.log("Creado");
});
