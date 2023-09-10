const axios = require("axios");
const fs = require("fs");

class Searches {
  record = [];
  dbPath = "./db/database.json";
  constructor() {
    // TODO: Leer DB si existe
    this.readDB();
  }

  // get recordCapitalized() {
  // 	return this.record.m)
  // }
  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "en",
    };
  }

  get paramsOpenWeater() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
    };
  }

  async city(place = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });

      const res = await instance.get();
      return res.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      throw error;
    }
  }

  async weatherByPlace(lat = "", lon = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeater, lat, lon },
      });
      const res = await instance.get();
      const { weather, main } = res.data;
      return {
        desc: weather[0].description,
        temp: main.temp,
        minTemp: main.temp_min,
        maxTemp: main.temp_max,
      };
    } catch (error) {}
  }

  addRecord(place = "") {
    if (this.record.includes(place.toLocaleLowerCase())) {
      return;
    }
    this.record = this.record.splice(0, 5);
    this.record.unshift(place.toLocaleLowerCase());
    // TODO: saveDB
    this.saveDB();
  }

  saveDB() {
    const payload = {
      record: this.record,
    };
    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    if (!fs.existsSync(this.dbPath)) return;
    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
    const data = JSON.parse(info);
    this.record = data.record;
  }
}

module.exports = {
  Searches,
};
