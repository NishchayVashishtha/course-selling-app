const { Router } = require('express');

const userRouter = Router();

userRouter.post("/signup", function(req, res) {
    res.json({
        message : "signup endpont"
    })
}) 

userRouter.post("/login", function(req, res) {
    res.json({
        message : "login endpoint"
    })
})

userRouter.get("/purchases", function(req, res) {
    res.json({
        message : "purchase endpoint"
    })
})

module.exports = {
    userRouter : userRouter
}