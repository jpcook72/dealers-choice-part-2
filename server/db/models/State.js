const Sequelize = require("sequelize") //for things like Sequelize.STRING
const db = require('../db.js');

const State = db.define('state',{
    name: Sequelize.STRING
}, {
    hooks: {
        beforeCreate: (state, options) => {
            state.name = state.name.toUpperCase();
        }
    }
})

module.exports = State