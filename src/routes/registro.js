const bcrypt = require("bcrypt");  //token
const jwt = require("jsonwebtoken"); //token
const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get('/register', async (req,res) =>{
    const comuna = await pool.query('SELECT * FROM comuna');
    res.render('sesion/register',{comuna});
   

});

//Registro de usuario
router.post("/loginregistro", async (req, res) => {
    try {
      const {Usuario, CORREO, password, Password1,Nombre,ApellidoPaterno,ApellidoMaterno} = req.body;
      console.log(Usuario, CORREO, password, Password1,Nombre,ApellidoPaterno,ApellidoMaterno);
      if (password == Password1) {
        
       await pool.query("CALL registro(?,?,?,?,?,?,?)", [,Usuario,password,CORREO,Nombre,ApellidoPaterno,ApellidoMaterno]);
      
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  });

  module.exports = router;