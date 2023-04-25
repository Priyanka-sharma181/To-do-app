const knex = require("../model/db")

let getCategory = (req, res) => {
    knex('Category').join('User','catgory_id','=','user_id').select("*")
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

let getCategoryById = (req, res) => {
    let id = req.params.id
    knex.select("*")
        .from("Category").where('Category.id', '=', id)
        .then((data) => {
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

let postCategory = (req, res) => {
    let data = {
        Category_name: req.body.Category_name
    }
    knex('Category').insert(data).then((d) => {
            res.send(d)
        })
        .catch((err) => {
            res.send(err)
        })
}
let deleteCategory = (req, res) => {
    let id = req.params.id
    knex('Category').select("*").delete().where('Task.id', id)
        .then(() => {
            res.send("deleted")
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports = {getCategory,getCategoryById,postCategory,deleteCategory}
