require("dotenv").config();
const {Pool} = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.on('connect', () => {
  console.log('Connected to the Friendly PostgreSQL database!');
});

pool.on('error', (err) =>{
  console.log("Error on database connection", err);
  process.exit(-1);
})

module.exports = {
  query: (text, params) => pool.query(text, params),
};