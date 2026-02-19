const { Router } = require('express');
const { userModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_USER_SECRET = "aezakmi";

const userRouter = Router();

userRouter.post("/signup", async function(req, res) {

    //zod validation
    const requireBody = z.object({
        email : z.string().min(3).max(100).email(),
        password : z.string().min(3).max(20),
        firstName : z.string().min(3).max(20),
        lastName : z.string().min(3).max(20) 
    })

    const parsedDataWithSuccess = requireBody.safeParse(req.body); 

    if(!parsedDataWithSuccess.success) {
        res.json({
            message : "Incorrect Format"
        })
        return;
    }

    //hash the password
    const {email, password, firstName, lastName } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        await userModel.create({
            email : email,
            password : hashedPassword,
            firstName : firstName,
            lastName : lastName
        })
        res.json({
        message : "signup succeeded!"
        })
        throw new Error("User Already Exists");

    } catch(e) {
        console.error(e);
        res.status(500).json({
            message : "Error while signing-up"
        })
    }
}) 

userRouter.post("/login", async function(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email : email
    })

    if(!user) {
        return res.status(403).json({
            message : "User does not exist in our database"
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);


    if(passwordMatch) {
        const token = jwt.sign({
            id : user._id.toString()
        }, JWT_USER_SECRET);

        //Do Cookie Logic

        res.json({
            token : token
        })
    } else {
        res.status(403).json({
            message : "Incorrect credentials"
        })
    }
})

userRouter.get("/purchases", function(req, res) {
    res.json({
        message : "purchase endpoint"
    })
})

module.exports = {
    userRouter : userRouter
}