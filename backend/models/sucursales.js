module.exports = (sequelize, DataTypes) => {
  const Sucursal = sequelize.define('sucursales', {
    id_sucursales: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_sucursal:{
      type: DataTypes.STRING,
    },
    borrado:{
      type: DataTypes.INTEGER,
    },
  },
    {
      freezeTableName: true
    }
  );
  Sucursal.associate = (models) => {
      Sucursal.hasMany(models.stock);
  };
  return Sucursal;
}
