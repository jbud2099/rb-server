const Sequelize = require('sequelize').Sequelize

let sequelize = new Sequelize(process.env.DB_CONN_URL || 
    `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/videogame-review`, 
    {
    dialect: 'postgres',
});

module.exports = sequelize;