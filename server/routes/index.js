const router = require("express").Router()
const State = require("../db/models/State.js")
const User = require("../db/models/User.js");

router.get('/users', async (req,res,next) => {
    try {
        const users = await User.findAll({
            include: [State]
        })
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
        const user = await User.findByPk(req.params.id)
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
                name: req.body.state.toUpperCase()
            }
        })
        if (checkState.length) {
            newObj.stateId = checkState[0].id
        }
        else {
            const newState = await State.create({name: req.body.state})
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
        const newObj = { name: req.body.name }
        const checkState = await State.findAll({
            where: {
                name: req.body.state.toUpperCase()
            }
        })
        if (checkState.length) {
            newObj.stateId = checkState[0].id
        }
        else {
            const newState = await State.create({name: req.body.state})
            newObj.stateId = newState.id
        }
        const editedUser = await User.findByPk(req.params.id)
        await editedUser.update(newObj)
        res.json(await User.findByPk(req.params.id, {
            include: [State]
        }));
    }
    catch(err) {
        next(err)
    }
})

module.exports = router
