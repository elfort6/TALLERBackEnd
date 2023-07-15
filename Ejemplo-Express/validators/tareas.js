const {check} =  require("express-validator");
const validationResults = require("../utils/handlerValidators")

const validarCrearTarea=[
    check("nombre")
    .exists()
    .notEmpty(),
    check("descripcion")
    .exists()
    .notEmpty(),
    check("prioridad"),
    (req,res,next)=>{
        return validationResults(req,res,next)
    }
] 

const ValidarObtenerTarea =[
    check("id")
    .exists()
    .notEmpty(),
    (req,res,next)=>{
        return validationResults(req,res,next)
    }
]

const validarActualizarTarea=[
    check("prioridad"),
    check("estado"),
    (req,res,next)=>{
        return validationResults(req,res,next)
    }
]
module.exports = {validarCrearTarea, ValidarObtenerTarea, validarActualizarTarea}