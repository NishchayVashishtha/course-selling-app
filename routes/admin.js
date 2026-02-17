const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");

adminRouter.post("/signup", function(req, res) {
    message.json({
        message : "admin signup Endpoint!"
    })
})

adminRouter.post("/login", function(req, res) {
    message.json({
        message : "admin login Endpoint!"
    })
})

adminRouter.post("/", function(req, res) {
    message.json({
        message : "admin create course Endpoint!"
    })
})

adminRouter.delete("/", function(req, res) {
    message.json({
        message : "admin create course Endpoint!"
    })
})

adminRouter.put("/bulk", function(req, res) {
    message.json({
        message : "admin create course Endpoint!"
    })
})

module.exports = ({
    adminRouter : adminRouter
})