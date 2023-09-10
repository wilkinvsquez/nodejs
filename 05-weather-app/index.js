require("dotenv").config();
const {
  readInput,
  inquirerMenu,
  pause,
  listPlaces,
} = require("./helpers/inquirer.js");
const { Searches } = require("./models/searches.js");

const main = async () => {
  const searches = new Searches();

  let opt = "";

  //if (tasksDB) {
  //	// cargar tareas
  //	tasks.loadTaskFromArr(tasksDB);
  //}

  do {
    // Imprimir el menú
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        // * Show message
        const term = await readInput("City: ");
        const places = await searches.city(term);
        const id = await listPlaces(places);

        if (id === "0") continue;

        const placeSel = places.find((p) => p.id === id);
        searches.addRecord(placeSel.name);
        const weather = await searches.weatherByPlace(
          placeSel.lat,
          placeSel.lng
        );

        // * Weather
        // * Show Results
        console.clear();
        console.log("\nCity Information\n".green);
        console.log("City name:", placeSel.name);
        console.log("Latitud:", placeSel.lat);
        console.log("Longitud:", placeSel.lng);
        console.log("Description:", weather.desc);
        console.log("Temperature:", weather.temp, "°C");
        console.log("Min Temperature:", weather.minTemp, "°C");
        console.log("MaxTemperature:", weather.maxTemp, "°C");
        break;

      case "2":
        searches.record.forEach((place, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${place}`);
        });
        break;
    }

    await pause();
  } while (opt !== "0");

  // pause();
};
main();
