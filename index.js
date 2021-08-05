require('dotenv').config();

const { readInput, inquirerMenu, pause } = require('./helpers/inquirer');
const Searchs = require('./models/searchs');

console.clear();

const main = async () => {
  const searchs = new Searchs();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        // Mostrar mensaje
        const place = await readInput('City: ');

        await searchs.city(place);
        // Buscar los lugares

        // Selecionar lugares

        // Clima

        // Mostrar resultados
        console.log('\nInformation city'.green);
        console.log('City:');
        console.log('Lat:');
        console.log('Lng:');
        console.log('Temperature:');
        console.log('Minimum:');
        console.log('Maximum:');
        break;
      case 2:
        break;
    }
    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
