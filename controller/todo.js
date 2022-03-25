
const knex = require("../model/db")



getAllTodo = (req, res) => {
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
            console.log(er);
            res.json({
                message: er
            });
        });
};
// post to do

postToDO = (req, res) => {
    const data = {
        id: req.body.id,
        description: req.body.description,
        message: req.body.message
    }
    console.log(data);
    knex('Todo').insert(data)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            console.log(err);
        })
}
deletTodo = (req,res)=>{
    let id = req.params.id
    knex('Todo').select("*").delete().where('Todo.id',id)
    .then(()=>{
        res.send("deleted")
    })
    .catch((err)=>{
        res.send(err)
    })
}
updateTodo = (req,res)=>{
    let id = req.params.id;
    knex('Todo').select("*").update({description:req.body.description,message:req.body.message}).where('Todo.id','=',id)
    .then((data)=>{
        res.sendStatus(200)
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports={getAllTodo,postToDO,deletTodo,updateTodo}