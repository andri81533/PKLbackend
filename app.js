var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(bodyParser.json())

var routes = require("./routes")
routes(app)

module.exports = app
