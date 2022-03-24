const dbCon = require("../config/con")
const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "Pink@123",
        database: "ToDoApp"
    }

});


knex.schema
    .createTable("information", (table) => {
        table.increments("id").primary();
        table.string("Name");
        table.string("email").notNullable().unique();
        table.string("password");
    })
    .then((data) => {
        console.log("Table UserDetail Created");
    })
    .catch((err) => {
        console.log("Table UserDetail already .exist");

    });
knex.schema.createTable("Todo", (t) => {
        t.increments("id").primary();
        t.string("description");
        t.string("message")
    }).then((data) => {
        console.log("Table UserDetail Created");
    })
    .catch((err) => {
        console.log("already");

    });

module.exports = knex;