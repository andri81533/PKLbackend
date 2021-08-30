var express = require('express')
var bodyParser = require('body-parser')

var dotenv =  require('dotenv')
var cors = require('cors')
dotenv.config()

var app = express()


app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors())
app.use(bodyParser.json());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,OPTIONS,POST,PUT,DELETE"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("content-type", "applciation/json");
//   next();
// });

// app.use(express.static(path.join(__dirname, 'public')));

var routes = require("./routes");
routes(app);

module.exports = app;
