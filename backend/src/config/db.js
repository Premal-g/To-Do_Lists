const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todo_apps', 'premal', '123', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
