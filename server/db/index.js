const db = require('./db.js');
const State = require('./models/State.js');
const User = require('./models/User.js');

User.belongsTo(State);
State.hasMany(User);

const syncAndSeed = async () => {
    await db.sync({force: true});
    await Promise.all(
        [State.create({ name: 'IL' })],
        [State.create({ name: 'TX' })]
    );
    const IL = await State.findOne({
        where: {
            name: 'IL'
        }
    });
    const TX = await State.findOne({
        where: {
            name: 'TX'
        }
    });
    await Promise.all(
        [User.create({ name: 'John', stateId: IL.id })],
        [User.create({ name: 'Shane', stateId: TX.id })]
    );
}

module.exports = {
    db,
    State,
    User,
    syncAndSeed
}
