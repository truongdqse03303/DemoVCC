var express = require('express')
var apiRoutes = express.Router()
var jwt = require('jsonwebtoken')
var User = require('../../models/user')

// route middleware to verify a token
apiRoutes.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'Vcc demo', function (err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    msg: 'Failed to authenticate token.'
                })
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded
                setTimeout(function () {
                    next()
                }, 100)
            }
        })
    } else {
        // if there is no token
        // return an error
        return res.send({
            success: false,
            msg: 'No token provided.'
        })
    }
})

//get all user
apiRoutes.get('/', function (req, res) {
    var currenProfile = req.decoded
    var allUser = user
    return res.json({
        allUser: allUser,
        me: currenProfile
    })
})

//get user by id
apiRoutes.get('/:id', function (req, res) {
    var allUser = user
    for (i = 0; i < user.length; i++) {
        if (user[i].id == req.params.id) {
            return res.json(user[i])
        }
    }
})


//create new user
apiRoutes.post('/', function (req, res) {
    var newUser = {
        id: parseInt(user[user.length - 1].id) + 1,
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    }
    user.push(newUser)
    return res.json(newUser)
})

//update new user
apiRoutes.post('/update/:id', function (req, res) {
    var id = req.params.id
    var updateUser = {
        id: id,
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    }
    user[id] = updateUser
    return res.json(user[id])
})

//update new user
apiRoutes.get('/delete/:id', function (req, res) {
    var id = req.params.id;
    user.splice(id, 1)
    return res.json(true);
})

module.exports = apiRoutes