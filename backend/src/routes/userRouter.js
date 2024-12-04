import express from 'express'
import z from 'zod'
import jwt from 'jsonwebtoken'
import {Users} from "../models/users.js"

const router = express.Router();

const signupSchema = z.object({
    firstName : z.string().min(3).max(30),
    lastName : z.string().min(3).max(30),
    email : z.string().email('Invalid email formate'),
    password : z.string().min(6,"password must be at least of 6 char")
})
const signinSchema = z.object({
    email : z.string().email('Invalid email formate'),
    password : z.string().min(6,"password must be at least of 6 char")
})

router.post("/signup",async (req,res)=>{
    const response = req.body;
    const {success} = signupSchema.safeParse(response);
    if(!success){
        res.json({
            "msg" : "invalid input formate"
        })
    }
    const existUser = await Users.findOne({email : response.email})
    if(existUser){
        return res.status(400).json({
            "msg" : "Email already exist"
        })
    }

   await Users.create({
        firstName : response.firstName,
        lastName : response.lastName,
        email : response.email,
        password : response.password
    })

    res.json({
        'msg' : 'User created successfully'
    })
 })

 router.post("/signin",async(req,res)=>{
    const response = req.body
    const {success} = signinSchema.safeParse(response);
    if(!success){
        res.json({
            'msg' : 'Invalid credential'
        })
    }
    const existUser = await Users.findOne({email : response.email, password : response.password});

    if(existUser){
        const userID = existUser._id
        const token = jwt.sign({user_id : userID}, "Yuvraj2002");
        res.json({
            'msg' : 'Valid User',
            'token' : token
        })
    }
    else{
        res.json({
            'msg' : 'Invalid user'
        })
    }
 })
 export default router;