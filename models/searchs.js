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

      return resp.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));

      return [];
    } catch (error) {
      return [];
    }

    return []; //Retornar los lugares
  }
}

module.exports = Searchs;
