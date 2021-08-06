require('dotenv').config();

const { readInput, inquirerMenu, pause, listPlaces } = require('./helpers/inquirer');
const Searchs = require('./models/searchs');

console.clear();

const main = async () => {
  const searchs = new Searchs();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // Mostrar mensaje
        const inputPlace = await readInput('City: ');

        // Buscar los lugares
        const places = await searchs.city(inputPlace);

        // Selecionar lugares
        const id = await listPlaces(places);
        const placeSelected = places.find((l) => l.id === id);

        // Clima
        const weather = await searchs.weatherPlace(placeSelected.lat, placeSelected.lng);

        // Mostrar resultados
        console.clear();
        console.log('\nInformation city'.green);
        console.log('City:', placeSelected.name.green);
        console.log('Lat:', placeSelected.lat);
        console.log('Lng:', placeSelected.lng);
        console.log('Temperature:', weather.temp);
        console.log('Minimum:', weather.min);
        console.log('Maximum:', weather.max);
        console.log('¿Weather status?', weather.description.green);
        break;
      case 2:
        break;
    }
    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
