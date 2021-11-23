const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/register', async (req,res) =>{
    const usuario = await pool.query('SELECT * FROM usuario');
    console.log(usuario);
    res.render('../views/sesion/register.hbs',{usuario});

   

});

module.exports = router;