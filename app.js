var express = require('express')
var bodyParser = require('body-parser')

var dotenv =  require('dotenv')
var cors = require('cors')
dotenv.config()

var app = express()
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// app.listen(3000, () => {
//   console.log('CORS-enabled web server listening on port 3000');
// });

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
