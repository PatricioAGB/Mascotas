const express = require("express");
const router = express.Router();
const pool = require("../database");
// get del edit
router.get("/editarPerfil", async (req, res) => {
  res.render("../views/editar/editarPerfil");
});
//mostrar lo que viene de la base de datos
router.get("/editarPerfil/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await pool.query(
      "select * from v_usuario where idusuario = (?)",
      [id]
    );
    res.render("editar/editarPerfil", { ed: usuario[0] });
  } catch (e) {
    console.log(e);
  }
});
//cambiar los valores de la base de datos
router.post("/editarPerfil/:id", async (req, res) => {
  try {
    const { correo, nombre, apellido_Paterno, Apellido_Materno } = req.body;
    const { id } = req.params;
    const cargo = await pool.query(
      "select cargo from usuario where idusuario = (?)",
      [id]
    );
    let a = cargo[0];
    let b = JSON.parse(JSON.stringify(a));
    let cargo1 = b.cargo;
    await pool.query("call editar_usuario(?,?,?,?,?)", [
      id,
      correo,
      nombre,
      apellido_Paterno,
      Apellido_Materno,
    ]);
    if (cargo1 == 1) {
      res.redirect("/productos/verProductos");
    } else {
      res.redirect("/Sesion/inicioCatalogo");
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
