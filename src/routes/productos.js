const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/verProductos', async (req,res) =>{
    res.render('productos/verProductos');
   
 });

module.exports = router;