const knex = require("../model/db")
const {
    hashSync,
    genSaltSync
} = require("bcrypt")
const jwt = require("jsonwebtoken")

getAllUsers = (req, res) => {
    knex('information')
        .join('Todo', 'information.id', '=', 'Todo.id')
        .select("*")
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

signup = (req, res) => {
    if (!req.body.Name || !req.body.email || !req.body.password) {
        res.send({
            "success": false,
            "status": 400,
            "message": "Got error while saving",
        })
        console.log({
            "success": false,
            "status": 400,
            "message": "Got error while saving",
        });
        return ""
    }
    salt = genSaltSync(10)
    const userdata = {
        Name: req.body.Name,
        email: req.body.email,
        password: hashSync(req.body.password, salt)
    };

    knex("information")
        .insert(userdata)
        .then((data) => {
            res.send({
                success: `${userdata.email} registered successfully!`
            });
        })
        .catch((err) => {
            if (res.errorno = 1062) {
                res.send({
                    message: "this email already exist"
                })
            } else {
                console.log(err);
                res.send({
                    message: err
                });
            }
        });
}

userLogin = (req, res) => {
    knex.from('information').select("*").where("email", "=", req.body.email, "password", "=", req.body.password)
        .then((data) => {
            // console.log(data);
            token = jwt.sign({
                id: data[0].id
            }, "priyankasharma", {
                expiresIn: "6h"
            })
            console.log(token, "ok");
            res.cookie("user", token)
            res.json({
                "success": true,
                "status": 200,
                "message": "Login successfull.",
                "token": token,
            })
        })
        .catch((err) => {
            res.send(err)
        })
}


module.exports = {
    getAllUsers,
    signup,
    userLogin,
}