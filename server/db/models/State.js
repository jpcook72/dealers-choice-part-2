const Sequelize = require("sequelize") //for things like Sequelize.STRING
const db = require('../db.js');

const State = db.define('state',{
    name: Sequelize.STRING
})

module.exports = State