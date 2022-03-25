const { getAllUsers,signup,userLogin} = require("../controller/signup")
// const { getAllTodo, postToDO, deletTodo, updateTodo } = require("../controller/todo");


const router = require("express").Router()
const cookieParser = require("cookie-parser");
const {verify,jwt} = require("jsonwebtoken"); 
const { postCategory, getCategory, deleteCategory } = require("../controller/cotegry");

router.use(cookieParser())


authentication = (req,res,next)=>{
    try{
        var token = req.cookies.user
        console.log(token);
        var decode = jwt.verify(token,"priyanka")
        req.userdata=decode
        next()
    }
    catch(err){
        res.status(400).json({
            err:"invalid token"
        })
        console.log(err);
    }
}


// For signup
router.get("/getAllUSer", getAllUsers)
router.post("/signup", signup)
router.post("/userLogin", userLogin)

// for category
router.post("/postCatgory", postCategory)
router.get("/getCategory",getCategory)
router.delete("/deleteTodo/:id",deleteCategory)
// router.put("/upadtetodo/:id",updateTodo)
module.exports = {
    router
}