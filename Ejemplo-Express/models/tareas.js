const mogoose = require("mongoose");

const tareaScheme = new mogoose.Schema(
    {
        nombre:{
            type:String
        },
        descripcion :{
            type:String
        },
        estado:{
            type: ["no iniciada","en proceso","finalizada"],
            default:"no iniciada"
        },
        prioridad:{
            type:["baja","media","alta"],
            default:"baja"
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
);
module.exports = mogoose.model("tareas",tareaScheme)