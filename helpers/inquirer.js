const inquirer = require('inquirer');
require('colors');

const questions = [
  {
    type: 'list',
    name: 'option',
    message: '¿What do you want to do?',
    choices: [
      {
        value: 1, // Valor que representa
        name: `${'1.'.green} Search city`, // Datos a mostrar
      },
      {
        value: 2, // Valor que representa
        name: `${'2.'.green} Record`, // Datos a mostrar
      },
      {
        value: 0, // Valor que representa
        name: `${'0.'.green} Exit`, // Datos a mostrar
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log('==================='.green);
  console.log(' Select one option '.green);
  console.log('===================\n'.green);

  const { option } = await inquirer.prompt(questions);
  return option;
};

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Press ${'enter'.green} to continue`,
    },
  ];

  console.log('\n');
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'description',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please enter a value';
        }
        return true;
      },
    },
  ];

  const { description } = await inquirer.prompt(question);
  return description;
};

const listPlaces = async (places = []) => {
  const choices = places.map((place, i) => {
    const idx = `${i + 1}`.green;

    return {
      value: place.id,
      name: `${idx} ${place.name}`,
    };
  });

  choices.unshift({
    value: '0', // Valor que representa
    name: `${'0.'.green} Cancel`, // Datos a mostrar
  });

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Select place',
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);

  return id;
};

const confirm = async (message = '') => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];

  console.log('\n');
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showListingChecklist = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}`.green;

    return {
      value: task.id,
      name: `${idx} ${task.description}`,
      checked: task.completedIn ? true : false,
    };
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selections',
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);

  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listPlaces,
  confirm,
  showListingChecklist,
};
