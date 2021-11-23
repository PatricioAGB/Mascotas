const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/register', async (req,res) =>{
    res.render('Login/register');
   
 });

 router.get('/register', async (req,res) =>{
    const user = await pool.query("SELECT * FROM usuario");
    res.send(user);
});







module.exports = router;  