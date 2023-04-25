const { getAllUsers, signup, userLogin } = require("../controller/signup")

const router = require("express").Router()
const cookieParser = require("cookie-parser");
const { verify, jwt } = require("jsonwebtoken");
const { postCategory, getCategory, deleteCategory } = require("../controller/cotegry");

router.use(cookieParser())


let authentication = (req, res, next) => {
    try {
        let token = req.cookies.user
        let decode = jwt.verify(token, "priyanka")
        req.userdata = decode
        next()
    }
    catch (err) {
        res.status(400).json({
            err: "invalid token"
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
router.get("/getCategory", getCategory)
router.delete("/deleteTodo/:id", deleteCategory)
module.exports = {
    router
}