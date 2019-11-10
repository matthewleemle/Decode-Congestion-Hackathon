var process = require("./processes")
var express = require("express");
var bodyParser = require("body-parser");
const port = 3000;
const app = express()
app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.post("/getroute",process.returnRoute);

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
