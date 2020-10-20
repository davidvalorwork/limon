module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('stock', {
    id_stock: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cantidad:{
      type: DataTypes.STRING,
    },
    borrado:{
      type: DataTypes.INTEGER,
    },
    id_sucursal:{
      type: DataTypes.INTEGER
    }
  },
    {
      freezeTableName: true
    }
  );
  Stock.associate = (models) => {
      Stock.belongsTo(models.subproductos);
      // Stock.belongsTo(models.sucursales);
  };
  return Stock;
}
