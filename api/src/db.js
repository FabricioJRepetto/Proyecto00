require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
//postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}
const sequelize = new Sequelize(`postgres://lanecaiemufkvr:327c95248dac7fc8a1cbb02eeec04a9a302a846c8493e792ae709ecdb4b07781@ec2-52-200-215-149.compute-1.amazonaws.com:5432/dcf7amg0qb7mp3`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

//? Para cargar modelos y relaciones sin errores de asincronía. rari
const basename = path.basename(__filename);
const modelDefiners = [];
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(file => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach(file => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog, Temperament } = sequelize.models;

//? Relaciones
Dog.belongsToMany(Temperament, {
  through: "dogtemp",
});
Temperament.belongsToMany(Dog, {
  through: "dogtemp",
});

module.exports = {
  ...sequelize.models, //? importar modelos: const { Product, User } = require('./db.js');
  conn: sequelize, //? importart conexión: { conn } = require('./db.js');
};
