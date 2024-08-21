const express = require('express')
const {User, Account} = require('../db')
const router = express.Router()
const JWT_SECRET = require('../config')
const jwt = require('jsonwebtoken')
const zod = require('zod');
const {authMiddleware} = require('../middleware')

const signUpSchema = zod.object({
    userName : zod.string().email(),
    firstName : zod.string(),
    lastName : zod.string(),
    password: zod.string()
})

router.post('/signup',async  function (req,res){
    const payload = req.body
    const response = signUpSchema.safeParse(payload);
    if (!response.success){
        res.status(411).json({
            message: "Enter the details correctly"
        })
    }
    const firstName = payload.firstName
    const lastName = payload.lastName
    const password = payload.password
    const userName = payload.userName
    const existingUser = await User.findOne({userName : userName});
    if (existingUser){
        return res.status(400).json({message : "User already exists"})
    }
 
    const user =   await User.create({
            firstName,
            lastName,
            password,
            userName
        })
    const userId = user._id

    // giving a random balance to the User || createing the account db for the User 

    const account = await Account.create({
        userId, 
        balance:  1 + Math.random() * 10000
    })


    var token = jwt.sign({userId : userId}, JWT_SECRET)
    return res.json({
        token : token,
        message: "User added to database Successfully !!",
        userId : userId,
        acoountId : account._id
    })
})

router.post('/signin', async function (req, res){
    const payload = req.body;
    const userName = payload.userName ;
    const password = payload.password ;
    console.log("Username" + userName);
    console.log("password" + password);
    const user = await User.findOne({
        userName, 
        password
    })
    const userId = user._id;
    var token1 = jwt.sign({userId : user._id}, JWT_SECRET)
    var decoded = jwt.verify(token1, JWT_SECRET)
    const userFound = await User.findOne({
        _id: decoded.userId
    })
    res.status(200).json({
        userId: `The user Id is ${user._id}`,
        token1:   `${token1}`,
        decoded: `${decoded}`,
        firstName: `${userFound.firstName}`
    })
})


const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName : zod.string().optional()
})

router.put("/",authMiddleware, async function (req, res){
    const response = updateBody.safeParse(req.body);
    if(!response.success){
        res.status(403).json({
            message: "Enter the details correctly"
        })
    }
    await User.updateOne({
        _id: req.userId
    }, req.body)
    res.json({
        message: "User updated Successfully"
    })
})

router.get("/bulk", async function (req, res){
    const filter = req.query.filter;
    try {
        const users = await User.find({
          $or: [
            { firstName: new RegExp(filter, 'i') },
            { lastName: new RegExp(filter, 'i') }
          ]
        }, 'firstName lastName _id userName'); 
    
        res.json({ users });
      } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
})
module.exports = router