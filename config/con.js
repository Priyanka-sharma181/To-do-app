const mysql = require("mysql");
const dbCon = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"ToDoApp",
    password:"Pink@123"

})
dbCon.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });
  module.exports = dbCon;