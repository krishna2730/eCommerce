require('dotenv').config({path: '../.env'});
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASS
    },
    pool: {
      min: 2,
      max: 10
    },
  },
};
