// BUILD YOUR SERVER HERE
const express = require('express');
const UserModel = require('./users/model');

const userServer = express();

userServer.use(express.json());
// test server get
userServer.get('/', (req, res) => {
    res.end('Server Works');
});
// Get All Users
userServer.get('/api/users', (req, res) => {
    UserModel.find()
        .then(users => {
            res.json(users);
        });
});
//Get Specified User
userServer.get('/api/users/:id', (req, res) => {
    UserModel.findById(req.params.id)
        .then(user => {
            if(!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.json(user)
            }
        })
})
// Creates New User
userServer.post('/api/users', (req, res) => {
    let user = req.body;

    UserModel.insert(user)
        .then(user => {
            if (!user.name || !user.bio){
                res.status(400).json({ message: "Please provide name and bio for the user" });
            } else {
                res.status(201).json(user);
            }
        })
        .catch(err => {
            res.status(500).json({ message: "There was an error while saving the user to the database" })
        })
});
// Delete Users 
userServer.delete('/api/users/:id', (req, res) => {
    UserModel.remove(req.params.id)
    .then(user => {
        if(!user){
         res.status(404).json({ message: "The user with the specified ID does not exist" }); 
        } else {
            res.json(user);
        }
    });
});
// Update Users
userServer.put('/api/users/:id', (req, res) => {
    let id = req.params.id;
    let changes = req.body;

    UserModel.update(id, changes)
        .then(updatedUser => {
            if(!updatedUser){
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.json(updatedUser)
            }
        })
})

module.exports = userServer; // EXPORT YOUR SERVER instead of {}
