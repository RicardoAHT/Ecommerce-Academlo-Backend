const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {logging:false}) //con el logging:false evito que se hagan muchos console.log cuand haga los test

module.exports = sequelize;