// BUILD YOUR SERVER HERE
// IMPORTS AT THE TOP
const express = require('express')

// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json())

module.exports = server; // EXPORT YOUR SERVER instead of {}
