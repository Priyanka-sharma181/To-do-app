
const knex = require("../model/db")

let getAllTodo = (req, res) => {
    knex
        .select("*")
        .from("todo")
        .then((data) => {
            console.log(data);
            res.json({
                data: data
            });
        })
        .catch((er) => {
            res.send({
                message: err
            });
        });
};
// post to do
let postToDO = (req, res) => {
    const data = {
        id: req.body.id,
        description: req.body.description,
        message: req.body.message
    }
    knex('Todo').insert(data)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send({
                message: err
            });
        })
}
let deletTodo = (req, res) => {
    let id = req.params.id
    knex('Todo').select("*").delete().where('Todo.id', id)
        .then(() => {
            res.send("deleted")
        })
        .catch((err) => {
            res.send({
                message: err
            });
        })
}
let updateTodo = (req, res) => {
    let id = req.params.id;
    knex('Todo').select("*").update({ description: req.body.description, message: req.body.message }).where('Todo.id', '=', id)
        .then((data) => {
            res.sendStatus(200)
        })
        .catch((err) => {
            res.send({
                message: err
            });
        })
}

module.exports = { getAllTodo, postToDO, deletTodo, updateTodo }