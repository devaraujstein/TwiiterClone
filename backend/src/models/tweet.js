//Importar o modulo do mongoose
const mongoose = require("mongoose")

//Cria o Schema do Banco
const TweetSchema = new mongoose.Schema({
    author : String,
    content : String,
    likes : {
        type : Number,
        default : 0
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})
//exports vai deixar esse modulo visivel para se algum outro arquivo quiser importar
module.exports = mongoose.model("Tweet",TweetSchema)