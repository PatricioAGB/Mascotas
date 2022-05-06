const bcrypt = require("bcrypt"); //token
const jwt = require("jsonwebtoken"); //token
const express = require("express");
const router = express.Router();
const pool = require("../database");

// Confirmacion inicio de sesion
router.post("/loginregistro", async (req, res) => {
  try {
    const { user, pass } = req.body;
    let confirmacion = await pool.query("call login (?)", [user]);
    if (confirmacion[0][0]) {
      let a = confirmacion[0][0];
      let b = JSON.parse(JSON.stringify(a));
      let id = b["idusuario"]; //id usuario de la base de datos
      let login = b["cuenta"]; //cuenta de la base de datos
      let cargo = b["cargo"]; // cargo (cliente o trabajador)
      let estado = b["estado_cuenta"]; // estado de la cuenta
      let acc = b["nombre"];
      let contrasena = b["pass"]; //contraseña de la base de datos

      if (
        cargo == 1 &&
        estado == 1 &&
        user == login &&
        bcrypt.compareSync(pass, contrasena)
      ) {
        res.render("../views/sesion/admin.hbs", { token: id, us: acc }); //token creado
      } else if (
        user == login &&
        bcrypt.compareSync(pass, contrasena) &&
        estado == 1
      ) {
        res.render("../views/sesion/loginsuccess", { token: id, us: acc }); //token creado
      }
    } else {
      console.log("Contraseña Incorrecta");
    }
  } catch (e) {
    console.log(e);
  }
});
// get register
router.get("/register", async (req, res) => {
  const comuna = await pool.query("SELECT * FROM comuna");
  res.render("sesion/register", { comuna });
});

//Registro de usuario
router.post("/registro", async (req, res) => {
  try {
    const {
      Usuario,
      CORREO,
      password,
      Password1,
      Nombre,
      ApellidoPaterno,
      ApellidoMaterno,
    } = req.body;
    if (password === Password1) {
      let salt = bcrypt.genSaltSync(10);
      let hashedpass = bcrypt.hashSync(password, salt);

      await pool.query("CALL registro(?,?,?,?,?,?,?)", [
        ,
        Usuario,
        hashedpass,
        CORREO,
        Nombre,
        ApellidoPaterno,
        ApellidoMaterno,
      ]);
      res.render("sesion/loginregistro");
    } else {
      console.log("contraseñas no coinciden");
    }
  } catch (e) {
    console.log(e);
  }
});

// login success

router.get("/Sesion/loginsuccess", async (req, res) => {
  try {
    const productos = await pool.query(
      "Select * from producto where estado = 1"
    );
    res.render("../views/sesion/loginsuccess", { producto });
  } catch (error) {
    console.log(error);
  }
});

// Get de login
router.get("/login", async (req, res) => {
  res.render("../views/sesion/login.hbs");
});
//get inicio catalogo
router.get("/inicioCatalogo", async (req, res) => {
  try {
    const producto = await pool.query(
      "Select * from producto where estado = 1"
    );
    res.render("Sesion/inicioCatalogo", { producto });
    console.log(producto);
  } catch (error) {
    console.log(error);
  }
});
//get inicio servicios
router.get("/inicioServicio", async (req, res) => {
  try {
    const servicio = await pool.query(
      "Select * from servicio where estado = 1"
    );
    res.render("Sesion/inicioServicio", { servicio });
    console.log(servicio);
  } catch (error) {
    console.log(error);
  }
});
// Get de loginregistro
router.get("/loginregistro", async (req, res) => {
  res.render("../views/sesion/loginregistro.hbs");
});

// Token (inicio de sesion)
router.post("/admin", async (req, res) => {
  const { us, token } = req.body;
  localStorage.setItem("token", token);
  console.log(us, token);
  localStorage.removeItem("token");
});

//get index
router.get("/index", async (req, res) => {
  const usuario = await pool.query("SELECT * FROM usuario");
  res.render("../views/index", { usuario });
});

router.get("Sesion/productos/verProductos", async (req, res) => {
  res.render("/Sesion/productos/verProductos");
});
router.get("/Sesion/admin", async (req, res) => {
  res.render("/Sesion/admin");
});
module.exports = router;
