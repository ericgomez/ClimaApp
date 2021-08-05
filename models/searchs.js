const axios = require('axios');

class Searchs {
  record = ['Tegucigalpa', 'Madrid', 'San José'];

  constructor() {
    // TODO: Leer DB si existe
  }

  async city(place = '') {
    try {
      // Peticion HTTP
      const resp = await axios.get(
        'https://api.mapbox.com/geocoding/v5/mapbox.places/octawa.json?access_token=pk.eyJ1IjoiZXJpY2dvbWV6IiwiYSI6ImNrcnpmOXBheDBjZmEydXJ3NXBodGc0NG8ifQ.C8IEybsgZRlTzKirmcjPlA&limit=5&language=es'
      );
      console.log(resp.data);
      return [];
    } catch (error) {
      return [];
    }

    return []; //Retornar los lugares
  }
}

module.exports = Searchs;
