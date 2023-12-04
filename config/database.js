const mongoose = require("mongoose")

const connectDb = async () => {
    const dbUrl = "mongodb+srv://JSUniversal:universal3@jsuniversal.nvil2uq.mongodb.net/jsuniversal?retryWrites=true&w=majority"

    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    mongoose.connect(dbUrl, connectionParams).then(()=>{
        console.info("Conectado a MongoDB");
    })
    .catch((e) => {
        console.log("Error de conexión a MongoDB:", e);
    });
}

module.exports = { connectDb };