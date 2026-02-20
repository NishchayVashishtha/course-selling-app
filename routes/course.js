const { Router } = require("express");
const courseRouter = Router();
const { userMiddleware } = require("../middleware/user");

courseRouter.post("/purchase", userMiddleware, async function(req, res) {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId : userId,
        courseId : courseId
    })
    res.json({
        message : "you have successfully bought the course"
    })
})

courseRouter.get("/preview", userMiddleware, async function(req, res) {
    const courses = await courseModel.find({});

        res.json({
            courses
        })
    })

    module.exports = {
        courseRouter : courseRouter
    }
