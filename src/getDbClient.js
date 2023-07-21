const dotenv = require('dotenv')
const { Client } = require('pg')

dotenv.config()

const getDbClient = () => {
    
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  })

  return client
}


module.exports = { getDbClient }
