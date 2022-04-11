// BUILD YOUR SERVER HERE
const express = require('express');
const UserModel = require('./users/model');

const userServer = express();

userServer.use(express.json());

userServer.get('/', (req, res) => {
    res.end('Server Works')
})

module.exports = userServer; // EXPORT YOUR SERVER instead of {}
