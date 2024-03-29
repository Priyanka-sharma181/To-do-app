const dbCon = require("../config/con")
require("dotenv").config()
const knex = require("knex")({
    client: "mysql",
    connection: {
        host: process.env.host,
        user: process.env.user,
        database: process.env.database,
        password: process.env.password
    }

});


knex.schema
    .createTable("User", (table) => {
        table.increments("user_id").primary();
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

knex.schema.createTable("Category", (t) => {
    t.increments("id").primary();
    t.integer("catgory_id").unsigned().notNullable();
    t.foreign('catgory_id').references('Users.user_id').onDelete('CASCADE')
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.string('Category_name')
}).then((data) => {
    console.log("Table UserDetail Created");

}).catch((err) => {
    console.log(err);

});

knex.schema.createTable("Task", (t) => {
    t.increments("id").primary();
    t.integer('task_id').unsigned().references('Category.id');
    t.string("TaskName");
    t.timestamp('created_at').defaultTo(knex.fn.now())
}).then((data) => {
    console.log("Table UserDetail Created");
})
    .catch((err) => {
        console.log("err");

    });


module.exports = knex;