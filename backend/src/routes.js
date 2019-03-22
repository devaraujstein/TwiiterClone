const express = require("express")

const routes = express.Router()

const TweetController = require('./controllers/TweetController')
routes.get('/tweets', TweetController.index)
routes.post('/tweets', TweetController.Store)

const likeController = require("./controllers/likeController")
routes.post('/likes/:id',likeController.store)

module.exports = routes