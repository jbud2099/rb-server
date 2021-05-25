const Sequelize = require('sequelize').Sequelize

let sequelize = new Sequelize(process.env.DATABASE_URL || 
    `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/videogame-review`, 
    {
    dialect: 'postgres',
});

module.exports = sequelize;