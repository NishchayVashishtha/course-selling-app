const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_ADMIN_SECRET = "hesoyam";

adminRouter.post("/signup", async function(req, res) {
    
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

        await adminModel.create({
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

adminRouter.post("/login",async function(req, res) {
    const { email, password } = req.body;

    const admin = await adminModel.findOne({
        email : email
    })

    if(!admin) {
        return res.status(403).json({
            message : "User does not exist in our database"
        });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);


    if(passwordMatch) {
        const token = jwt.sign({
            id : admin._id.toString()
        }, JWT_ADMIN_SECRET);

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