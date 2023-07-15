const mogoose = require("mongoose")

const dbConnect = ()=>{
    mogoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(
        () =>{console.log("----- se conecto a la DB -----");},
        err =>{console.log("----- se conecto a la DB -----");
              console.log(err)}
    );
};

module.exports = dbConnect;