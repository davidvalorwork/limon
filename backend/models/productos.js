module.exports = (sequelize, DataTypes) => {
    const Productos = sequelize.define('productos', {
      id_productos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre_producto:{
        type: DataTypes.STRING,
      },
      imagenes:{
        type:DataTypes.STRING,
      },
      sku:{
        type:DataTypes.STRING,
      },
      precio:{
        type: DataTypes.INTEGER,
      },
      descripcion_producto:{
        type: DataTypes.STRING,
      },
      length:{
        type: DataTypes.STRING,
      },
      height:{
        type: DataTypes.STRING,
      },
      width:{
        type: DataTypes.STRING,
      },
      weight:{
        type: DataTypes.STRING,
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
      Productos.belongsTo(models.categorias);
      Productos.belongsTo(models.usuarios);
      Productos.hasMany(models.pagos)
    };
    return Productos;
  }
  