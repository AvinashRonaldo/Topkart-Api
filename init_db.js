const   Sequelize  = require('sequelize')

const sequelize = new Sequelize('test-db','user','pass',{
    dialect:'sqlite',
    storage:'./dev.sqlite'
})

module.exports = sequelize;