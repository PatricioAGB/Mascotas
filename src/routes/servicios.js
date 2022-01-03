const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/verServicios', async (req,res) =>{
    res.render('servicios/verServicios');
   
 });

module.exports = router;