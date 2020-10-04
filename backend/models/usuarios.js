module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define('usuarios', {
    // USUARIO
    id_usuarios: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
    },
    apellido: {
      type: DataTypes.STRING,
    },
    rut: {
      type: DataTypes.STRING,
    },
    correo: {
      type: DataTypes.STRING,
    },
    clave:{
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    // EMPRENDEDOR
    marca:{
      type: DataTypes.STRING,
    },
    razon_social:{
      type: DataTypes.STRING,
    },
    giro:{
      type: DataTypes.STRING,
    },
    factura:{
      type: DataTypes.STRING,
    },
    direccion:{
      type: DataTypes.STRING,
    },
    nombre_contacto:{
      type: DataTypes.STRING,
    },
    telefono_contacto:{
      type: DataTypes.STRING,
    },
    link_video:{
      type: DataTypes.STRING,
    },
    instagram: {
      type: DataTypes.STRING,
    },
    url_logo: {
      type: DataTypes.STRING,
    },
    descripcion_negocio:{
      type: DataTypes.STRING,
    },
    permiso_arriendo: {
      type:DataTypes.STRING,
    },
    permiso_productos: {
      type:DataTypes.STRING,
    },
    permiso_servicio: {
      type:DataTypes.STRING,
    },
    recupera_contra:{
      type: DataTypes.STRING,
    },
    random_digit:{
      type: DataTypes.STRING
    },
    borrado:{
      type: DataTypes.INTEGER,
    },

    // Datos a completar
    banco:{
      type:DataTypes.STRING,
    },
    tipo_cuenta:{
      type:DataTypes.STRING,
    },
    numero_cuenta:{
      type:DataTypes.STRING,
    },
    titular_cuenta:{
      type:DataTypes.STRING,
    },
    rut_cuenta:{
      type:DataTypes.STRING,
    },
    correo_banco:{
      type:DataTypes.STRING,
    },

    img_productos:{
      type:DataTypes.STRING,
    },
  },
    {
      freezeTableName: true
    }
  );
  Usuarios.associate = (models) => {
    Usuarios.belongsTo(models.tipos_usuarios);
    Usuarios.hasMany(models.pagos)
    Usuarios.hasMany(models.productos)
  };
  return Usuarios;
}
