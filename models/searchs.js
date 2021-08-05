const axios = require('axios');

class Searchs {
  record = ['Tegucigalpa', 'Madrid', 'San José'];

  constructor() {
    // TODO: Leer DB si existe
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: 'es',
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
      console.log(resp.data);

      return [];
    } catch (error) {
      return [];
    }

    return []; //Retornar los lugares
  }
}

module.exports = Searchs;
