const bcrypt = require("bcrypt");  //token
const jwt = require("jsonwebtoken"); //token
const express = require("express");
const router = express.Router();
const pool = require("../database");

//get register
router.get("/register", async (req, res) => {
  const usuario = await pool.query("SELECT * FROM usuario");
  res.render("../views/sesion/register.hbs", { usuario });

  //Registro de usuario
  router.post("/register", async (req, res) => {
    try {
      const { Usuario, CORREO, password, Password1 } = req.body;
      if (password == Password1) {
        await pool.query("call Registro(?,?,?)", [Usuario, password, CORREO]);
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  });
  // Get de login
});
router.get("/login", async (req, res) => {
  res.render("../views/sesion/login.hbs");
});
// Confirmacion inicio de sesion
router.post("/login", async (req, res) => {
  try {
    const { user, pass } = req.body;
    let confirmacion = await pool.query("call login (?,?)", [user, pass]);
    let a = confirmacion[0][0];
    let b = JSON.parse(JSON.stringify(a));
    let id = b['idUsurio']; //id usuario de la base de datos
    let acc = b["cuenta"]; //cuenta de la base de datos
    let contrasena = b["pass"]; //contraseña de la base de datos
    if (user == acc && pass == contrasena) { 
     res.render('../views/index.hbs',{token:id}); //token creado
    } else {
      console.log("contraseña incorrecta");
    }
  } catch (e) {
    console.log(e);
  }
});
//get index
router.get("/index", async (req, res) => {
  const usuario = await pool.query("SELECT * FROM usuario");
  res.render("../views/index", { usuario });
});
module.exports = router;
