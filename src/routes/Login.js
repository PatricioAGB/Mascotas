const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/register', async (req,res) =>{
    res.render('Login/register');
   
 });

module.exports = router;