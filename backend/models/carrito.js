module.exports = (sequelize, DataTypes) => {
  const Carrito = sequelize.define('carrito', {
    id_carrito: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    estado_carrito:{
      type:DataTypes.STRING,
    },
    borrado:{
      type: DataTypes.INTEGER,
    },
  },
    {
      freezeTableName: true
    }
  );
  Carrito.associate = (models) => {
    Carrito.belongsTo(models.usuarios);
    Carrito.hasMany(models.pedidos)
  };
  return Carrito;
}
