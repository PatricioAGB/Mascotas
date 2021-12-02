const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/register', async (req,res) =>{
    const usuario = await pool.query('SELECT * FROM usuario');
    res.render('../views/sesion/register.hbs',{usuario});

   

});
router.get('/login', async (req,res) =>{
    const usuario = await pool.query('SELECT * FROM usuario');
    res.render('../views/sesion/login.hbs',{usuario});
});
    //Registro de usuario 
router.post('/register', async (req,res) => {
    try {
     const {Usuario,CORREO,password,Password1} = req.body;
     if (password==Password1) {
        await pool.query('call Registro(?,?,?)',[Usuario,password,CORREO]);
     } else {
         
     }
     
    } catch (e) {
 
        console.log(e);
    }
 });

module.exports = router;