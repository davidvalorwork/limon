module.exports = (sequelize, DataTypes) => {
  const Productos = sequelize.define('servicios', {
    id_servicios: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_servicio:{
      type: DataTypes.STRING,
    },
    imagenes:{
      type:DataTypes.STRING,
    },
    precio:{
      type: DataTypes.INTEGER,
    },
    sku:{
      type: DataTypes.INTEGER,
    },
    descripcion_servicio:{
      type: DataTypes.STRING,
    },
    direccion:{
      type:DataTypes.STRING,
    },
    estado:{
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
  Productos.associate = (models) => {
    Productos.belongsTo(models.usuarios);
    Productos.belongsTo(models.categorias);
    Productos.hasMany(models.pagos)
  };
  return Productos;
}
