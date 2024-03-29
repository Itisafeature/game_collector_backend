require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB,
    host: process.env.DEV_DB_HOST,
    dialect: 'mysql',
  },
};
