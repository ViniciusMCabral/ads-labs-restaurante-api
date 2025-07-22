const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Cliente = sequelize.define("Cliente", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: "clientes",
    timestamps: false
  });

  Cliente.associate = (models) => {
  Cliente.hasMany(models.Pedido, {
    foreignKey: 'clienteId',
    as: 'pedidos'
  });
};
  return Cliente;
};