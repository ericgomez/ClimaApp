const axios = require('axios');

class Searchs {
  record = ['Tegucigalpa', 'Madrid', 'San José'];

  constructor() {
    // TODO: Leer DB si existe
  }

  async city(place = '') {
    try {
      // Peticion HTTP
      const resp = await axios.get('https://reqres.in/api/users?page=2');
      console.log(resp.data);
      return [];
    } catch (error) {
      return [];
    }

    return []; //Retornar los lugares
  }
}

module.exports = Searchs;
