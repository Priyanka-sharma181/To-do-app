const knex = require("../model/db")

getAllTask = (req, res) => {
    knex('Task').join('User', 'User.id', 'Task.task_id').select("*")
        .then((data) => {
            // console.log(data);
            res.json({
                data: data
            });
        })
        .catch((er) => {
            // console.log(er);
            res.json({
                message: er
            });
        });
};
// post task

postTask = (req, res) => {
    const data = {
        TaskName: req.body.TaskName
    }
    console.log(data);
    knex('Task').insert(data)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            console.log(err);
        })
}
deletTask = (req, res) => {
    let id = req.params.id
    knex('Task').select("*").delete().where('Task.id', id)
        .then(() => {
            res.send("deleted")
        })
        .catch((err) => {
            res.send(err)
        })
}
updateTodo = (req, res) => {
    let id = req.params.id;
    let updateData = {
        TaskName: req.body.TaskName
    }
    knex('Task').select("*").update(updateData).where('Todo.id', '=', id)
        .then((data) => {
            res.sendStatus(200)
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = {
    getAllTask,
    postTask
}