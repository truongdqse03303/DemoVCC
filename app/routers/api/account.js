var express = require('express')
var apiRoutes = express.Router()
var acc = require('../../models/account')

apiRoutes.get('/', function(req,res) {
    var allAccount = accounts
    return res.json(allAccount)    
})

apiRoutes.get('/:id', function(req,res) {
    var allAccount = accounts
    for (i=0; i< accounts.length; i++){
        if(accounts[i].id == req.params.id){
            return res.json(accounts[i])
        }
    } 
})

apiRoutes.post('/', function(req, res){
    var newAcc = {
        id: parseInt(accounts[accounts.length-1].id) + 1,
        username: req.body.username,
        password: req.body.password
    }
    accounts.push(newAcc)
    return res.json(newAcc)
})

module.exports = apiRoutes