module.exports = {
    verificar: async(db) => {
        const tipos_usuarios = await db.tipos_usuarios.findAll();
        tipos_usuarios.length===0?inicializar(db):null;
    }
}

const inicializar = async(db) => {
    const tipo_persona = {
        tipo_usuario:'Cliente',
        borrado:0
    }
    const tipo_empresa = {
        tipo_usuario:'Emprendedor',
        borrado:0
    }
    const tipo_admin = {
        tipo_usuario: 'Administrador',
        borrado:0
    }
    const tipo_postulacion = {
        tipo_usuario: 'Postulacion',
        borrado:0
    }
    const usuario_admin1={
        clave: '$2a$10$gF82S0Logoxlm3jSRvqjRuMa.M2tj32o0nrpqS1DOitmGRYmTsXjC',
        correo: 'contacto@tiendalimon.cl',
        tiposUsuarioIdTiposUsuarios:3,
        borrado:0
    }
    const usuario_admin2={
        clave: '$2a$10$gF82S0Logoxlm3jSRvqjRuMa.M2tj32o0nrpqS1DOitmGRYmTsXjC',
        correo: 'stock@tiendalimon.cl',
        tiposUsuarioIdTiposUsuarios:3,
        borrado:0
    }
    //LIMON2019
    const usuario_prueba={
        clave: '$2a$10$a4JzBQ1c/VLBSLgdVJ3X9uo7/oUSFBvnycRiv4GQS1DppK1EGn7KK',
        correo: 'prueba@gmail.com',
        tiposUsuarioIdTiposUsuarios:1,
        borrado:0
    }
    const usuario_emprendedor={
        clave: '$2a$10$a4JzBQ1c/VLBSLgdVJ3X9uo7/oUSFBvnycRiv4GQS1DppK1EGn7KK',
        correo: 'tiendalimoncl0@gmail.com',
        permiso_arriendo:"1",
        permiso_servicio:"1",
        permiso_productos:"1",
        tiposUsuarioIdTiposUsuarios:2,
        borrado:0
    }
    await db.tipos_usuarios.create(tipo_persona).then(result=>console.log("Tipo de usuario: Usuario. Insertado"))
        .catch(err=>console.log(err));
    await db.tipos_usuarios.create(tipo_empresa).then(result=>console.log("Tipo de usuario: Empresa. Insertado"))
        .catch(err=>console.log(err));
    await db.tipos_usuarios.create(tipo_admin).then(result=>console.log("Tipo de usuario: Administrador. Insertado"))
        .catch(err=>console.log(err));
    await db.tipos_usuarios.create(tipo_postulacion).then(result=>console.log("Tipo de usuario: Administrador. Insertado"))
        .catch(err=>console.log(err));
    await db.usuarios.create(usuario_admin1).then(result=>console.log("Usuario admin 12345678 insertado."))
        .catch(err=>console.log(err));
    await db.usuarios.create(usuario_admin2).then(result=>console.log("Usuario admin 12345678 insertado."))
        .catch(err=>console.log(err));
    await db.usuarios.create(usuario_prueba).then(result=>console.log("Usuario prueba 12345678 insertado."))
        .catch(err=>console.log(err));
    await db.usuarios.create(usuario_emprendedor).then(result=>{
        console.log("Usuario emprendedor creado")
    })



    const categorias=[
        {nombre_categoria:"GOURMET/SUPERMERCADO Y MÁS",borrado:0},
        {nombre_categoria:"COMPUTACIÓN",borrado:0},
        {nombre_categoria:"DECORACIÓN/HOGAR",borrado:0},
        {nombre_categoria:"FERRETERÍA/AUTOMOTRIZ",borrado:0},
        {nombre_categoria:"NIÑOS",borrado:0},
        {nombre_categoria:"JUVENIL",borrado:0},
        {nombre_categoria:"DEPORTE",borrado:0},
        {nombre_categoria:"MODA FAMILIA",borrado:0},
        {nombre_categoria:"BEBÉS",borrado:0},
        {nombre_categoria:"BELLEZA",borrado:0},
        {nombre_categoria:"MASCOTAS",borrado:0},
        {nombre_categoria:"SUSTENTABILIDAD/ECOLOGÍA",borrado:0},
        {nombre_categoria:"CUIDADO DE TU SALUD/COVID19",borrado:0},
        {nombre_categoria:"DÍA DEL PADRE/HOMBRES/REGALOS",borrado:0},
        {nombre_categoria:"DÍA DEL NIÑO/REGALOS",borrado:0},
        {nombre_categoria:"NAVIDAD/BAZAR SSCC MANQUEHUINO",borrado:0},
        {nombre_categoria:"SERVICIOS",borrado:0},
        {nombre_categoria:"ASESORÍAS",borrado:0},
        {nombre_categoria:"SERVICIO TÉCNICO",borrado:0},
        {nombre_categoria:"CURSOS ONLINE",borrado:0},
        {nombre_categoria:"CONVENIO COLEGIO",borrado:0},
        {type:"servicios", nombre_categoria:"CONSULTORÍAS",borrado:0},
        {type:"servicios", nombre_categoria:"ASESORÍA LEGAL",borrado:0},
        {type:"servicios", nombre_categoria:"EXPERIENCIAS",borrado:0},
        {type:"servicios", nombre_categoria:"SERVICIOS DE DISEÑO",borrado:0},
    ]

    for(let i in categorias){
        await db.categorias.create(categorias[i]);
    }
    

    const sucursales = [
        {direccion:"Santo Domingo N° 566, Santiago, Chile",nombre_sucursal:"Casa Emprendedor",borrado:0},
        {direccion:"Santo Domingo N° 566, Santiago, Chile",nombre_sucursal:"Grupo Vag",borrado:0},
        {direccion:"Santo Domingo N° 566, Santiago, Chile",nombre_sucursal:"Bueno Bueno",borrado:0},
    ]

    for(let i in sucursales){
        await db.sucursales.create(sucursales[i])
    }
}