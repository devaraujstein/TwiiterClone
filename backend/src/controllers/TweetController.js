const Tweet = require("../models/tweet")

module.exports = {
    async index(req,res){
        const tweets = await Tweet.find({}).sort('-createAt')
        return res.json(tweets)
    },
    async Store(req,res){
        const tweets = await Tweet.create(req.body)
        req.io.emit("tweet",tweets)
        return res.json(tweets)
    }
}