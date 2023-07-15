const {matchedData} = require("express-validator")
const {tareasModel} = require("../models");
const {handleHttpError} = require("../utils/handleErros")

/**
 * crear
 * @param {*} req
 * @param {*} res
 */
const create = async(req,res)=>{
    try {
        const body = matchedData(req)
        console.log(body)
        const data = await tareasModel.create(body);
        res.send({data})
    } catch (error) {
        handleHttpError(res,"ERROR_AL_CREAR")
    }  
}

/**
 * @param {*} req
 * @param {*} res
 */
const find = async(req,res)=>{
    try {
        const data = await tareasModel.find({});
        res.send(data)
    } catch (error) {
        handleHttpError(res,"ERROR_AL_buscar")
    }  
}

/**
 * @param {*} req
 * @param {*} res
 */
const findOne = async(req,res)=>{
    try {
        req = matchedData(req);
        const {id}=req;
        const data = await tareasModel.findById(id);
        res.send(data)
    } catch (error) {
        handleHttpError(res,"ERROR_AL_BUSCAR_INDIVIDUAL")
    }  
}

/**
 * Actualizar
 * @param {*} req
 * @param {*} res
 */
const Update = async(req,res)=>{
    try {
        const {id, ...body}=matchedData(req);
        const data = await tareasModel.findByIdAndUpdate(id,body);
        res.send({data})
    } catch (error) {
        handleHttpError(res,"ERROR_AL_ACTUALIZAR")
    }  
}

/**
 * Eliminar
 * @param {*} req
 * @param {*} res
 */
const deleteById = async(req,res)=>{
    try {
        const {id}=matchedData(req);
        const data = await tareasModel.deleteOne({_id:id});
        res.send({data})
    } catch (error) {
        handleHttpError(res,"ERROR_AL_ELIMINAR")
    }  
}

module.exports = {find, create, findOne, Update, deleteById}