// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'triveous',
      user:     'postgres',
      port: 5432,
      password: 'root'
    },
    pool: {
      min: 2,
      max: 10
    },
  },
};
