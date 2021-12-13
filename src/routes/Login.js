const bcrypt = require("bcrypt");  //token
const jwt = require("jsonwebtoken"); //token
const express = require("express");
const router = express.Router();
const pool = require("../database");

// Confirmacion inicio de sesion
router.post("/loginregistro", async (req, res) => {
  try {
    const { user, pass } = req.body;
    let confirmacion = await pool.query("call login (?,?)", [user, pass]);
    let a = confirmacion[0][0];
    let b = JSON.parse(JSON.stringify(a));
    let id = b['idusuario']; //id usuario de la base de datos
    let login = b["cuenta"]; //cuenta de la base de datos
    let acc = b["nombre"];
    let contrasena = b["pass"]; //contraseña de la base de datos
    if (user == login && pass == contrasena) { 
     res.render('../views/sesion/loginsuccess.hbs',{token:id,us:acc}); //token creado
    } else {
      console.log("contraseña incorrecta");
    }
  } catch (e) {
    console.log(e);
  }
});
// get register
router.get('/register', async (req,res) =>{
  const comuna = await pool.query('SELECT * FROM comuna');
  res.render('sesion/register',{comuna});
 

});

//Registro de usuario
router.post("/registro", async (req, res) => {
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


// login success

router.get("/login/success", async (req, res) => {
  res.render("../views/sesion/loginsuccess.hbs");
});
  // Get de login
router.get("/login", async (req, res) => {
  res.render("../views/sesion/login.hbs");
});

// Get de loginregistro
router.get("/loginregistro", async (req, res) => {
  res.render("../views/sesion/loginregistro.hbs");
}); 


//get index
router.get("/index", async (req, res) => {
  const usuario = await pool.query("SELECT * FROM usuario");
  res.render("../views/index", { usuario });
});
module.exports = router;
