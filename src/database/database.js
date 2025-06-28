const Sequelize = require("sequelize");
const fs = require('fs');
const path = require('path'); 

const dbConfig = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
};

const sequelize = new Sequelize(dbConfig);

const models = {};
const modelsDir = path.join(__dirname, '../models');

fs.readdirSync(modelsDir)
  .filter(file => file.slice(-3) === '.js') 
  .forEach(file => {
    const modelDefinition = require(path.join(modelsDir, file));
    const model = modelDefinition(sequelize);
    models[model.name] = model;
  });

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

sequelize.sync({ alter: true })
  .then(() => console.log("Banco de dados e tabelas sincronizados com sucesso."))
  .catch(err => console.error("Erro ao sincronizar o banco de dados:", err));

module.exports = { sequelize, ...models };