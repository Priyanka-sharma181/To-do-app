const mysql = require("mysql");
const dbCon = mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    database:process.env.database,
    password:process.env.password
})
dbCon.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });
  module.exports = dbCon;