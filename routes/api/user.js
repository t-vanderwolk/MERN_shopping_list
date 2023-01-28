const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler")
const User = require("../../models/User")



const register = asyncHandler(async(req,res) => {
const email = req.body.email
const exstUser = await User.findOne({email : email})
if(!exstUser) {
    const newUser = await User.create(req.body)
    res.json(newUser)
} else {
    throw new Error("User already exists.")
}

})


router.post("/register", register)

module.exports = router