module.exports = (sequelize, DataTypes) => {
  const Subproducto = sequelize.define('subproductos', {
    id_subproductos: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_subproducto:{
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
  Subproducto.associate = (models) => {
      Subproducto.hasMany(models.stock);
      Subproducto.belongsTo(models.productos);
  };
  return Subproducto;
}
