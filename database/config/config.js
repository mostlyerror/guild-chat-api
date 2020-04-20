require('dotenv').config()

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres'
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    logging: false,
  },
}
