const fs = require('fs');

const axios = require('axios');

class Searchs {
  record = [];
  dbPath = './db/database.json';

  constructor() {
    // TODO: Leer DB si existe
    this.readDB();
  }

  get recordCapitalized() {
    return this.record.map((place) => {
      let words = place.split(' ');
      words = words.map((p) => p[0].toUpperCase() + p.substring(1));

      return words.join(' ');
    });
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'es',
    };
  }

  get paramsWeather() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es',
    };
  }

  async city(place = '') {
    try {
      // Peticion HTTP

      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapbox,
      });

      const resp = await instance.get();

      return resp.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async weatherPlace(lat, lon) {
    try {
      // instance axios
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsWeather, lat, lon },
      });

      // extraer inforacion de la data
      const resp = await instance.get();
      const { weather, main } = resp.data;

      return {
        description: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  addRecord(place = '') {
    // TODO: prevenir duplicados
    if (this.record.includes(place.toLocaleLowerCase())) {
      return;
    }

    // Manetener solo 6 registros
    this.record = this.record.splice(0, 5);

    this.record.unshift(place.toLocaleLowerCase());

    // Grabar en DB
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

    const info = fs.readFileSync(this.dbPath, { encoding: 'utf8' });
    const data = JSON.parse(info);

    this.record = data.record;
  }
}

module.exports = Searchs;
