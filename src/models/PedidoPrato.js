const database = require("../database/database");
const { DataTypes } = require("sequelize");
const Pedido = require("./Pedido");
const Prato = require("./Prato");

const PedidoPrato = database.define("PedidoPrato", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    pedidoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pedido,
            key: "id",
        },
    },
    pratoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Prato,
            key: "id",
        },
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: "pedido_pratos",
});

Pedido.belongsToMany(Prato, { through: PedidoPrato, foreignKey: "pedidoId" });
Prato.belongsToMany(Pedido, { through: PedidoPrato, foreignKey: "pratoId" });

module.exports = PedidoPrato;
