const knex = require("../model/db")

let getAllTask = (req, res) => {
    knex('Task').join('User', 'User.id', 'Task.task_id').select("*")
        .then((data) => {
            res.json({
                data: data
            });
        })
        .catch((er) => {
            res.json({
                message: er
            });
        });
};
// post task
let postTask = (req, res) => {
    const data = {
        TaskName: req.body.TaskName
    }
    knex('Task').insert(data)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send({
                message: err
            });
        })
}
let deletTask = (req, res) => {
    let id = req.params.id
    knex('Task').select("*").delete().where('Task.id', id)
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
    let updateData = {
        TaskName: req.body.TaskName
    }
    knex('Task').select("*").update(updateData).where('Todo.id', '=', id)
        .then((data) => {
            res.sendStatus(200)
        })
        .catch((err) => {
            res.send({
                message: err
            });
        })
}

module.exports = {
    getAllTask,
    postTask
}