const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Pedido = sequelize.define("Pedido", {
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
    timestamps: false
  });

  Pedido.associate = (models) => {
    Pedido.belongsTo(models.Cliente, { 
      foreignKey: "clienteId",
      as: 'cliente',
      onDelete: 'CASCADE',
      hooks: true
    });

    Pedido.belongsToMany(models.Prato, {
      through: models.PedidoPrato,
      foreignKey: "pedidoId",  
      as: 'pratos'
    });
  };

  return Pedido;
}; 