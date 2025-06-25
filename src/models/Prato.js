const database = require("../database/database");
const { DataTypes } = require("sequelize");

const Prato = database.define("Prato", {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    nome: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    preco: { 
        type: DataTypes.FLOAT, 
        allowNull: false 
    }
}, {
  tableName: "pratos",
});

module.exports = Prato;
