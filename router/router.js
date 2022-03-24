const { getAllUsers,signup,userLogin} = require("../controller/signup")
const { getAllTodo, postToDO, deletTodo, updateTodo } = require("../controller/todo");


const router = require("express").Router()
const cookieParser = require("cookie-parser");
const {verify} = require("jsonwebtoken");

router.use(cookieParser())

authentication = (req, res, next) => {
    token = req.cookies;
    // console.log(token);
    if (token == undefined) {
        res.send({
            succses: 0,
            message: "authentication error"
        })
    } else {
        verify(token.user, "priyankasharma", (err, tokendata) => {
            // console.log(tokendata);
            if (err) {
                console.log(err);
                res.send({
                    message: "authentication  error"
                });
            } else {
                res.tokendata = tokendata
                next()
            }

        })
    }

}


// For signup
router.get("/getAllUSer", getAllUsers)
router.post("/signup", signup)
router.post("/userLogin",authentication, userLogin)

// for to do 
router.post("/posttodo", postToDO)
router.get("/getAlltodo",getAllTodo)
router.delete("/deleteTodo/:id",deletTodo)
router.put("/upadtetodo/:id",updateTodo)
module.exports = {
    router
}