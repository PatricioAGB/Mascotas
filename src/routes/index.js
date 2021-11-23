const express = require('express');
const router = express.Router();
const pool = require('../database');



router.get('/', async (req,res) =>{

    try {
    const usuario = await pool.query("Select * from usuario");
    res.render('index', {usuario});
    } catch (error) {
        console.log(error);
    }
    
 });




module.exports = router;    