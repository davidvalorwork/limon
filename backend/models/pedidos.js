module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define('pedidos', {
    id_pedidos: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cantidad:{
      type: DataTypes.INTEGER,
    },
    borrado:{
      type: DataTypes.INTEGER,
    },
  },
    {
      freezeTableName: true
    }
  );
  Pedido.associate = (models) => {
    Pedido.belongsTo(models.stock);
    Pedido.belongsTo(models.servicios);
    Pedido.belongsTo(models.carrito);
  };
  return Pedido;
}
