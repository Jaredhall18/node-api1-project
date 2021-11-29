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
                message: 'Please provide name and bio for the user'
            })
        } else {
            const newUser = await User.insert(req.body)
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
            message: 'The users information could not be retrieved',
            error: err.message
        })
    }
})

// [Get] /api/users/:id (R of CRUD, Fetch user by :id)
server.get("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) {
            res.status(404).json({
                message: `The user with the specified ID does not exist`
            })
        } else {
            res.json(user)
        }
    }catch (err) {
        res.status(500).json({
            message: 'The user information could not be retrieved',
            error: err.message
        })
    }
})

// [DELETE] /api/users/:id (D of CRUD, remove user with :id)
server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params
    User.remove(id)
        .then(deletedUser => {
            if (!deletedUser) {
                res.status(404).json({
                    message: `The user with the specified ID does not exist`
                })
            } else {
            res.json(deletedUser)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The user could not be removed",
                error: err.message
            })
        })
})

 // [PUT] /api/users/:id (U of CRUD, update user with :id using JSON payload)
server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    try {
        const updated = await User.update(id, body)
        if(!updated) {
            res.status(404).json({
                message: `The user with the specified ID does not exist`
            })
        } else if (!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: 'Please provide name and bio for the user'
            })
        } else {
            res.status(200).json(updated)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The user information could not be modified',
            error: err.message
        })
    }
})

module.exports = server; 
