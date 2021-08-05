const { readInput, inquirerMenu, pause } = require('./helpers/inquirer');

console.clear();

const main = async () => {
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        break;
      case '2':
        break;
    }
    if (opt !== 0) await pause();
  } while (opt !== 0);
};

main();
