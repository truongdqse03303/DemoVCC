var express = require("express")
var app = express()
var bodyParser = require('body-parser')
var path = require('path')
var cookieParser = require('cookie-parser')
var fs = require('fs');

var rand = 0;

setInterval(function () {
  var rand = Math.floor(Math.random() * (1000 - 150) + 150);

  setTimeout(function () {
    var content = (new Date()).toISOString() + " GET " + "200 " + rand + "ms \n";
    console.log(content);

    fs.appendFile("/Users/VCCORP/Documents/Demo/log/test.log", content, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });

  }, rand);
}, 150);


// var date = new Date();

// setInterval(function(){   
//     var content = date.toISOString() + " GET " + "200 " +  Math.floor((Math.random()*100)+1) + "\n"

//     fs.appendFile("/Users/VCCORP/Documents/Demo/log/test.log", content, function(err) {
//         if(err) {
//             return console.log(err);
//         }
//         console.log("The file was saved!");
//     });

//  }, 1000);

//Configuration 
var port = process.env.port || 8080

// routes
var apiAccount = require('./app/routers/api/account')
var apiUser = require('./app/routers/api/user')

//Set static folder
app.use(express.static("./app/public"))
app.use(express.static("./app/views"))

// get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(cookieParser())

//API ROUTES
app.use('/api/account', apiAccount)
app.use('/api/user', apiUser)
app.use('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'app/views/login.html'))
})

//start the server
app.listen(port)
console.log('Running at http://localhost:' + port)