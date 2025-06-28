const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PedidoPrato = sequelize.define("PedidoPrato", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    timestamps: false 
  });

  return PedidoPrato;
};