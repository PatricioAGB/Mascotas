const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/verServicios', async (req,res) =>{
    res.render('servicios/verServicios');
   
 });

// AGREGAR SERVICIO 
router.get('/agregarServicios', async (req,res) =>{
    res.render('servicios/agregarServicios');
     
   });

router.post('/eliminarServicios/:id', async (req,res) =>{
   try {
        const {id} = req.params;
       const servicios = await pool.query('call eliminarServicios (?)',[id]);
       res.json(servicios);
        console.log(id);
    } catch (e) {
       console.log(e)
    }
});

router.get('/editarServicios/:id', async (req,res) =>{
    try {
        const {id} = req.params;  
        const servicio = await pool.query('Select * from v_servicios where idservicio = ?',[id]);
        res.render('servicios/editarServicios',{pr : servicio[0]})
        console.log(servicio);
    } catch (e) {
        console.log(e);
    }

});


router.post('/editarServicios/:id', async (req,res) =>{
    try {
        const {nombre,tipo_servicio,sub_servicio,imagen,precio} = req.body;
        const {id} = req.params;  
        console.log(req.body);
        console.log(id);
        await pool.query('call actualizar_servicios(?,?,?,?,?,?)',[id,nombre,tipo_servicio,sub_servicio,imagen,precio]);
        //CALL actualizar_servicios (1,"nombre","tipos","subc","imagen",2) 
        res.redirect('/servicios/verServicios');
    } catch (e) {
        console.log(e);
    }
});

 router.get('/listaServicios', async (req,res) =>{
    const servicios = await pool.query("SELECT * FROM v_servicios WHERE estado = 1 order by idservicio");
    res.send(servicios);
});

router.post('/agregarServicios', async (req, res) => {
   try {
        const { nombre, tipo_servicio, sub_categoria, imagen, precio} = req.body;
        await pool.query('call AgregarServicio(?,?,?,?,?)', [nombre, tipo_servicio, sub_categoria, imagen, precio]);
        res.redirect('/servicios/verServicios');

    } catch (e) {

       console.log(e);
    }
    router.get("/Sesion/admin", async (req, res) => {
        res.render("/Sesion/admin");
      });
});
module.exports = router;