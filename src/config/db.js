const { Pool } = require("pg");

module.exports = new Pool({
  user: "postgres",
  password: "ervilha",
  host: "localhost",
  port: 5432,
  database: "appClassManagement",
});
