var express = require("express")
var app = express()
var bodyParser = require('body-parser')
var path = require('path')


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

//API ROUTES
app.use('/api/account', apiAccount)
app.use('/api/user', apiUser)
app.use('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'app/views/login.html'))
})

//start the server
app.listen(port)
console.log('Running at http://localhost:' + port)