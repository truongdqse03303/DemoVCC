var express = require('express')
var apiRoutes = express.Router()
var User = require('../../models/user')

//get all user
apiRoutes.get('/', function(req,res) {
    var allUser = user
    return res.json(allUser)    
})

//get user by id
apiRoutes.get('/:id', function(req,res) {
    var allUser = user
    for (i=0; i< user.length; i++){
        if(user[i].id == req.params.id){
            return res.json(user[i])
        }
    }
})

//create new user
apiRoutes.post('/', function(req, res){
    var newUser = {
        id: parseInt(user[user.length-1].id) + 1,
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    }
    user.push(newUser)
    return res.json(newUser)
})

//update new user
apiRoutes.post('/update/:id', function(req, res){
    var updateUser = req.body
    var id = req.params.id
    user[id] = updateUser
    return res.json(user[id])
})

//update new user
apiRoutes.get('/delete/:id', function(req, res){
    var id = req.params.id;
    user.splice(id, 1) 
    return res.json(true);
})

module.exports = apiRoutes