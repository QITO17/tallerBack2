const User = require('./user.model')
const Repair = require('./repairs.model')

const initModel = () => {
    User.hasMany(Repair, { foreignKey:'idUser' });
    Repair.belongsTo(User);
}


module.exports = initModel;