var express = require('express');
var bodyParser = require('body-parser');
let mongoose = require('mongoose');

const users = require('./routes/users');
var app = express();


app.use(express.static("assets"));
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});


// mongoose.connect("mongodb://localhost:27017/Article_App");
mongoose.connect('mongodb://localhost:27017/Article_App');
var conn =mongoose.Collection;

let db = mongoose.connection;
db.on("error", error => console.log(error));
db.on("open", () => console.log("Connection Established"));


app.use('/', users);



const port = process.env.port || 3000
app.listen(port, function () {
  console.log(`Server started at port : http://localhost:${port}`)
});

module.exports = app;