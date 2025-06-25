const database = require("../database/database");
const { DataTypes } = require("sequelize");
const Cliente = require('./Cliente');

const Pedido = database.define("Pedido", {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    data: { 
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: DataTypes.NOW 
    },
}, {
  tableName: "pedidos",
});

Cliente.hasMany(Pedido, { 
    foreignKey: "clienteId" 
});
Pedido.belongsTo(Cliente, { 
    foreignKey: "clienteId" 
});

module.exports = Pedido;
