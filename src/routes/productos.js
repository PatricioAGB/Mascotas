const express = require('express');
const router = express.Router();
const pool = require('../database');

// get VerProductos
router.get('/verProductos', async (req,res) =>{
    res.render('productos/verProductos');
   
 });
 router.get('/catalogo', async (req,res) =>{
     try{
    const producto = await pool.query("Select * from producto where estado = 1");
    res.render('productos/catalogo', {producto});
    console.log(producto);
} catch (error) {
    console.log(error);
} 
 });
// mostrar los productos en verproductos
 router.get('/listaProductos', async (req,res) =>{
    const productos = await pool.query("SELECT * FROM v_productos WHERE estado = 1 order by idproducto");
    res.send(productos);
});

// get productos 
router.get('/agregarProductos', async (req,res) =>{
  res.render('productos/agregarProductos');
   
 });
// agregar los productos
 router.post('/agregarProductos', async (req,res) => {
    try {
     const {NOMBREPRODUCTO,Categoria,subCategoria,Imagen,precio} = req.body;
     await pool.query('call Agregar_Producto(?,?,?,?,?)',[NOMBREPRODUCTO,Categoria,subCategoria,Imagen,precio]);
     res.redirect('/productos/verProductos');
        
    } catch (e) {
 
        console.log(e);
    }
 });
// editar productos (vistas)
 router.get('/editarProductos/:id', async (req,res) =>{
    try {
        const {id} = req.params;  
        const productos = await pool.query('Select * from v_productos where idProducto = ?',[id]);
        res.render('productos/editarProductos',{pr : productos[0]})
        console.log(productos);
    } catch (e) {
        console.log(e);
    }

});
//editar productos (update)
router.post('/editarProductos/:id', async (req,res) =>{
    try {
        const {Nombre,categoria,subcategoria,precio,valordescuento,iddescuento} = req.body;
        const {id} = req.params;  
        console.log(req.body);
        console.log(id);
        await pool.query('call editar_producto(?,?,?,?,?,?,?)',[id,iddescuento,Nombre,categoria,subcategoria,precio,valordescuento]);
        res.redirect('/productos/verProductos');
        
    } catch (e) {
        console.log(e);
    }
});
// eliminar productos
router.post('/eliminarProducto/:id', async (req,res) =>{
    try {
        const {id} = req.params;
        const productos = await pool.query('call eliminarProducto  (?)',[id]);
        res.json(productos);
        console.log(id);
    } catch (e) {
        console.log(e)
    }
});




module.exports = router;