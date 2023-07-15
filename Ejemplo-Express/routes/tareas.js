const express = require("express");
const router = express.Router();
const {find, create, findOne, Update, deleteById} = require("../controllers/tareas")
const {validarCrearTarea, ValidarObtenerTarea, validarActualizarTarea} = require("../validators/tareas")

router.get("/",find)
router.get("/:id",ValidarObtenerTarea ,findOne)
router.put("/:id",validarActualizarTarea,ValidarObtenerTarea,Update)
router.post("/",validarCrearTarea,create)
router.delete("/:id",ValidarObtenerTarea ,deleteById)

module.exports = router;