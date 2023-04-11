const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ensineme_db',
  password: 'pga.teste123',
  port: 5432,
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}
