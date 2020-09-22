const router = require("express").Router()
const State = require("../db/models/State.js")
const User = require("../db/models/User.js");

router.get('/users', async (req,res,next) => {
    try {
        const users = await User.findAll()
        res.json(users);
    }
    catch(err) {
        next(err)
    }
})

router.get('/states', async (req,res,next) => {
    try {
        const states = await State.findAll()
        res.json(states)
    }
    catch (err) {
        next(err)
    }
})

router.get('/users/:id', async(req,res,next) => {
    try {
        const user = await State.findByPk(req.params.id)
        res.json(user)
    }
    catch(err) {
        next(err)
    }
})

router.post('/users', async(req,res,next) => {
    try {
        const newObj = { name: req.body.name }
        const checkState = await State.findAll({
            where: {
                name: req.body.state
            }
        })
        if (checkState) {
            newObj.stateId = checkState.id
        }
        else {
            const newState = await State.create(req.body)
            newObj.stateId = newState.id
        }
        const newUser = await User.create(newObj)
        res.json(newUser);
    }
    catch(err) {
        next(err)
    }
})

router.put('/users/:id', async(req,res,next) => {
    try {
        const newObj = {}
        const checkState = await State.findAll({
            where: {
                name: req.body.state
            }
        })
        if (checkState) {
            newObj.stateId = checkState.id
        }
        else {
            const newState = await State.create(req.body)
            newObj.stateId = newState.id
        }
        const editedUser = await State.findByPk(newObj)
        editedUser.update(req.body)
        res.json(editedUser);
    }
    catch(err) {
        next(err)
    }
})

module.exports = router
