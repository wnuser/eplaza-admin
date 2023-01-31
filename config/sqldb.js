const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('api_admin', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;