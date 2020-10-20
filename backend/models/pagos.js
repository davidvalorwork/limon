module.exports = (sequelize, DataTypes) => {
    const Pagos = sequelize.define('pagos', {
      id_pagos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      flow_order:{
        type: DataTypes.STRING,
      },
      token:{
        type: DataTypes.STRING
      },
      estatus_pago:{
        type: DataTypes.STRING
      },
      borrado:{
        type: DataTypes.INTEGER,
      },
    },
      {
        freezeTableName: true
      }
    );
    Pagos.associate = (models) => {
        Pagos.belongsTo(models.carrito);
    };
    return Pagos;
  }
  