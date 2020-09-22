const Sequelize = require("sequelize") //for things like Sequelize.STRING
const db = require('../db.js');

const User = db.define('user',{
    name: Sequelize.STRING
})

module.exports = User