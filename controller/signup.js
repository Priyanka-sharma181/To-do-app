const knex = require("../model/db")
const {
    hashSync,
    genSaltSync
} = require("bcrypt")
const jwt = require("jsonwebtoken")

let getAllUsers = (req, res) => {
    knex('User')
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

let signup = (req, res) => {
    if (!req.body.Name || !req.body.email || !req.body.password) {
        res.send({
            "success": false,
            "status": 400,
            "message": "Got error while saving",
        })
        return ""
    }
    let salt = genSaltSync(10)
    const userdata = {
        Name: req.body.Name,
        email: req.body.email,
        password: hashSync(req.body.password, salt)
    };

    knex("User")
        .insert(userdata)
        .then((data) => {
            res.send({
                success: `${userdata.email} registered successfully!`
            });
        })
        .catch((err) => {
            if (res.errorno == 1062) {
                res.send({
                    message: "this email already exist"
                })
            } else {
                res.send({
                    message: err
                });
            }
        });
}

let userLogin = (req, res) => {
    knex.from('User').select("*").where("email", "=", req.body.email, "password", "=", req.body.password)
        .then((data) => {
            let token = jwt.sign({
                id: data[0].id
            }, "priyanka", {
                expiresIn: "6h"
            })
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