// BUILD YOUR SERVER HERE
// IMPORTS AT THE TOP
const express = require('express')
const User = require('./users/model')

// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json())

//EndPoints

// [POST] /api/users (C of CRUD, create new user from JSON payload)

server.post('/api/users', async (req, res) => {
    try {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: 'name and bio are required'
            })
        } else {
            const newUser = await User.create(req.body)
            res.status(201).json(newUser)
        }
    }catch (err) {
        res.status(500).json({
            message: 'posting new user',
            error: err.message
        })
    }
})

// [Get] /api/users (R of CRUD, Fetch all )
server.get("/api/users", async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    }catch (err) {
        res.status(500).json({
            message: 'error getting all users',
            error: err.message
        })
    }
})
module.exports = server; 
