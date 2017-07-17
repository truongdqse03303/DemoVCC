var express = require('express')
var apiRoutes = express.Router()
var acc = require('../../models/account')
var jwt = require('jsonwebtoken')




//get all acc
apiRoutes.get('/', function (req, res) {
    var allAccount = accounts
    return res.json(allAccount)
})

//get acc by id
apiRoutes.get('/:id', function (req, res) {
    var allAccount = accounts
    for (i = 0; i < accounts.length; i++) {
        if (accounts[i].id == req.params.id) {
            return res.json(accounts[i])
        }
    }
})

//create new acc
apiRoutes.post('/', function (req, res) {
    var newAcc = {
        id: parseInt(accounts[accounts.length - 1].id) + 1,
        username: req.body.username,
        password: req.body.password
    }
    accounts.push(newAcc)
    return res.json(newAcc)
})

// authen
apiRoutes.post('/authen', function (req, res) {
    var results = 0
    var resAcc
    for (i = 0; i <= accounts.length - 1; i++) {
        if (accounts[i].username == req.body.username && accounts[i].password == req.body.password) {
            results += 1;
            resAcc = accounts[i]
        }
    }
    if (results > 0) {
        getAuthToken(res, resAcc)
    } else return res.json({
        success: false,
        msg: 'Login false'
    })

})




var getAuthToken = function (res, acc) {
    setTimeout(function () {
        var token = jwt.sign(acc, 'Vcc demo', {
            expiresIn: 86400000 // expires in 24 hours https://github.com/zeit/ms#examples
        })
        // return the information including token as JSON
        res.json({
            success: true,
            msg: 'Enjoy your token!',
            token: token
        })
    }, 100)
}

module.exports = apiRoutes