const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/register', async (req,res) =>{
    const usuario = await pool.query('SELECT * FROM usuario');
    res.render('Login/register',{usuario});
   

});

module.exports = router;